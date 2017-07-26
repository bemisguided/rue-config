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
import { DependencyContext, InjectableEntry, InjectableManager, InjectableResolver } from 'rue';
import ConfigDependencyResolver from '../../lib/config/ConfigDependencyResolver';
import * as ConfigConstants from '../../lib/config/ConfigConstants';

describe('./ConfigDependencyResolver.js', () => {

  let configDepedendencyResolver: ConfigDependencyResolver;
  let dependencyContext: DependencyContext;
  let configPropertyInjectableEntry: InjectableEntry;

  beforeEach(() => {
    configDepedendencyResolver = new ConfigDependencyResolver();
    dependencyContext = new DependencyContext();
    dependencyContext.injectableManager = new InjectableManager();
    configPropertyInjectableEntry = dependencyContext.injectableManager.addInjectableEntry(ConfigConstants.CONFIG_NAME, new InjectableResolver(), {});
  });

  describe('resolve()', () => {

    it('resolves the @Config injectable entry if the dependency name has config property notation', () => {
      // Setup
      dependencyContext.name = '${property.name}';
      dependencyContext.activeProfiles = [];

      // Execute
      let injectableEntry = configDepedendencyResolver.resolve(dependencyContext);

      // Assert
      expect(injectableEntry).toEqual(configPropertyInjectableEntry);
    });

    it('resolves null if the dependency name dose not have config property notation', () => {
      // Setup
      dependencyContext.name = 'DependencyName';
      dependencyContext.activeProfiles = [];

      // Execute
      let injectableEntry = configDepedendencyResolver.resolve(dependencyContext);

      // Assert
      expect(injectableEntry).toBeNull();
    });


  });

});
