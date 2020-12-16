import { Response, Request } from "express";

import { controller, get, post, bodyValidator } from './decorators/index';


interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

interface LoginCredentials {
  email?: string;
  password?: string
}


@controller("")
export class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.type("html").send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
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
    </body>
    
    </html>`)
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body as LoginCredentials;

    if (email === "hi@hi.com" && password === "1234") {
      req.session = { loggedIn: true }

      res.redirect("/protected");
    } else {
      res.status(422).send("Invalid Email or Password");
    }
  }


  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  };
}

