'use strict';

var Action = require('./Action-0ed405c1.cjs');
var BlendModeQualifier = require('./BlendModeQualifier-744337e6.cjs');
var FlagQualifier = require('./FlagQualifier-7b069f22.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var createSourceFromModel = require('./createSourceFromModel-e4533c35.cjs');
var PositionQualifier = require('./PositionQualifier-5c8f4ac6.cjs');
var createGravityFromModel = require('./createGravityFromModel-0f5b0a48.cjs');
var TimelinePosition = require('./TimelinePosition-bc131865.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * Create Position from given IPositionModel
 * @param position
 */
function createPositionFromModel(position) {
    const { offsetX, offsetY, tiled, allowOverflow, gravity } = position;
    const result = new PositionQualifier.PositionQualifier();
    if (offsetX) {
        result.offsetX(offsetX);
    }
    if (offsetY) {
        result.offsetY(offsetY);
    }
    if (tiled) {
        result.tiled();
    }
    if (allowOverflow != null) {
        result.allowOverflow(allowOverflow);
    }
    if (gravity) {
        result.gravity(createGravityFromModel.createGravityFromModel(gravity));
    }
    return result;
}

/**
 * Create TimelinePosition from given ITimelinePositionModel
 * @param timelinePosition
 */
function createTimelinePositionFromModel(timelinePosition) {
    const { startOffset, endOffset, duration } = timelinePosition;
    const result = new TimelinePosition.TimelinePosition();
    if (startOffset) {
        result.startOffset(startOffset);
    }
    if (endOffset) {
        result.endOffset(endOffset);
    }
    if (duration) {
        result.duration(duration);
    }
    return result;
}

/**
 * @extends SDK.Action
 * @memberOf SDK
 * @description
 * A generic Layer action that can add a Video, Text or Image layer.<br>
 * This class can represent an overlay or an underlay.
 */
class LayerAction extends Action.Action {
    /**
     * @description Creates a LayerAction to be used with overlays and underlays
     * @param {ImageSource | TextSource | VideoSource} layerSource The Source used for the layer, use the builders provided {@link Qualifiers.Source|here}
     */
    constructor(layerSource) {
        super();
        this.source = layerSource;
        this._actionModel = {
            actionType: 'overlay',
            source: layerSource.toJson()
        };
    }
    /**
     * @description Sets the layerType to 'u' (underlay) or 'l' (overlay).
     * @param {'u' | 'l'} type
     * @return {this}
     */
    setLayerType(type) {
        this.layerType = type;
        this._actionModel.actionType = type === 'u' ? 'underlay' : 'overlay';
        return this;
    }
    /**
     * @description Sets the timeline position of the video layer
     * @param {Qualifiers.TimelinePosition} timelinePosition
     * @return {this}
     */
    timeline(timelinePosition) {
        this._timelinePosition = timelinePosition;
        this._actionModel.timelinePosition = timelinePosition.toJson();
        return this;
    }
    /**
     * @description Sets the position of the layer
     * @param {Qualifiers.Position} position
     * @return {this}
     */
    position(position) {
        this._position = position;
        this._actionModel.position = position.toJson();
        return this;
    }
    /**
     * @description Specifies how to blend the image overlay with the base overlay
     * @param {Qualifiers.BlendMode|BlendModeType} blendMode
     * @return {this}
     */
    blendMode(blendMode) {
        this._blendMode = blendMode;
        const [mode, level] = `${blendMode}`.replace('e_', '').split(":");
        if (mode === 'anti_removal') {
            this._actionModel.blendMode = level ? { blendModeType: 'antiRemoval', level: level } : { blendModeType: 'antiRemoval' };
        }
        else {
            this._actionModel.blendMode = { blendModeType: mode };
        }
        return this;
    }
    /**
     * @private
     * @description
     * Closes a layer (layers are built in three stages -> /Open/Transform/Close).
     * @return {SDK.Action}
     */
    closeLayer() {
        var _a, _b, _c, _d;
        const bit = new Action.Action().addFlag(new FlagQualifier.FlagQualifier('layer_apply'));
        (_a = this._position) === null || _a === void 0 ? void 0 : _a.qualifiers.forEach((qualifier) => {
            bit.addQualifier(qualifier);
        });
        // Flags are stored separately from qualifiers, we need to add those as well
        (_b = this._position) === null || _b === void 0 ? void 0 : _b.flags.forEach((flag) => {
            bit.addFlag(flag);
        });
        if (typeof this._blendMode === "string") {
            bit.addQualifier(new Qualifier.Qualifier('e', this._blendMode));
        }
        else {
            (_c = this._blendMode) === null || _c === void 0 ? void 0 : _c.qualifiers.forEach((qualifier) => {
                bit.addQualifier(qualifier);
            });
        }
        (_d = this._timelinePosition) === null || _d === void 0 ? void 0 : _d.qualifiers.forEach((qualifier) => {
            bit.addQualifier(qualifier);
        });
        return bit;
    }
    /**
     * @private
     * @description
     * Opens a layer (layers are built in three stages -> /Open/Transform/Close).
     * @return string
     */
    openLayer() {
        return `${this.source.getOpenSourceString(this.layerType)}`;
    }
    /**
     * @description
     * Serializes the Layer to a string
     * @return {string}
     */
    toString() {
        return [
            this.openLayer(),
            this.source.getTransformation() && this.source.getTransformation().toString(),
            this.closeLayer()
        ].filter((a) => a).join('/');
    }
    static fromJson(actionModel, transformationFromJson) {
        const { source, actionType, position, timelinePosition, blendMode } = actionModel;
        const sourceInstance = createSourceFromModel.createSourceFromModel(source, transformationFromJson);
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(sourceInstance);
        const layerType = actionType === 'overlay' ? 'l' : 'u';
        result.setLayerType(layerType);
        if (position) {
            result.position(createPositionFromModel(position));
        }
        if (timelinePosition) {
            result.timeline(createTimelinePositionFromModel(timelinePosition));
        }
        if (blendMode) {
            const blendModeType = internalConstants.ACTION_TYPE_TO_BLEND_MODE_MAP[blendMode.blendModeType] || blendMode.blendModeType;
            if (blendMode === null || blendMode === void 0 ? void 0 : blendMode.level) {
                result.blendMode(new BlendModeQualifier.BlendModeQualifier(blendModeType, blendMode.level));
            }
            else {
                result.blendMode(new BlendModeQualifier.BlendModeQualifier(blendModeType));
            }
        }
        return result;
    }
}

exports.LayerAction = LayerAction;
