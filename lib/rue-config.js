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
import * as ConfigConstants from './config/ConfigConstants';
import ConfigProviderBuilder from './config/ConfigProviderBuilder';
import ConfigProvider from './config/ConfigProvider';
import EnvironmentVariableConfigProvider from './environment/EnvironmentVariableConfigProvider';
import FileConfigProvider from './file/FileConfigProvider';
import MemoryConfigProvider from './memory/MemoryConfigProvider';

import type { ConfigProviderFactoryFunction } from './config/ConfigProviderFactoryFunction';

module.exports = {

  // Properties
  CONFIG_NAME: ConfigConstants.CONFIG_NAME,

  // Methods
  environment: (container: ?Container) => {
    return new ConfigProviderBuilder(EnvironmentVariableConfigProvider.configure(), container ? container : singleton);
  },
  file: (file: string, container: ?Container) => {
    return new ConfigProviderBuilder(FileConfigProvider.configure(file), container ? container : singleton);
  },
  provider: <P: ConfigProvider>(configProviderFactoryFunction: ConfigProviderFactoryFunction<P>, container: ?Container) => {
    return new ConfigProviderBuilder(configProviderFactoryFunction, container ? container : singleton);
  },
  memory: (properties: Object, container: ?Container) => {
    return new ConfigProviderBuilder(MemoryConfigProvider.configure(properties), container ? container : singleton);
  },

  // Classes
  ConfigProvider: ConfigProvider,
  ConfigProviderBuilder: ConfigProviderBuilder,

};
