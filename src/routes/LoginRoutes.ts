import { Router, Request, Response, NextFunction } from "express";


interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

interface LoginCredentials {
  email?: string;
  password?: string
}


const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.loggedIn) {
    next();

    return;
  }

  res.status(403).send("Not Permitted");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.type("html").send(`
    <form method="POST">
      <div class="">
        <label for="email">Email</label>
        <input required type="text" name="email" id="email" />
      </div>
      <div class="">
        <label for="password">Password</label>
        <input required type="text" name="password" id="password" />
      </div>
      <input type="submit" value="Submit">
    </form>
`)
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body as LoginCredentials;

  if (email === "hi@hi.com" && password === "1234") {
    req.session = { loggedIn: true }

    res.redirect("/protected");
  } else {
    res.status(422).send("Invalid Email or Password");
  }
});


router.get("/", (req: Request, res: Response) => {
  if (req.session?.loggedIn) {
    res.type("html").send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.type("html").send(`
      <div>
        <h1>You are not logged in</h1>
        <a href="/login">Login</a>
      </div>
    `);
  }
});


router.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});


router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.status(200).send("Welcome to the protected route")
});

export { router }