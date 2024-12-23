'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkAnalytics_stringPad = require('./stringPad.cjs');

/**
 * @private
 * @description Pads each segment with '0' so they have length of 2
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of xx.yy.zz (
 */
function padVersion(semVer) {
    if (semVer.split('.').length < 2) {
        throw new Error('invalid semVer, must have at least two segments');
    }
    // Split by '.', reverse, create new array with padded values and concat it together
    return semVer.split('.').map(function (segment) {
        // try to cast to number
        var asNumber = +segment;
        if (isNaN(asNumber) || asNumber < 0) {
            throw 'Invalid version number provided';
        }
        return sdkAnalytics_stringPad.stringPad(segment, 2, '0');
    }).join('.');
}

exports.padVersion = padVersion;
