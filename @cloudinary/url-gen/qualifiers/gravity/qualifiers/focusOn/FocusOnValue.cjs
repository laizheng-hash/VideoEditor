'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../tslib.es6-66bcd4e3.cjs');
var QualifierValue = require('../../../../QualifierValue-e770d619.cjs');

/**
 * @memberOf Qualifiers.FocusOn
 * @extends {SDK.QualifierValue}
 */
var FocusOnValue = /** @class */ (function (_super) {
    tslib_es6.__extends(FocusOnValue, _super);
    function FocusOnValue(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    FocusOnValue.prototype.toString = function () {
        return this.name;
    };
    return FocusOnValue;
}(QualifierValue.QualifierValue));

exports.FocusOnValue = FocusOnValue;
