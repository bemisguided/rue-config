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
import ConfigDependencyNameMapper from '../../lib/config/ConfigDependencyNameMapper';
import ConfigConstants from '../../lib/config/ConfigConstants';

describe('./config/ConfigDependencyNameMapper.js', () => {

  let configDependencyNameMapper: ConfigDependencyNameMapper;

  beforeEach(() => {
    configDependencyNameMapper = new ConfigDependencyNameMapper();
  });

  describe('map()', () => {

    it('maps the @Config injectable entry if the dependency name has a single config property notation', () => {
      // Setup
      let dependencyName = '${property.name}';

      // Execute
      let result = configDependencyNameMapper.map(dependencyName);

      // Assert
      expect(result).toEqual(ConfigConstants.CONFIG_NAME);
    });

    it('maps the @Config injectable entry if the dependency name has multiple config property notation', () => {
      // Setup
      let dependencyName = 'this is a ${property.name} and another ${property.name} here';

      // Execute
      let result = configDependencyNameMapper.map(dependencyName);

      // Assert
      expect(result).toEqual(ConfigConstants.CONFIG_NAME);
    });

    it('resolves null if the dependency name dose not have config property notation', () => {
      // Setup
      let dependencyName = 'someDependencyName';

      // Execute
      let result = configDependencyNameMapper.map(dependencyName);

      // Assert
      expect(result).toBeNull();
    });

  });

});
