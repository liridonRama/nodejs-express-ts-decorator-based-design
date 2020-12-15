import { Request, Response, NextFunction } from "express";

import { AppRouter } from "../AppRouter";


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

AppRouter.instance.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body as LoginCredentials;

  if (email === "hi@hi.com" && password === "1234") {
    req.session = { loggedIn: true }

    res.redirect("/protected");
  } else {
    res.status(422).send("Invalid Email or Password");
  }
});


AppRouter.instance.get("/", (req: Request, res: Response) => {
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


AppRouter.instance.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});


AppRouter.instance.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.status(200).send("Welcome to the protected route")
});