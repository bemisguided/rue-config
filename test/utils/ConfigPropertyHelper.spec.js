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
import ConfigPropertyHelper from '../../lib/utils/ConfigPropertyHelper';

describe('./config/ConfigPropertyHelper.js', () => {

  describe('isSingleConfigProperty()', () => {

    it('correctly indicates that string has a config property expression present that is the entire string', () => {
      // Assert
      expect(ConfigPropertyHelper.isSingleConfigProperty('${a.config.property}')).toBeTruthy();
    });

    it('correctly indicates when a string does not have a config property expression present', () => {
      // Assert
      expect(ConfigPropertyHelper.isSingleConfigProperty('config.property')).toBeFalsy();
      expect(ConfigPropertyHelper.isSingleConfigProperty('dds${config.property}')).toBeFalsy();
      expect(ConfigPropertyHelper.isSingleConfigProperty('${config.property}fdsfsd')).toBeFalsy();
      expect(ConfigPropertyHelper.isSingleConfigProperty('  ${config.property} ')).toBeFalsy();
    });

    it('correctly indicates when a string does not have a config property expression present that is not the entire string', () => {
      // Assert
      expect(ConfigPropertyHelper.isSingleConfigProperty('dds${config.property}')).toBeFalsy();
      expect(ConfigPropertyHelper.isSingleConfigProperty('${config.property}fdsfsd')).toBeFalsy();
      expect(ConfigPropertyHelper.isSingleConfigProperty('  ${config.property} ')).toBeFalsy();
    });

  });

  describe('hasConfigProperties()', () => {

    it('correctly indicates that string has a config property expression present at least once anywhere in the string', () => {
      // Assert
      expect(ConfigPropertyHelper.hasConfigProperties('${a.config.property}')).toBeTruthy();
      expect(ConfigPropertyHelper.hasConfigProperties('dds${config.property}')).toBeTruthy();
      expect(ConfigPropertyHelper.hasConfigProperties('${config.property}fdsfsd')).toBeTruthy();
      expect(ConfigPropertyHelper.hasConfigProperties('  ${config.property} ')).toBeTruthy();
      expect(ConfigPropertyHelper.hasConfigProperties('${ENV_STYLE_PROPERTY}')).toBeTruthy();
    });

    it('correctly indicates when a string does not have a config property expression present anywhere in the string', () => {
      // Assert
      expect(ConfigPropertyHelper.hasConfigProperties('config.property')).toBeFalsy();
    });

  });

  describe('getSingleConfigProperty()', () => {

    it('correctly returns the config property name for a given config property expression', () => {
      // Assert
      expect(ConfigPropertyHelper.getSingleConfigProperty('${a.config.property}')).toEqual('a.config.property');
      expect(ConfigPropertyHelper.getSingleConfigProperty('${another.config.property}')).toEqual('another.config.property');
    });

    it('correctly returns null if there is no config property expression', () => {
      // Assert
      expect(ConfigPropertyHelper.getSingleConfigProperty('somethingelse}')).toBeNull();
    });

  });

  describe('getConfigPropertyValue()', () => {

    it('correctly returns the config property value for a flat object', () => {
      // Setup
      let expected = 'test';
      let env = {
        PROPERTY_NAME: expected,
      };

      // Assert
      expect(ConfigPropertyHelper.getConfigPropertyValue('PROPERTY_NAME', env)).toEqual(expected);
    });

    it('correctly returns the config property value for a given config property expression and object', () => {
      // Setup
      let expected = 'test';
      let obj = {
        a: {
          config: {
            property: expected,
          },
        },
      };

      // Assert
      expect(ConfigPropertyHelper.getConfigPropertyValue('a.config.property', obj)).toEqual(expected);
    });

  });

  describe('getConfigPropertyValue()', () => {

    it('correctly returns the config property value for a given config property expression and object', () => {
      // Setup
      let expected1 = 'test1';
      let expected2 = 'test2';
      let resolver = (name: string) => {
        if (name === 'property1') {
          return expected1;
        }
        if (name === 'property2') {
          return expected2;
        }
        return undefined;
      };

      // Assert
      let result = ConfigPropertyHelper.replaceConfigProperties('this ${property1} is ${property2} ', resolver);
      expect(result).toEqual('this test1 is test2 ');
    });

  });

});
