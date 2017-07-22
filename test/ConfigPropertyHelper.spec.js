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
import ConfigPropertyHelper from '../lib/ConfigPropertyHelper';

describe('./ConfigPropertyHelper.js', () => {

  describe('isConfigProperty()', () => {

    it('correctly indicates that string has a config property expression present', () => {
      // Assert
      expect(ConfigPropertyHelper.isConfigProperty('${a.config.property}')).toBeTruthy();
    });

    it('correctly indicates when a string does not have a config property expression present', () => {
      // Assert
      expect(ConfigPropertyHelper.isConfigProperty('config.property')).toBeFalsy();
      expect(ConfigPropertyHelper.isConfigProperty('dds${config.property}')).toBeFalsy();
    });

  });

  describe('getConfigPropertyName()', () => {

    it('correctly returns the config property name for a given config property expression', () => {
      // Assert
      expect(ConfigPropertyHelper.getConfigPropertyName('${a.config.property}')).toEqual('a.config.property');
      expect(ConfigPropertyHelper.getConfigPropertyName('${another.config.property}')).toEqual('another.config.property');
    });

    it('correctly returns null if there is no config property expression', () => {
      // Assert
      expect(ConfigPropertyHelper.getConfigPropertyName('somethingelse}')).toBeNull();
    });

  });

  describe('getConfigPropertyValue()', () => {

    it('correctly returns the config property value for a given config property expression and object', () => {
      // Setup
      let expected = 'test';
      let obj = {
        a: {
          config: {
            property: expected
          }
        }
      };

      // Assert
      expect(ConfigPropertyHelper.getConfigPropertyValue('a.config.property', obj)).toEqual(expected);
    });

  });

});
