import "reflect-metadata";

import { METHODS } from "./Methods"
import { METADATA_KEYS } from "./MetadataKeys"
import { AppRouter } from "../../AppRouter"
import { RequestHandler } from 'express';

export function controller(routePrefix: string) {
  return function (target: Function) {
    Object.keys(target.prototype).forEach(key => {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(METADATA_KEYS.PATH, target.prototype, key);
      const method: METHODS = Reflect.getMetadata(METADATA_KEYS.METHOD, target.prototype, key);
      const middlewares: RequestHandler[] = Reflect.getMetadata(METADATA_KEYS.MIDDLEWARE, target.prototype, key) || [];

      if (path) {
        AppRouter.instance[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
      }
    });
  }
}