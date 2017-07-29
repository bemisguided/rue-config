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
import { Container, singleton } from 'rue';
import rueConfig from '../lib/rue-config';
import ConfigProvider from '../lib/config/ConfigProvider';
import EnvironmentVariableConfigProvider from '../lib/environment/EnvironmentVariableConfigProvider';
import FileConfigProvider from '../lib/file/FileConfigProvider';
import MemoryConfigProvider from '../lib/memory/MemoryConfigProvider';

describe('./rue-config.js', () => {

  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('rue.environment()', () => {

    it('creates a builder with a given Container for the EnvironmentVariableConfigProvider', () => {
      // Execute
      let builder = rueConfig.environment(container);

      // Assert
      expect(builder.container).toBe(container);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(EnvironmentVariableConfigProvider);
    });

    it('creates a builder with a the singleton Container for the EnvironmentVariableConfigProvider', () => {
      // Execute
      let builder = rueConfig.environment();

      // Assert
      expect(builder.container).toBe(singleton);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(EnvironmentVariableConfigProvider);
    });

  });

  describe('rue.file()', () => {

    it('creates a builder with a given Container for the FileConfigProvider', () => {
      // Execute
      let builder = rueConfig.file(`${__dirname}/file/good.json`, container);

      // Assert
      expect(builder.container).toBe(container);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(FileConfigProvider);
    });

    it('creates a builder with a the singleton Container for the FileConfigProvider', () => {
      // Execute
      let builder = rueConfig.file(`${__dirname}/file/good.json`);

      // Assert
      expect(builder.container).toBe(singleton);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(FileConfigProvider);
    });

  });

  describe('rue.provider()', () => {

    it('creates a builder with a given Container for a ConfigProvider factory function', () => {
      // Execute
      let builder = rueConfig.provider((): Promise<ConfigProvider> => {
        return new Promise((resolve) => {
          resolve(new ConfigProvider());
        });
      }, container);

      // Assert
      expect(builder.container).toBe(container);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(ConfigProvider);
    });

    it('creates a builder with a the singleton Container for a ConfigProvider factory function', () => {
      // Execute
      let builder = rueConfig.provider((): Promise<ConfigProvider> => {
        return new Promise((resolve) => {
          resolve(new ConfigProvider());
        });
      });

      // Assert
      expect(builder.container).toBe(singleton);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(ConfigProvider);
    });

  });

  describe('rue.memory()', () => {

    it('creates a builder with a given Container for the MemoryConfigProvider', () => {
      // Execute
      let builder = rueConfig.memory({}, container);

      // Assert
      expect(builder.container).toBe(container);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(MemoryConfigProvider);
    });

    it('creates a builder with a the singleton Container for the MemoryConfigProvider', () => {
      // Execute
      let builder = rueConfig.memory({});

      // Assert
      expect(builder.container).toBe(singleton);
      expect(builder.configProviderFactoryFunction()).resolves.toBeInstanceOf(MemoryConfigProvider);
    });

  });

});
