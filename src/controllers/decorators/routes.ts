import "reflect-metadata";

import { RequestHandler } from 'express';

import { METHODS } from "./Methods"
import { METADATA_KEYS } from "./MetadataKeys"
import { Decorator } from './Decorator';

interface RouterHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string): Decorator {
    return function (target: any, key: string, desc: RouterHandlerDescriptor) {
      Reflect.defineMetadata(METADATA_KEYS.PATH, path, target, key);
      Reflect.defineMetadata(METADATA_KEYS.METHOD, method, target, key);
    }
  }
}

export const get = routeBinder(METHODS.GET);
export const put = routeBinder(METHODS.PUT);
export const post = routeBinder(METHODS.POST);
export const del = routeBinder(METHODS.DELETE);
export const patch = routeBinder(METHODS.PATCH);