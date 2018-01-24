/**
 * Rue - nodejs dependency injection container
 *
 * Copyright 2017 Martin Crawford (@bemisguided)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @flow
 */
export default class ConfigPropertyHelper {

  static isSingleConfigProperty(value: string): boolean {
    return /^\$\{([a-zA-Z0-9.]+)\}$/g.test(value);
  }

  static getSingleConfigProperty(value: string): ?string {
    let match = /^\$\{([a-zA-Z0-9.]+)\}$/g.exec(value);
    if (match) {
      return match[1];
    }
    return null;
  }

  // TODO handle when a property is missing in the chain
  static getConfigPropertyValue(name: string, obj: Object): any {
    return name.split('.').reduce((o, i) => o[i], obj);
  }

  static hasConfigProperties(value: string): boolean {
    return /\$\{([a-zA-Z0-9._]+)\}/g.test(value);
  }

  static replaceConfigProperties(value: string, resolver: (name: any) => any): string {
    return value.replace(/\$\{([a-zA-Z0-9.]+)\}/g, ($1, $2) => {
      return String(resolver($2));
    });
  }

}
