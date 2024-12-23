'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SetAction = require('../SetAction-70508eba.cjs');
var SetAssetReferenceAction = require('../SetAssetReferenceAction-40a1c0a0.cjs');
var SetFromContextAction = require('../SetFromContextAction-1be722bb.cjs');
var SetFromMetadataAction = require('../SetFromMetadataAction-1e2036f8.cjs');
var toFloatAsString = require('../toFloatAsString-4766ab85.cjs');
require('../Action-0ed405c1.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');
require('../VariableAction-2bc81ff6.cjs');

/**
 * Defines a new user variable with the given value.
 * @memberOf Actions
 * @namespace Variable
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
 * import {
 *  set,
 *  setAssetReference,
 *  setFromContext,
 *  setFromMetadata
 * } from "@cloudinary/url-gen/actions/variable";
 * import {scale} from "@cloudinary/url-gen/actions/resize";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 *
 * const image = yourCldInstance.image('woman');
 * image
 *  .addVariable(set('foo1', 100))
 *  .addVariable(setAssetReference('foo2', 'val'))
 *  .addVariable(setFromContext('foo3', 'val'))
 *  .addVariable(setFromMetadata('foo4', 'val'))
 *  .resize(scale().width('$foo1').height('$foo2'))
 */
/**
 * @summary action
 * @description Sets a new user variable with the given value.
 * @memberOf Actions.Variable
 * @param {string} name Variable name
 * @param {number | string | number[] | string[]} value Variable value
 * @return {Actions.Variable.SetAction}
 */
function set(name, value) {
    if (Object.prototype.hasOwnProperty.call(value, 'push')) {
        return new SetAction.SetAction(name, value);
    }
    return new SetAction.SetAction(name, value);
}
/**
 * @summary action
 * @description Same as 'set', but forces the end value to be a float  setFloat(1) will result in $foo_1.0
 * @memberOf Actions.Variable
 * @param {string} name Variable name
 * @param {number} value Variable value
 * @return {Actions.Variable.SetAction}
 */
function setFloat(name, value) {
    return new SetAction.SetAction(name, toFloatAsString.toFloatAsString(value), '');
}
/**
 * @summary action
 * @description Same as 'set', but forces the end value to be an integer setInteger(1.1) will result in $foo_1, input is rounded down
 * @memberOf Actions.Variable
 * @param {string} name Variable name
 * @param {number} value Variable value
 * @return {Actions.Variable.SetAction}
 */
function setInteger(name, value) {
    let val = value;
    if (typeof value === 'string') {
        val = parseInt(value);
    }
    if (isNaN(val)) {
        val = 0;
    }
    return new SetAction.SetAction(name, Math.round(val));
}
/**
 * @summary action
 * @description Same as 'set', but forces the end value to be a string setString(1) will result in $foo_!1!
 * @memberOf Actions.Variable
 * @param {string | number} name Variable name
 * @param {number} value Variable value
 * @return {Actions.Variable.SetAction}
 */
function setString(name, value) {
    return new SetAction.SetAction(name, value.toString());
}
/**
 * @summary action
 * @description Allows adding a variable by sending a key and value which is a reference to an asset.
 * @memberOf Actions.Variable
 * @param {string} name
 * @param {string} value
 * @return {Actions.Variable.SetAssetReferenceAction}
 */
function setAssetReference(name, value) {
    return new SetAssetReferenceAction.SetAssetReferenceAction(name, value);
}
/**
 * @summary action
 * @description Allows adding a variable by sending a key and value which is a key to a value that assumed to be on
 * the asset’s context.
 * @memberOf Actions.Variable
 * @param {string} name
 * @param {string} value
 * @return {Actions.Variable.SetFromContextAction}
 */
function setFromContext(name, value) {
    return new SetFromContextAction.SetFromContextAction(name, value);
}
/**
 * @summary action
 * @description Allows adding a variable by sending a name and value which is a key to a value that assumed to be on
 * the predefined account’s metadata fields.
 * @memberOf Actions.Variable
 * @param {string} name
 * @param {string} value
 * @return {Actions.Variable.SetFromMetadataAction}
 */
function setFromMetadata(name, value) {
    return new SetFromMetadataAction.SetFromMetadataAction(name, value);
}
const Variable = {
    set,
    setFloat,
    setString,
    setInteger,
    setAssetReference,
    setFromContext,
    setFromMetadata
};

exports.Variable = Variable;
exports.set = set;
exports.setAssetReference = setAssetReference;
exports.setFloat = setFloat;
exports.setFromContext = setFromContext;
exports.setFromMetadata = setFromMetadata;
exports.setInteger = setInteger;
exports.setString = setString;
