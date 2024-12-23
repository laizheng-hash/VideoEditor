'use strict';

var BaseTextSource = require('./BaseTextSource-bc602fae.cjs');
var textStyle = require('./textStyle-563429b1.cjs');
var textStroke = require('./textStroke-36d008fd.cjs');

/**
 * Create TextStyle from ITextStyleModel
 * @param textStyleModel
 */
function createTextStyleFromModel(textStyleModel) {
    const { fontFamily, fontSize, fontWeight, fontStyle, fontAntialias, fontHinting, textDecoration, textAlignment, stroke, letterSpacing, lineSpacing, } = textStyleModel;
    const result = new textStyle.TextStyle(fontFamily, fontSize);
    if (fontWeight) {
        result.fontWeight(fontWeight);
    }
    if (fontStyle) {
        result.fontStyle(fontStyle);
    }
    if (fontAntialias) {
        result.fontAntialias(fontAntialias);
    }
    if (fontHinting) {
        result.fontHinting(fontHinting);
    }
    if (textDecoration) {
        result.textDecoration(textDecoration);
    }
    if (textAlignment) {
        result.textAlignment(textAlignment);
    }
    if (stroke) {
        result.stroke();
        if (typeof stroke !== "boolean") {
            result.stroke(textStroke.solid(stroke.width, stroke.color));
        }
    }
    if (letterSpacing) {
        result.letterSpacing(letterSpacing);
    }
    if (lineSpacing) {
        result.lineSpacing(lineSpacing);
    }
    return result;
}

/**
 * @memberOf Qualifiers.Source
 * @extends {Qualifiers.Source.BaseTextSource}
 * @description Defines how to manipulate a text layer
 */
class TextSource extends BaseTextSource.BaseTextSource {
    constructor(fileName, textStyle) {
        /* istanbul ignore next */
        super(fileName, textStyle);
    }
    static fromJson(qualifierModel, transformationFromJson) {
        const { text, textStyle, textColor, backgroundColor, transformation } = qualifierModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(text, textStyle ? createTextStyleFromModel(textStyle) : undefined);
        if (transformation) {
            result.transformation(transformationFromJson(transformation));
        }
        if (textColor) {
            result.textColor(textColor);
        }
        if (backgroundColor) {
            result.backgroundColor(backgroundColor);
        }
        return result;
    }
}

exports.TextSource = TextSource;
