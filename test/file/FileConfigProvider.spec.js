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
import FileConfigProvider from '../../lib/file/FileConfigProvider';

describe('./memory/FileConfigProvider.js', () => {

  describe('FileConfigProvider.configure()', () => {

    it('configures the factory function with a given JSON file', (done) => {
      // Setup
      let expected = require('./good.json');

      // Execute
      let factoryFunction = FileConfigProvider.configure(`${__dirname}/good.json`);

      // Assert
      factoryFunction()
        .then((fileConfigProvider) => {
          expect(fileConfigProvider).toBeInstanceOf(FileConfigProvider);
          expect(fileConfigProvider.properties).toEqual(expected);
          done();
        });
    });

    it('handles a non-existend file', (done) => {
      // Setup

      // Execute
      let factoryFunction = FileConfigProvider.configure(`${__dirname}/fake.json`);

      // Assert
      factoryFunction()
        .catch((error) => {
          expect(error.message).toContain('ENOENT: no such file or directory, open');
          done();
        });
    });

    it('handles a badly formatted JSON file', (done) => {
      // Setup

      // Execute
      let factoryFunction = FileConfigProvider.configure(`${__dirname}/bad.json`);

      // Assert
      factoryFunction()
        .catch((error) => {
          expect(error.message).toEqual('Unexpected token v in JSON at position 4');
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
        },
      };
      let memoryConfigProvider = new FileConfigProvider(properties);

      // Execute
      let value1A = memoryConfigProvider.get('values1.valueA');
      let value2B = memoryConfigProvider.get('values2.valueB');

      // Assert
      expect(value1A).toEqual(properties.values1.valueA);
      expect(value2B).toEqual(properties.values2.valueB);
    });

  });

});
