'use strict';

var fontWeight = require('./fontWeight-26f14240.cjs');
var fontStyle = require('./fontStyle-26a61de5.cjs');
var textDecoration = require('./textDecoration-97f36d3b.cjs');
var QualifierModel = require('./QualifierModel-0923d819.cjs');
var textStroke = require('./textStroke-36d008fd.cjs');

/**
 *
 * @description - Replace (,) and (/) in a string to its URL encoded equivalence
 * @param {string} str
 * @private
 */
function serializeCloudinaryCharacters(str = '') {
    return str
        .replace(/,/g, '%2C')
        .replace(/\//g, '%2F');
}

/**
 * Validate that obj is an ISolidStrokeModel
 * @param obj
 */
function isISolidStrokeModel(obj) {
    return typeof obj === 'object' && obj.width != null && obj.color != null;
}

/**
 * @summary qualifier
 * @description Specifies how to style your layered text, controls the font, font size, line spacing and more.
 * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @see {@link Actions.Overlay| The overlay action}
 * @see {@link Actions.Underlay| The underlay action}
 * @memberOf Qualifiers
 */
class TextStyle extends QualifierModel.QualifierModel {
    /**
     * @param {string} fontFamily The font family
     * @param {number | string} fontSize The font size
     */
    constructor(fontFamily, fontSize) {
        super();
        if (!fontFamily || !fontSize) {
            throw `You must provide a fontFamily and fontSize to a TextStyle`;
        }
        this._qualifierModel.fontFamily = fontFamily;
        this._qualifierModel.fontSize = fontSize;
    }
    /**
     * @param {number} spacing The spacing between multiple lines in pixels.
     */
    lineSpacing(spacing) {
        this._qualifierModel.lineSpacing = spacing;
        return this;
    }
    /**
     * @param spacing The spacing between the letters, in pixels.
     */
    letterSpacing(spacing) {
        this._qualifierModel.letterSpacing = spacing;
        return this;
    }
    /**
     * The antialias setting to apply to the text. When this parameter is not specified, the default antialiasing for the subsystem and target device are applied.
     * @param {FontAntialiasType|string} antiAlias
     */
    fontAntialias(antiAlias) {
        this._qualifierModel.fontAntialias = antiAlias;
        return this;
    }
    /**
     * The name of any universally available font or a custom font, specified as the public ID of a raw, authenticated font in your account.
     * For details on custom fonts, see {@link https://cloudinary.com/documentation/layers#custom_fonts|Using custom fonts for text overlays}.
     * @param {string} fontFamilyName
     */
    fontFamily(fontFamilyName) {
        this._qualifierModel.fontFamily = fontFamilyName;
        return this;
    }
    /**
     * @param {number} fontSize The font size
     */
    fontSize(fontSize) {
        this._qualifierModel.fontSize = fontSize;
        return this;
    }
    /**
     * @param {FontWeightType|string} fontWeight The font weight
     */
    fontWeight(fontWeight) {
        this._qualifierModel.fontWeight = fontWeight;
        return this;
    }
    /**
     *
     * @param {string} fontStyle The font style.
     */
    fontStyle(fontStyle) {
        this._qualifierModel.fontStyle = fontStyle;
        return this;
    }
    /**
     * @param {string} fontHinting The outline hinting style to apply to the text. When this parameter is not specified, the default hint style for the font and target device are applied.
     */
    fontHinting(fontHinting) {
        this._qualifierModel.fontHinting = fontHinting;
        return this;
    }
    /**
     *
     * @param {TextDecorationType|string} textDecoration The font decoration type.
     */
    textDecoration(textDecoration) {
        this._qualifierModel.textDecoration = textDecoration;
        return this;
    }
    /**
     * @param {TextAlignmentType|string} textAlignment The text alignment
     */
    textAlignment(textAlignment) {
        this._qualifierModel.textAlignment = textAlignment;
        return this;
    }
    /**
     * @description Whether to include an outline stroke. Set the color and weight of the stroke
     */
    stroke(textStroke) {
        if (textStroke) {
            const strokeStyle = textStroke.split('_');
            this._qualifierModel.stroke = {
                width: +(strokeStyle[1].replace('px', '')),
                color: strokeStyle[strokeStyle.length - 1]
            };
        }
        else {
            this._qualifierModel.stroke = true;
        }
        return this;
    }
    toString() {
        const { stroke } = this._qualifierModel;
        let strokeStr = '';
        if (stroke) {
            strokeStr = isISolidStrokeModel(stroke) ? `stroke_${textStroke.solid(stroke.width, stroke.color)}` : 'stroke';
        }
        return [
            `${serializeCloudinaryCharacters(this._qualifierModel.fontFamily)}_${this._qualifierModel.fontSize}`,
            this._qualifierModel.fontWeight !== fontWeight.normal() && this._qualifierModel.fontWeight,
            this._qualifierModel.fontStyle !== fontStyle.normal() && this._qualifierModel.fontStyle,
            this._qualifierModel.textDecoration !== textDecoration.normal() && this._qualifierModel.textDecoration,
            this._qualifierModel.textAlignment,
            strokeStr,
            this._qualifierModel.letterSpacing && `letter_spacing_${this._qualifierModel.letterSpacing}`,
            this._qualifierModel.lineSpacing && `line_spacing_${this._qualifierModel.lineSpacing}`,
            this._qualifierModel.fontAntialias && `antialias_${this._qualifierModel.fontAntialias}`,
            this._qualifierModel.fontHinting && `hinting_${this._qualifierModel.fontHinting}`
        ].filter((a) => a).join('_');
    }
}

exports.TextStyle = TextStyle;
exports.serializeCloudinaryCharacters = serializeCloudinaryCharacters;
