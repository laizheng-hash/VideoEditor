'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../tslib.es6-66bcd4e3.cjs');
var qualifiers_gravity_GravityQualifier = require('../GravityQualifier.cjs');
require('../../../Qualifier-6633a22f.cjs');
require('../../../QualifierValue-e770d619.cjs');
require('../../../QualifierModel-0923d819.cjs');
require('../../../unsupportedError-74070138.cjs');

/**
 * @description The class for the XYCenter Gravity builder
 * @memberOf Qualifiers.Gravity
 * @extends {Qualifiers.Gravity.GravityQualifier}
 */
var XYCenterGravity = /** @class */ (function (_super) {
    tslib_es6.__extends(XYCenterGravity, _super);
    function XYCenterGravity() {
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        return _super.call(this, 'xy_center') || this;
    }
    return XYCenterGravity;
}(qualifiers_gravity_GravityQualifier.GravityQualifier));

exports.XYCenterGravity = XYCenterGravity;
