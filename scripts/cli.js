#!/usr/bin/env node
const {execSync} = require('child_process');
const fs = require('fs');
const constants = require('../constants/constants.node');
const {
  HAKONIWA_PROXY_DIR,
  HAKONIWA_SECRETS_DIR,
  HAKONIWA_AUTH_DIR,
  HAKONIWA_DAEMON_PROXY_PORT,
  HAKONIWA_PROXY_PROTOCOL,
  HAKONIWA_PROXY_HOST,
  HAKONIWA_DAEMON_PROXY_IDENTIFIER,
  HAKONIWA_CYPRESS_WEBPACK_CONFIG_PATH,
  HAKONIWA_CYPRESS_TSCONFIG_PATH,
  HAKONIWA_CYPRESS_PLUGINS_PATH,
  HAKONIWA_PROXY_HTTPS_CERT_DIR,
} = {
  ...constants,
  ...process.env,
};

const {
  startServerSync,
  stopServerSync,
  toggleHTTP2,
  toggleMultipleRules,
  toggleInterceptHTTPSConnects,
} = require('../lib/whistle/service');

const [, , command, ...args] = process.argv;
(async () => {
  // @TODO: add cli help
  if (command === 'init') {
    const paths = [HAKONIWA_AUTH_DIR, HAKONIWA_SECRETS_DIR, HAKONIWA_PROXY_DIR, HAKONIWA_PROXY_HTTPS_CERT_DIR];
    for (const p of paths) {
      fs.mkdirSync(p, {recursive: true});
    }
    fs.writeFileSync(
      HAKONIWA_CYPRESS_WEBPACK_CONFIG_PATH,
      `const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}`,
    );
    fs.writeFileSync(
      HAKONIWA_CYPRESS_TSCONFIG_PATH,
      `
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es2018",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["dom","esnext"],                             /* Specify library files to be included in the compilation. */
    "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    "pretty": true,
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                        /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": ".",                            /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,              /* Enable strict null checks. */
    "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    "resolveJsonModule": true,             /* resolution json modules */
    "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": ".",                       /* Base directory to resolve non-absolute module names. */
    "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    "typeRoots": ["../node_modules/@types"],                       /* List of folders to include type definitions from. */
    "types": ["cypress"],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  },
  "include": ["./**/*.ts"]
}
`,
    );
    fs.writeFileSync(
      HAKONIWA_CYPRESS_PLUGINS_PATH,
      `/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const webpack = require('@cypress/webpack-preprocessor');
const { cyTasks } = require('hakoniwa/lib/cypress/tasks/tasks');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const options = {
    webpackOptions: require("../webpack.cypress.config"),
    watchOptions: {}
  }
  on("file:preprocessor", webpack(options));
  cyTasks(on, config);
}
`,
    );
  } else if (command === 'open') {
    const proxyServer = `${HAKONIWA_PROXY_PROTOCOL}://${HAKONIWA_PROXY_HOST}:${HAKONIWA_DAEMON_PROXY_PORT}`;
    startServerSync({
      baseDir: HAKONIWA_PROXY_DIR,
      identifier: HAKONIWA_DAEMON_PROXY_IDENTIFIER,
      port: HAKONIWA_DAEMON_PROXY_PORT,
      certDir: HAKONIWA_PROXY_HTTPS_CERT_DIR,
    });
    try {
      await Promise.all([
        toggleMultipleRules({
          protocol: HAKONIWA_PROXY_PROTOCOL,
          host: HAKONIWA_PROXY_HOST,
          port: HAKONIWA_DAEMON_PROXY_PORT,
          value: true,
        }),
        toggleHTTP2({
          protocol: HAKONIWA_PROXY_PROTOCOL,
          host: HAKONIWA_PROXY_HOST,
          port: HAKONIWA_DAEMON_PROXY_PORT,
          value: true,
        }),
        toggleInterceptHTTPSConnects({
          protocol: HAKONIWA_PROXY_PROTOCOL,
          host: HAKONIWA_PROXY_HOST,
          port: HAKONIWA_DAEMON_PROXY_PORT,
          value: true,
        }),
      ]);
      console.log(`cross-env HTTP_PROXY='${proxyServer}' HTTPS_PROXY='${proxyServer}' cypress open`);
      execSync(`cross-env HTTP_PROXY='${proxyServer}' HTTPS_PROXY='${proxyServer}' cypress open`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } finally {
      stopServerSync({
        baseDir: HAKONIWA_PROXY_DIR,
        identifier: HAKONIWA_DAEMON_PROXY_IDENTIFIER,
      });
    }
  } else {
    throw new Error('invalid command');
  }
})();
