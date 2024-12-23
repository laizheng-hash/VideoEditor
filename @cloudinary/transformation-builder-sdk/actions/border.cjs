'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../tslib.es6-7a681263.cjs');
var internal_Action = require('../internal/Action.cjs');
var internal_qualifier_QualifierValue = require('../internal/qualifier/QualifierValue.cjs');
var internal_qualifier_Qualifier = require('../internal/qualifier/Qualifier.cjs');
var internal_utils_prepareColor = require('../internal/utils/prepareColor.cjs');
var actions_roundCorners_RoundCornersAction = require('./roundCorners/RoundCornersAction.cjs');
require('../qualifiers/flag/FlagQualifier.cjs');
require('../internal/utils/dataStructureUtils.cjs');
require('../internal/models/ActionModel.cjs');
require('../internal/models/actionToJson.cjs');
require('../internal/utils/unsupportedError.cjs');
require('../internal/models/QualifierModel.cjs');
require('../internal/models/qualifierToJson.cjs');

/**
 * @description Adds a solid border around an image or video.
 *
 *  <b>Learn more:</b>
 * {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#borders|Adding image borders}
 * @memberOf Actions
 * @namespace Border
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {solid} from "@cloudinary/url-gen/actions/border";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.border(
 *  solid(15, 'green'),
 *  // Or alternatively
 *  solid().width(15).color('green')
 * );
 *
 */
/**
 * @memberOf Actions.Border
 * @see Actions.Border
 * @example
 * // Used through a builder function Border.solid(), and not by creating a new instance
 * import {Cloudinary} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.border(
 *  Border.solid(15, 'green'),
 *  // Or alternatively
 *  Border.solid().width(15).color('green')
 * );
 */
var BorderAction = /** @class */ (function (_super) {
    tslib_es6.__extends(BorderAction, _super);
    /**
     * @description Adds a border of the specified type around an image or video.
     * @param {'solid'} borderType The type of border (currently only 'solid' is supported). Use values in {@link Qualifiers.Border|Border Values}.
     * @param {string} color The color of the border.
     * @param {number} borderWidth The width in pixels.
     */
    function BorderAction(borderType, color, borderWidth) {
        var _this = _super.call(this) || this;
        _this._actionModel = {};
        _this.borderType = borderType;
        _this.borderColor = internal_utils_prepareColor.prepareColor(color);
        _this.borderWidth = borderWidth;
        _this._actionModel = {
            color: internal_utils_prepareColor.prepareColor(color),
            width: borderWidth,
            actionType: 'border',
        };
        return _this;
    }
    /**
     * @description Sets the width of the border
     * @param {number | string} borderWidth The width in pixels.
     */
    BorderAction.prototype.width = function (borderWidth) {
        this.borderWidth = borderWidth;
        this._actionModel.width = borderWidth;
        return this;
    };
    /**
     * @description Sets the color of the border.
     * @param {string} borderColor The color of the border.
     */
    BorderAction.prototype.color = function (borderColor) {
        this.borderColor = internal_utils_prepareColor.prepareColor(borderColor);
        this._actionModel.color = internal_utils_prepareColor.prepareColor(borderColor);
        return this;
    };
    /**
     * @description Rounds the specified corners of an image.
     * @param {RoundCornersAction} roundCorners
     * @return {this}
     */
    BorderAction.prototype.roundCorners = function (roundCorners) {
        this._roundCorners = roundCorners;
        this._actionModel.radius = roundCorners.getRadius();
        return this;
    };
    /**
     * @description Sets the style of the border.
     * @param {number | string} width The width in pixels.
     * @param {string} color The color of the border, e.g 'green', 'yellow'.
     * @return {this}
     */
    BorderAction.prototype.solid = function (width, color) {
        this.borderType = 'solid';
        this.borderColor = internal_utils_prepareColor.prepareColor(color);
        this.borderWidth = width;
        this._actionModel.color = internal_utils_prepareColor.prepareColor(color);
        this._actionModel.width = width;
        return this;
    };
    BorderAction.prototype.prepareQualifiers = function () {
        var qualifierValue = new internal_qualifier_QualifierValue.QualifierValue([this.borderWidth + "px", this.borderType, "" + this.borderColor]).setDelimiter('_');
        this.addQualifier(new internal_qualifier_Qualifier.Qualifier('bo', qualifierValue));
        if (this._roundCorners) {
            this.addQualifier(this._roundCorners.qualifiers.get('r'));
        }
    };
    BorderAction.fromJson = function (actionModel) {
        var _a = actionModel, width = _a.width, color = _a.color, radius = _a.radius;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        var result = new this('solid', color, width);
        if (radius) {
            var roundCornersAction = (function () {
                var _a;
                if (radius === 'max') {
                    return new actions_roundCorners_RoundCornersAction().max();
                }
                if (Array.isArray(radius)) {
                    return (_a = new actions_roundCorners_RoundCornersAction()).radius.apply(_a, radius);
                }
                return undefined;
            })();
            if (roundCornersAction) {
                result.roundCorners(roundCornersAction);
            }
        }
        return result;
    };
    return BorderAction;
}(internal_Action.Action));
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the style of the border.
 * @param {number | string} width The width in pixels.
 * @param {string} color The color of the border, e.g 'green', 'yellow'.
 * @return {Actions.Border.BorderAction}
 */
function solid(width, color) {
    return new BorderAction('solid', color, width);
}
/**
 * @summary action
 * @memberOf Actions.Border
 * @description Sets the radius of the border.
 * @param {Actions.RoundCorners.RoundCornersAction} roundCorners RoundCorners action.
 * @return {Actions.Border.BorderAction}
 */
function roundCorners(roundCorners) {
    var borderActionInstance = new BorderAction('solid', 'transparent', 0);
    borderActionInstance.roundCorners(roundCorners);
    return borderActionInstance;
}
var Border = {
    solid: solid,
    roundCorners: roundCorners,
};

exports.Border = Border;
exports.BorderAction = BorderAction;
exports.roundCorners = roundCorners;
exports.solid = solid;
