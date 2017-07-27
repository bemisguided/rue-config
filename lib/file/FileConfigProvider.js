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
import * as fs from 'fs';
import ConfigProvider from '../config/ConfigProvider';
import ConfigPropertyHelper from '../utils/ConfigPropertyHelper';

import type { ConfigProviderFactoryFunction } from '../config/ConfigProviderFactoryFunction';

export default class FileConfigProvider extends ConfigProvider {

  properties: Object;

  constructor(properties: Object) {
    super();
    this.properties = properties;
  }

  static configure(file: string): ConfigProviderFactoryFunction<FileConfigProvider> {
    return () => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, (error, json) => {
          if (error) {
            // TODO rue error
            return reject(error);
          }
          try {
            let properties = JSON.parse(json.toString('utf8'));
            return resolve(new FileConfigProvider(properties));
          } catch (caughtError) {
            // TODO rue error
            return reject(caughtError);
          }
        });
      });
    };
  }

  get(name: string): any {
    return ConfigPropertyHelper.getConfigPropertyValue(name, this.properties);
  }

}
