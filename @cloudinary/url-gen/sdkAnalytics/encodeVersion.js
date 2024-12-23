import { base64Map } from "./base64Map.js";
import { stringPad } from "./stringPad.js";
import { reverseVersion } from "./reverseVersion.js";
import { padVersion } from "./padVersion.js";
/**
 * @private
 * @description Encodes a semVer-like version string
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} A string built from 3 characters of the base64 table that encode the semVer
 */
export function encodeVersion(semVer) {
    let strResult = '';
    // support x.y or x.y.z by using 'parts' as a variable
    const parts = semVer.split('.').length;
    const paddedStringLength = parts * 6; // we pad to either 12 or 18 characters
    // reverse (but don't mirror) the version. 1.5.15 -> 15.5.1
    const reversedSemver = reverseVersion(semVer);
    // Pad to two spaces, 15.5.1 -> 15.05.01
    const paddedSemver = padVersion(reversedSemver);
    // turn 15.05.01 to a string '150501' then to a number 150501
    const num = parseInt(paddedSemver.split('.').join(''));
    // Represent as binary, add left padding to 12 or 18 characters.
    // 150,501 -> 100100101111100101
    let paddedBinary = num.toString(2);
    paddedBinary = stringPad(paddedBinary, paddedStringLength, '0');
    // Stop in case an invalid version number was provided
    // paddedBinary must be built from sections of 6 bits
    if (paddedBinary.length % 6 !== 0) {
        throw 'Version must be smaller than 43.21.26)';
    }
    // turn every 6 bits into a character using the base64Map
    paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
        // console.log(bitString);
        strResult += base64Map[bitString];
    });
    return strResult;
}
