import "reflect-metadata";

import { Request, Response } from "express";

import { METHODS } from "./Methods"
import { METADATA_KEYS } from "./MetadataKeys"
import { AppRouter } from "../../AppRouter"
import { NextFunction, RequestHandler } from 'express';


function bodyValidators(keys: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body) {
      res.status(422).send("invalid request");
      return;
    }

    keys.forEach(key => {
      if (!req.body[key]) {
        res.status(422).send("invalid request");
        return;
      }
    });

    next();
  }
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    Object.keys(target.prototype).forEach(key => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(METADATA_KEYS.PATH, target.prototype, key);
      const method: METHODS = Reflect.getMetadata(METADATA_KEYS.METHOD, target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata(METADATA_KEYS.MIDDLEWARE, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(METADATA_KEYS.VALIDATOR, target.prototype, key) || [];
      const validator = bodyValidators(requiredBodyProps)
      if (path) {
        AppRouter.instance[method](`${routePrefix}${path}`, validator, ...middlewares, routeHandler);
      }
    });
  }
}