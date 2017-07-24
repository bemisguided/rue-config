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
import MemoryConfigProvider from '../../lib/memory/MemoryConfigProvider';
describe('./memory/FileConfigProvider.js', () => {

  describe('MemoryConfigProvider.configure()', () => {

    it('configures the factory function with a given properties Object', (done) => {
      // Setup
      let properties = {
        values: 'test',
      };

      // Execute
      let factoryFunction = MemoryConfigProvider.configure(properties);

      // Assert
      factoryFunction()
          .then((memoryConfigProvider) => {
            expect(memoryConfigProvider.properties).toEqual(properties);
            done();
          });
    });

  });

  describe('.get()', () => {

    it('gets a property correctly using dot notation', () => {
      // Setup
      let properties = {
        values1: {
          valueA: 'value1A',
          valueB: 'value1B',
        },
        values2: {
          valueA: 'value2A',
          valueB: 'value2B',
        }
      };
      let memoryConfigProvider = new MemoryConfigProvider(properties);

      // Execute
      let value1A = memoryConfigProvider.get('values1.valueA');
      let value2B = memoryConfigProvider.get('values2.valueB');

      // Assert
      expect(value1A).toEqual(properties.values1.valueA);
      expect(value2B).toEqual(properties.values2.valueB);
    });

  });

});