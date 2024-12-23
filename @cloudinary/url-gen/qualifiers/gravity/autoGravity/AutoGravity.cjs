'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../tslib.es6-66bcd4e3.cjs');
var qualifiers_gravity_GravityQualifier = require('../GravityQualifier.cjs');
require('../../../Qualifier-6633a22f.cjs');
require('../../../QualifierValue-e770d619.cjs');
require('../../../QualifierModel-0923d819.cjs');
require('../../../unsupportedError-74070138.cjs');

/**
 * @description The class for the autoGravity builder
 * @memberOf Qualifiers.Gravity
 * @extends {Qualifiers.Gravity.GravityQualifier}
 */
var AutoGravity = /** @class */ (function (_super) {
    tslib_es6.__extends(AutoGravity, _super);
    function AutoGravity() {
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        return _super.call(this, 'auto') || this;
    }
    /**
     * @description Autofocuses on objects, allowing their priority within the algorithm to be configured.
     * @param {AutoFocus} AutoFocusObjects
     */
    AutoGravity.prototype.autoFocus = function () {
        var AutoFocusObjects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            AutoFocusObjects[_i] = arguments[_i];
        }
        this.addValue(AutoFocusObjects);
        return this;
    };
    return AutoGravity;
}(qualifiers_gravity_GravityQualifier.GravityQualifier));

exports.AutoGravity = AutoGravity;
