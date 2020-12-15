import { RequestHandler } from 'express';
import "reflect-metadata";
import { Decorator } from './Decorator';

import { METADATA_KEYS } from "./MetadataKeys"


export function use(middleware: RequestHandler): Decorator {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const middlewares: RequestHandler[] = Reflect.getMetadata(METADATA_KEYS.MIDDLEWARE, target, key) || [];

    Reflect.defineMetadata(METADATA_KEYS.MIDDLEWARE, [...middlewares, middleware], target, key);
  }
}