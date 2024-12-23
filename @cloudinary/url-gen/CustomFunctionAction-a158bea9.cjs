'use strict';

var base64Encode = require('./base64Encode-08c19f63.cjs');
var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @memberOf Actions.CustomFunction
 * @see Visit {@link Actions.CustomFunction|Custom functions} for an example
 */
class CustomFunctionAction extends Action.Action {
    /**
     *
     * @param {string} fn The custom function to use, can be a URL or a publicID
     */
    constructor(fn) {
        super();
        this.fn = fn;
    }
    encodeCustomFunctionString(fn) {
        const encodedSource = base64Encode.base64Encode(fn);
        return encodedSource;
    }
    /**
     * Use a WASM as a custom function,
     * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
     */
    asWasm() {
        this.mode = 'wasm';
        return this;
    }
    /**
     * Use a remote URL as a custom function
     * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
     */
    asRemote() {
        this.mode = 'remote';
        return this;
    }
    prepareQualifiers() {
        this.encodedFn = this.fn;
        if (this.mode === 'remote') {
            this.encodedFn = this.encodeCustomFunctionString(this.fn);
        }
        return this.addQualifier(new Qualifier.Qualifier('fn', new QualifierValue.QualifierValue([this.pre, this.mode, this.encodedFn])));
    }
    toString() {
        return super.toString()
            .replace(/\//g, ':');
    }
}
var CustomFunctionAction$1 = CustomFunctionAction;

exports.CustomFunctionAction = CustomFunctionAction$1;
