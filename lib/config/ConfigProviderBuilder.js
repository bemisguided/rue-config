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
import { Container, factory } from 'rue';
import ConfigConstants from './ConfigConstants';
import ConfigDependencyNameMapper from './ConfigDependencyNameMapper';
import ConfigPreInjectionFilter from './ConfigPreInjectionFilter';

import type { ConfigProviderFactoryFunction } from './ConfigProviderFactoryFunction';
import ConfigProvider from './ConfigProvider';

export default class ConfigProviderBuilder {

  container: Container;

  configProviderFactoryFunction: ConfigProviderFactoryFunction<ConfigProvider>;

  profileNames: Array<string>;

  constructor<P: ConfigProvider>(configProviderFactoryFunction: ConfigProviderFactoryFunction<P>, container: Container) {
    this.container = container;
    this.configProviderFactoryFunction = configProviderFactoryFunction;
    this.profileNames = [];
  }

  done() {
    this.container.dependencyNameMappers.push(new ConfigDependencyNameMapper());
    factory(ConfigConstants.CONFIG_NAME, this.container)
      .useFunction(this.configProviderFactoryFunction)
      .isSingleton(true)
      .withProfiles(...this.profileNames)
      .withFilter(new ConfigPreInjectionFilter())
      .done();
  }

  withProfiles(...profileNames: Array<string>): ConfigProviderBuilder {
    this.profileNames = profileNames;
    return this;
  }

}
