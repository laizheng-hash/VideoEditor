'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../tslib.es6-7a681263.cjs');
var qualifiers_background_shared_base_BaseCommonBackground = require('../base/BaseCommonBackground.cjs');
require('../../../../internal/utils/prepareColor.cjs');
require('../base/BackgroundQualifier.cjs');
require('../../../../internal/qualifier/Qualifier.cjs');
require('../../../../internal/qualifier/QualifierValue.cjs');
require('../../../../internal/models/QualifierModel.cjs');
require('../../../../internal/models/qualifierToJson.cjs');
require('../../../../internal/utils/unsupportedError.cjs');

/**
 * @description Automatically determines the color to use for padding, if needed when resizing an asset. Selects the
 * predominant color from the whole image.
 * @memberOf Qualifiers.Background
 * @extends {Qualifiers.Background.BaseCommonBackground}
 */
var BackgroundAutoPredominantQualifier = /** @class */ (function (_super) {
    tslib_es6.__extends(BackgroundAutoPredominantQualifier, _super);
    function BackgroundAutoPredominantQualifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description
     * Stringify the qualifier
     * BackgroundQualifiers don't have a value, but instead override the toString() function.
     */
    BackgroundAutoPredominantQualifier.prototype.toString = function () {
        return ("\n    b_auto:predominant\n    " + (this._contrast ? '_contrast' : '') + "\n    " + (this._palette.length ? ":palette_" + this._palette.join('_') : '') + "\n    ").replace(/\s+/g, '');
    };
    return BackgroundAutoPredominantQualifier;
}(qualifiers_background_shared_base_BaseCommonBackground.BaseCommonBackground));

exports.BackgroundAutoPredominantQualifier = BackgroundAutoPredominantQualifier;
