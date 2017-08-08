# rue-config

**rue** a not (too) opinionated dependency injection container for nodejs  

[![npm](https://img.shields.io/npm/v/rue-config.svg)](https://www.npmjs.com/package/rue-confg)
[![state](https://img.shields.io/badge/state-beta-orange.svg)](https://github.com/bemisguided/rue-confg)
[![npm](https://img.shields.io/npm/l/rue-config.svg)](https://www.npmjs.com/package/rue-confg)
[![node](https://img.shields.io/node/v/rue-config.svg)](https://www.npmjs.com/package/rue-confg)
[![David](https://img.shields.io/david/bemisguided/rue-config.svg)](https://github.com/bemisguided/rue-confg)
[![Build Status](https://travis-ci.org/bemisguided/rue-config.svg)](https://travis-ci.org/bemisguided/rue-confg)

[![NPM](https://nodei.co/npm/rue-config.png?downloads=false&downloadRank=false)](https://www.npmjs.com/package/rue-config)

## Overview

Configuration injection extension for [rue](https://www.npmjs.com/package/rue)

## Features

- **Injection** of configuration properties

- Simple **Memory-based**, **File-based**, and **Environment Variable** configuration solutions

## Installation

```bashp
npm install rue rue-config --save
```

## Usage

Read the full documentation available at [http://ruenode.io](http://ruenode.io).

## Example

```javascript 1.7
// mymodule.js (module file)
const database = require('database');

exports.init = function(host, port) {
  database.connect(host, port);
};

// rue.js (configuration file)
const rue = require('rue');
const rueConfig = require('rue-config');

let config = {
  database: {
    host: 'somehostname.com',
    port: 1234
  }
};
rueConfig.memory(config)
  .done();

rue.module('myModule')
  .useModule(require('./mymodule.js'))
  .withDependencies('${database.host}', '${database.port}')
  .done();

rue.activate()
  .then(() => {
    console.log('Application has been successfully started');
  })
  .catch((error) => {
    console.log('Application has failed to be started', error);    
  });
```
