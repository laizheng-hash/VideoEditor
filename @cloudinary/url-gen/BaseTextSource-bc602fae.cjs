'use strict';

var BaseSource = require('./BaseSource-d2277592.cjs');
var textStyle = require('./textStyle-563429b1.cjs');
var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');

/**
 * @memberOf Qualifiers.Source
 * @extends {Qualifiers.Source.BaseSource}
 * @description Defines the common interface for all text-based sources
 */
class BaseTextSource extends BaseSource.BaseSource {
    constructor(text, textStyle$1) {
        super();
        this.type = 'text';
        this.text = text;
        this._textStyle = textStyle$1;
        this._qualifierModel.sourceType = 'text';
        this._qualifierModel.text = text;
        if (textStyle$1 instanceof textStyle.TextStyle) {
            this._qualifierModel.textStyle = textStyle$1.toJson();
        }
    }
    encodeText(text) {
        return textStyle.serializeCloudinaryCharacters(text);
    }
    textColor(color) {
        this._textColor = color;
        this._qualifierModel.textColor = color;
        return this;
    }
    backgroundColor(bgColor) {
        this._backgroundColor = bgColor;
        this._qualifierModel.backgroundColor = bgColor;
        return this;
    }
    textFit(textFit) {
        this._textFit = textFit;
        return this;
    }
    /**
     * @description
     * Returns the opening string of the layer,
     * This method is used internally within {@link SDK.LayerAction|LayerAction}
     * @returns {string}
     */
    getOpenSourceString(layerType) {
        const layerParam = [
            this.type,
            this._textStyle && this._textStyle.toString(),
            this.encodeText(this.text)
        ].filter((a) => a).join(':');
        const tmpAction = new Action.Action();
        tmpAction.addQualifier(new Qualifier.Qualifier(layerType, layerParam));
        this._textColor && tmpAction.addQualifier(new Qualifier.Qualifier('co', prepareColor.prepareColor(this._textColor)));
        this._backgroundColor && tmpAction.addQualifier(new Qualifier.Qualifier('b', prepareColor.prepareColor(this._backgroundColor)));
        this._textFit && tmpAction.addQualifier(this._textFit);
        return tmpAction.toString();
    }
}

exports.BaseTextSource = BaseTextSource;
