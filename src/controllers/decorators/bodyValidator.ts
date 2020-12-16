import "reflect-metadata";

import { METADATA_KEYS } from "./MetadataKeys";
import { Decorator } from "./Decorator";


export function bodyValidator(...keys: string[]): Decorator {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    Reflect.defineMetadata(METADATA_KEYS.VALIDATOR, keys, target, key);
  }
}