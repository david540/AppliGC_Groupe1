// module.exports = {
//
//     preset: "react-native",
//
//     collectCoverage: true,
//
//     transformIgnorePatterns: [
//
//         "node_modules/(?!(jest-)?react-native|react-navigation)"
//
//     ],
//
//     moduleNameMapper: {
//
//         "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
//
//         "^[@./a-zA-Z0-9$_-]+\\.(png|gif)$": "RelativeImageStub"
//
//     },
//     testRegex: "((\\.|/*.)(snapshot))\\.js?$"
// };

'use strict';

module.exports = {
    'transform': {
      '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': '<rootDir>/jest/assetFileTransformer.js',
      '.*': './jest/preprocessor.js',
    },
    'setupFiles': [
      './jest/setup.js',
    ],
    'timers': 'fake',
    'moduleNameMapper': {
      '^React$': '<rootDir>/Libraries/react-native/React.js',
    },
    'testRegex': '((\\.|/*.)(snapshot))\\.js?$',
    'testPathIgnorePatterns': [
      '/node_modules/',
      '<rootDir>/template',
      'Libraries/Renderer',
      'RNTester/e2e',
    ],
    'haste': {
      'defaultPlatform': 'ios',
      'hasteImplModulePath': '<rootDir>/jest/hasteImpl.js',
      'providesModuleNodeModules': [
        'react-native',
      ],
      'platforms': [
        'ios',
        'android',
      ],
    },
    'modulePathIgnorePatterns': [
      '/node_modules/(?!react|fbjs|react-native|react-transform-hmr|core-js|promise)/',
      'node_modules/react/node_modules/fbjs/',
      'node_modules/react/lib/ReactDOM.js',
      'node_modules/fbjs/lib/Map.js',
      'node_modules/fbjs/lib/Promise.js',
      'node_modules/fbjs/lib/fetch.js',
      'node_modules/fbjs/lib/ErrorUtils.js',
      'node_modules/fbjs/lib/URI.js',
      'node_modules/fbjs/lib/Deferred.js',
      'node_modules/fbjs/lib/PromiseMap.js',
      'node_modules/fbjs/lib/UserAgent.js',
      'node_modules/fbjs/lib/areEqual.js',
      'node_modules/fbjs/lib/base62.js',
      'node_modules/fbjs/lib/crc32.js',
      'node_modules/fbjs/lib/everyObject.js',
      'node_modules/fbjs/lib/fetchWithRetries.js',
      'node_modules/fbjs/lib/filterObject.js',
      'node_modules/fbjs/lib/flattenArray.js',
      'node_modules/fbjs/lib/forEachObject.js',
      'node_modules/fbjs/lib/isEmpty.js',
      'node_modules/fbjs/lib/removeFromArray.js',
      'node_modules/fbjs/lib/resolveImmediate.js',
      'node_modules/fbjs/lib/someObject.js',
      'node_modules/fbjs/lib/sprintf.js',
      'node_modules/fbjs/lib/xhrSimpleDataSerializer.js',
      'node_modules/jest-cli',
      'node_modules/react/dist',
      'node_modules/fbjs/.*/__mocks__/',
      'node_modules/fbjs/node_modules/',
    ],
    'unmockedModulePathPatterns': [
      'node_modules/react/',
      'Libraries/Renderer',
      'promise',
      'source-map',
      'fastpath',
      'denodeify',
      'fbjs',
    ],
    'testEnvironment': 'node',
    'collectCoverageFrom': [
      'Libraries/**/*.js',
    ],
    'coveragePathIgnorePatterns': [
      '/__tests__/',
      '/vendor/',
      '<rootDir>/Libraries/react-native/',
    ],
};
