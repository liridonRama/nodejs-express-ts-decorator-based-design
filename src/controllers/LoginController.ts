import { Response, Request } from "express";

import { controller, get } from './decorators/index';


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
}