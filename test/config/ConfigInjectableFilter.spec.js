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
import ConfigProvider from '../../lib/config/ConfigProvider';
import ConfigInjectableFilter from '../../lib/config/ConfigInjectableFilter';

class StubConfigProvider extends ConfigProvider {

  name: string;

  value: any;

  get(name: string): any {
    this.name = name;
    return this.value;
  }

}

describe('./config/ConfigInjectableFilter.js', () => {

  let configInjectableFilter: ConfigInjectableFilter;

  beforeEach(() => {
    configInjectableFilter = new ConfigInjectableFilter();
  });

  describe('.filter()', () => {

    it('returns the exact property value when the dependency name contains only a config property notation', () => {
      // Setup
      let propertyName = 'property.name';
      let expected = 1234;
      let configProvider = new StubConfigProvider();
      configProvider.value = expected;

      // Execute
      let result = configInjectableFilter.filter('anything', `\$\{${propertyName}\}`, configProvider);

      // Assert
      expect(result).toEqual(expected);
      expect(configProvider.name).toEqual(propertyName);
    });

    it('returns the property value within a string when the dependency name contains config property notation within a string', () => {
      // Setup
      let propertyName = 'property.name';
      let expected = 1234;
      let configProvider = new StubConfigProvider();
      configProvider.value = expected;

      // Execute
      let result = configInjectableFilter.filter('anything', `this is a \$\{${propertyName}\} number`, configProvider);

      // Assert
      expect(result).toEqual(`this is a ${expected} number`);
      expect(configProvider.name).toEqual(propertyName);
    });

    it('returns the Config Provider instance when the dependency name does not contain config property notation', () => {
      // Setup
      let expected = 'test';
      let configProvider = new StubConfigProvider();
      configProvider.value = expected;

      // Execute
      let result = configInjectableFilter.filter('anything', 'DependencyName', configProvider);

      // Assert
      expect(result).toEqual(configProvider);
      expect(configProvider.name).toBeUndefined();
    });

  });

});
