'use strict';

var CustomFunctionAction = require('./CustomFunctionAction-a158bea9.cjs');
var RemoteAction = require('./RemoteAction-675a9b4a.cjs');

/**
 * Calls a custom function. </br>
 * Learn more: {@link https://cloudinary.com/documentation/custom_functions|Custom functions}
 * @memberOf Actions
 * @namespace CustomFunction
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {remote, wasm} from "@cloudinary/url-gen/actions/customFunction";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.customFunction(
 *  remote('http://example.com')
 * );
 *
 * image.customFunction(
 *  wasm('myPublicID'); // publicID from Cloudinary
 * );
 */
/**
 * @summary action
 * @description - Calls a custom function. </br>
 * For more information about remote custom functions see {@link https://cloudinary.com/documentation/custom_functions#remote_functions|the documentation}
 * @param {string} path - Specifies the URL of the remote custom function.
 * @memberOf Actions.CustomFunction
 * @return {Actions.CustomFunctionAction}
 */
function remote(path) {
    return new RemoteAction.RemoteAction(path)
        .asRemote();
}
/**
 * @summary action
 * @description - Calls a custom function.  </br>
 * For more information about wasm custom functions see {@link https://cloudinary.com/documentation/custom_functions#webassembly_functions|the documentation}
 * @param {string} publicID - Specifies the publicID of the custom function stored in Cloudinary
 * @memberOf Actions.CustomFunction
 * @return {Actions.CustomFunctionAction}
 */
function wasm(publicID) {
    return new CustomFunctionAction.CustomFunctionAction(publicID)
        .asWasm();
}
const CustomFunction = { remote, wasm };

exports.CustomFunction = CustomFunction;
exports.remote = remote;
exports.wasm = wasm;
