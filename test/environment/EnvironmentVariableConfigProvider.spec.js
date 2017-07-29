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
import EnvironmentVariableConfigProvider from '../../lib/environment/EnvironmentVariableConfigProvider';

describe('./environment/EnvironmentVariableConfigProvider.js', () => {

  describe('EnvironmentVariableConfigProvider.configure()', () => {

    it('configures the factory function', (done) => {
      // Execute
      let factoryFunction = EnvironmentVariableConfigProvider.configure();

      // Assert
      factoryFunction()
        .then((environmentVariableConfigProvider) => {
          expect(environmentVariableConfigProvider).toBeInstanceOf(EnvironmentVariableConfigProvider);
          done();
        });
    });

  });

  describe('.get()', () => {

    it('gets a property correctly using dot notation', () => {
      // Setup
      let expected = 'test';
      process.env.TEST_GET = expected;
      let environmentVariableConfigProvider = new EnvironmentVariableConfigProvider();

      // Execute
      let value = environmentVariableConfigProvider.get('TEST_GET');

      // Assert
      expect(value).toEqual(expected);
    });

  });

});
