'use strict';

var FlagQualifier = require('./FlagQualifier-7b069f22.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var unsupportedError = require('./unsupportedError-74070138.cjs');

/**
 * Sort a map by key
 * @private
 * @param map <string, any>
 * @Return array of map's values sorted by key
 */
function mapToSortedArray(map, flags) {
    const array = Array.from(map.entries());
    // objects from the Array.from() method above are stored in array of arrays:
    // [[qualifierKey, QualifierObj], [qualifierKey, QualifierObj]]
    // Flags is an array of FlagQualifierObj
    // We need to convert it to the same form: [flagQualifier] =>  ['fl', flagQualifier]
    flags.forEach((flag) => {
        array.push(['fl', flag]); // push ['fl', flagQualifier]
    });
    return array.sort().map((v) => v[1]);
}
/**
 * Checks if `value` is a string.
 * @private
 * @param {*} value The value to check.
 * @return {boolean} `true` if `value` is a string, else `false`.
 */
function isString(value) {
    return (typeof value === 'string' || value instanceof String);
}

/**
 * Returns the action's model
 */
function actionToJson() {
    var _a, _b, _c;
    const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
    const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
    // Should return error when there is unsupported transformation inside
    if (sourceTransformationError && sourceTransformationError instanceof Error) {
        return { error: sourceTransformationError };
    }
    if (actionModelIsNotEmpty) {
        return this._actionModel;
    }
    return { error: unsupportedError.createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}

class ActionModel {
    constructor() {
        this._actionModel = {};
    }
    toJson() {
        return actionToJson.apply(this);
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 * @description Defines the category of transformation to perform.
 */
class Action extends ActionModel {
    constructor() {
        super(...arguments);
        // We're using map, to overwrite existing keys. for example:
        // addParam(w_100).addQualifier(w_200) should result in w_200. and not w_100,w_200
        this.qualifiers = new Map();
        // Unlike regular qualifiers, there can be multiple flags in each url component /fl_1,fl_2/
        // If the falgs are added to the qualifiers map, only a single flag could exist in a component (it's a map)
        // So flags are stored separately until the very end because of that reason
        this.flags = [];
        this.delimiter = ','; // {qualifier}{delimiter}{qualifier} for example: `${'w_100'}${','}${'c_fill'}`
        this.actionTag = ''; // A custom name tag to identify this action in the future
    }
    prepareQualifiers() { }
    /**
     * @description Returns the custom name tag that was given to this action
     * @return {string}
     */
    getActionTag() {
        return this.actionTag;
    }
    /**
     * @description Sets the custom name tag for this action
     * @return {this}
     */
    setActionTag(tag) {
        this.actionTag = tag;
        return this;
    }
    /**
     * @description Calls toString() on all child qualifiers (implicitly by using .join()).
     * @return {string}
     */
    toString() {
        this.prepareQualifiers();
        return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
    }
    /**
     * @description Adds the parameter to the action.
     * @param {SDK.Qualifier} qualifier
     * @return {this}
     */
    addQualifier(qualifier) {
        // if string, find the key and value
        if (typeof qualifier === 'string') {
            const [key, value] = qualifier.toLowerCase().split('_');
            if (key === 'fl') {
                // if string qualifier is a flag, store it in the flags arrays
                this.flags.push(new FlagQualifier.FlagQualifier(value));
            }
            else {
                // if the string qualifier is not a flag, create a new qualifier from it
                this.qualifiers.set(key, new Qualifier.Qualifier(key, value));
            }
        }
        else {
            // if a qualifier object, insert to the qualifiers map
            this.qualifiers.set(qualifier.key, qualifier);
        }
        return this;
    }
    /**
     * @description Adds a flag to the current action.
     * @param {Qualifiers.Flag} flag
     * @return {this}
     */
    addFlag(flag) {
        if (typeof flag === 'string') {
            this.flags.push(new FlagQualifier.FlagQualifier(flag));
        }
        else {
            if (flag instanceof FlagQualifier.FlagQualifier) {
                this.flags.push(flag);
            }
        }
        return this;
    }
    addValueToQualifier(qualifierKey, qualifierValue) {
        this.qualifiers.get(qualifierKey).addValue(qualifierValue);
        return this;
    }
}

exports.Action = Action;
exports.isString = isString;
