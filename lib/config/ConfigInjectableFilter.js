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
import { InjectableFilter } from 'rue';
import ConfigPropertyHelper from '../utils/ConfigPropertyHelper';
import ConfigProvider from './ConfigProvider';

export default class ConfigInjectableFilter extends InjectableFilter {

  filter(name: string, dependencyName: string, instance: ConfigProvider): any {
    let propertyName = ConfigPropertyHelper.getSingleConfigProperty(dependencyName);
    if (propertyName) {
      return instance.get(propertyName);
    }
    if (ConfigPropertyHelper.hasConfigProperties(dependencyName)) {
      return ConfigPropertyHelper.replaceConfigProperties(dependencyName, (name: string) => {
        return instance.get(name);
      });
    }
    return instance;
  }

}
