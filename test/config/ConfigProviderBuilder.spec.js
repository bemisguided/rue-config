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
import { Container } from 'rue';
import ConfigConstants from '../../lib/config/ConfigConstants';
import ConfigDependencyNameMapper from '../../lib/config/ConfigDependencyNameMapper';
import ConfigProviderBuilder from '../../lib/config/ConfigProviderBuilder';
import ConfigProvider from '../../lib/config/ConfigProvider';
import ConfigPreInjectionFilter from '../../lib/config/ConfigPreInjectionFilter';

import type { ConfigProviderFactoryFunction } from '../../lib/config/ConfigProviderFactoryFunction';

describe('./config/ConfigProviderBuilder.js', () => {

  let container: Container;
  let configProviderFactoryFunction: ConfigProviderFactoryFunction<ConfigProvider>;
  let configProviderBuilder: ConfigProviderBuilder;

  beforeEach(() => {
    container = new Container();
    configProviderFactoryFunction = (): Promise<ConfigProvider> => {
      return new Promise((resolve) => {
        resolve(new ConfigProvider());
      });
    };
    configProviderBuilder = new ConfigProviderBuilder(configProviderFactoryFunction, container);
  });

  describe('.withProfiles()', () => {

    it('correctly sets the profiles provided', () => {
      // Setup
      let profiles = ['profile1', 'profile2'];

      // Execute
      let builder = configProviderBuilder.withProfiles(...profiles);

      // Assert
      expect(configProviderBuilder.profileNames).toEqual(profiles);
      expect(builder).toEqual(configProviderBuilder);
    });

  });

  describe('done()', () => {

    it('correctly configures the config provider', () => {
      // Setup
      let profile1 = 'profile1';
      let profile2 = 'profile2';
      let profiles = [profile1, profile2];

      // Execute
      configProviderBuilder.withProfiles(profile1, profile2);
      configProviderBuilder.done();

      // Assert
      let injectableEntry = container.injectableManager.injectableEntries[0];
      expect(injectableEntry).not.toBeUndefined();
      expect(injectableEntry).not.toBeNull();
      expect(injectableEntry.name).toEqual(ConfigConstants.CONFIG_NAME);
      expect(injectableEntry.singleton).toEqual(true);
      expect(injectableEntry.profileNames).toEqual(profiles);
      expect(injectableEntry.filter).toBeInstanceOf(ConfigPreInjectionFilter);
      // $FlowFixMe (fn is a property of the FactoryInjectableResolver)
      expect(injectableEntry.resolver.fn).toEqual(configProviderFactoryFunction);

      expect(container.dependencyNameMappers[0]).toBeInstanceOf(ConfigDependencyNameMapper);
    });

  });

})
;
