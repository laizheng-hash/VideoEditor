'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var actions_resize_ResizeSimpleAction = require('./ResizeSimpleAction.cjs');
var qualifiers_gravity_GravityQualifier = require('../../qualifiers/gravity/GravityQualifier.cjs');
require('../../internal/qualifier/Qualifier.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/Action.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');
require('../../internal/utils/toFloatAsString.cjs');
require('../../qualifiers/aspectRatio/AspectRatioQualifierValue.cjs');
require('../../qualifiers/flag.cjs');
require('../../internal/internalConstants.cjs');
require('../../internal/utils/objectFlip.cjs');

/**
 * @description Defines a scaling resize action.
 * @extends Actions.Resize.ResizeSimpleAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
var ResizeScaleAction = /** @class */ (function (_super) {
    tslib_es6.__extends(ResizeScaleAction, _super);
    function ResizeScaleAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @description Changes the aspect ratio of an image while retaining all important content and avoiding unnatural
     * distortions.
     * @return {this}
     */
    ResizeScaleAction.prototype.liquidRescaling = function () {
        return this.addQualifier(new qualifiers_gravity_GravityQualifier.GravityQualifier('liquid'));
    };
    return ResizeScaleAction;
}(actions_resize_ResizeSimpleAction.ResizeSimpleAction));

exports.ResizeScaleAction = ResizeScaleAction;
