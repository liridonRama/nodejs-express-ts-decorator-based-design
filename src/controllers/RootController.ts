import { Request, Response, NextFunction } from "express";
import { controller, get, use } from './decorators';



const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.loggedIn) {
    next();

    return;
  }

  res.status(403).send("Not Permitted");
}

@controller("")
export class RootController {

  @get("/")
  getRoot(req: Request, res: Response) {
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
  };

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.status(200).send("Welcome to the protected route")
  };
}