'use strict';

var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var DeliveryAction = require('./DeliveryAction-9cae8595.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * @description Controls the quality of the delivered image or video.
 * @memberOf Actions.Delivery
 * @extends {Actions.Delivery.DeliveryAction}
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryQualityAction extends DeliveryAction.DeliveryAction {
    /**
     * @param {Qualifiers.Quality} qualityValue a Quality value
     */
    constructor(qualityValue) {
        super('q', qualityValue.toString(), 'level');
    }
    /**
     * Selet the Chroma sub sampling</br>
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/image_optimization#toggle_chroma_subsampling|Toggling chroma subsampling}
     * @param {420 | 444 | number} type The chroma sub sampling type
     */
    chromaSubSampling(type) {
        this._actionModel.chromaSubSampling = internalConstants.CHROMA_VALUE_TO_CHROMA_MODEL_ENUM[type];
        const qualityWithSubSampling = new QualifierValue.QualifierValue([this._actionModel.level, type]);
        qualityWithSubSampling.setDelimiter(':');
        // We either have chroma or quantization, but not both
        return this.addQualifier(new Qualifier.Qualifier('q', qualityWithSubSampling));
    }
    /**
     * Controls the final quality by setting a maximum quantization percentage
     * @param {number} val
     */
    quantization(val) {
        this._actionModel.quantization = val;
        const qualityWithQuantization = new QualifierValue.QualifierValue([this._actionModel.level, `qmax_${val}`]).setDelimiter(':');
        // We either have chroma or quantization, but not both
        return this.addQualifier(new Qualifier.Qualifier('q', qualityWithQuantization));
    }
    static fromJson(actionModel) {
        const { level, chromaSubSampling, quantization } = actionModel;
        const levelType = internalConstants.ACTION_TYPE_TO_QUALITY_MODE_MAP[level] || level;
        const result = new this(levelType);
        if (chromaSubSampling) {
            //Turn strings like 'CHROMA_420' to 420
            const chromaValue = internalConstants.CHROMA_MODEL_ENUM_TO_CHROMA_VALUE[chromaSubSampling.toUpperCase()];
            chromaValue && result.chromaSubSampling(+chromaValue);
        }
        quantization && result.quantization(quantization);
        return result;
    }
}

exports.DeliveryQualityAction = DeliveryQualityAction;
