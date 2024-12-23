'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
/**
 * @private
 */
var ALLOWED_URL_CONFIG = [
    'cname',
    'secureDistribution',
    'privateCdn',
    'signUrl',
    'longUrlSignature',
    'shorten',
    'useRootPath',
    'secure',
    'forceVersion',
    'analytics',
    'queryParams'
];
/**
 * @private
 */
var ALLOWED_CLOUD_CONFIG = [
    'cloudName',
    'apiKey',
    'apiSecret',
    'authToken'
];

exports.ALLOWED_CLOUD_CONFIG = ALLOWED_CLOUD_CONFIG;
exports.ALLOWED_URL_CONFIG = ALLOWED_URL_CONFIG;
