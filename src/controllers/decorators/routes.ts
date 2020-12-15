import "reflect-metadata";

import { METHODS } from "./Methods"
import { METADATA_KEYS } from "./MetadataKeys"
import { Decorator } from './Decorator';



function routeBinder(method: string) {
  return function (path: string): Decorator {
    return function (target: any, key: string, desc: PropertyDescriptor) {
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