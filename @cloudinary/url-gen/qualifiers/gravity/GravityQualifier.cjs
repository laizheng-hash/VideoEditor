'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-66bcd4e3.cjs');
var Qualifier = require('../../Qualifier-6633a22f.cjs');
var QualifierValue = require('../../QualifierValue-e770d619.cjs');
require('../../QualifierModel-0923d819.cjs');
require('../../unsupportedError-74070138.cjs');

/**
 * @memberOf Gravity.GravityQualifier
 * @extends {SDK.Qualifier}
 */
var GravityQualifier = /** @class */ (function (_super) {
    tslib_es6.__extends(GravityQualifier, _super);
    /**
     * @param value, an array containing (GravityObject | AutoGravity | string) or a string;
     */
    function GravityQualifier(value) {
        return _super.call(this, 'g', new QualifierValue.QualifierValue(value)) || this;
    }
    return GravityQualifier;
}(Qualifier.Qualifier));

exports.GravityQualifier = GravityQualifier;
