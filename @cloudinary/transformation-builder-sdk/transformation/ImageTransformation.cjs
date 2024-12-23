'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-7a681263.cjs');
var transformation_Transformation = require('./Transformation.cjs');
require('../internal/Action.cjs');
require('../qualifiers/flag/FlagQualifier.cjs');
require('../internal/qualifier/QualifierValue.cjs');
require('../internal/qualifier/Qualifier.cjs');
require('../internal/models/QualifierModel.cjs');
require('../internal/models/qualifierToJson.cjs');
require('../internal/utils/unsupportedError.cjs');
require('../internal/utils/dataStructureUtils.cjs');
require('../internal/models/ActionModel.cjs');
require('../internal/models/actionToJson.cjs');
require('../actions/background/actions/BackgroundColor.cjs');
require('../internal/utils/prepareColor.cjs');
require('../internal/RawAction.cjs');
require('../internal/models/IErrorObject.cjs');
require('../actions/delivery/DeliveryFormatAction.cjs');
require('../qualifiers/flag.cjs');
require('../actions/delivery/DeliveryAction.cjs');
require('../qualifiers/format/FormatQualifier.cjs');
require('../internal/internalConstants.cjs');
require('../internal/utils/objectFlip.cjs');
require('../qualifiers/progressive.cjs');

/**
 * @summary SDK
 * @extends {SDK.Transformation}
 * @memberOf SDK
 */
var ImageTransformation = /** @class */ (function (_super) {
    tslib_es6.__extends(ImageTransformation, _super);
    function ImageTransformation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageTransformation;
}(transformation_Transformation.Transformation));

exports.ImageTransformation = ImageTransformation;
