'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Action = require('../Action-0ed405c1.cjs');
var expression = require('../expression-c5bcffbe.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');
require('../internalConstants-6e675c29.cjs');
require('../ExpressionQualifier-635a5213.cjs');

/**
 * Sets up a conditional transformation.
 * @memberOf Actions
 * @namespace Conditional
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.conditional(
 *  Conditional.ifCondition('ar >= 1.0', new Transformation().addAction('w_100'))
 * );
 * image.toString()
 * // Transformation will contain `if_ar_gte_1.0/w_100/if_end`
 */
/**
 * @memberOf Actions.Conditional
 * @see Actions.Conditional
 * @example
 * // To be used through a builder and not to be created as an instance!
 * import {Cloudinary} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.conditional(
 *  Conditional.ifCondition('ar >= 1.0', new Transformation().addAction('w_100'))
 * );
 * image.toString()
 * // Transformation will contain `if_ar_gte_1.0/w_100/if_end`
 */
class ConditionalAction extends Action.Action {
    /**
     * @description Specifies a condition to be met before applying a transformation.
     * @param {string} exp The condition to meet in order to apply the transformation.
     * @param {SDK.Transformation} ifTx The transformation to conditionally apply
     */
    constructor(exp, ifTx) {
        super();
        this._actionModel = { actionType: "ifCondition" };
        this.exp = exp;
        this.ifTx = ifTx;
        this._actionModel.expression = exp;
        this._actionModel.transformation = ifTx;
    }
    /**
     * @description An alternate transformation in case the initial condition is false
     * Alias to `else` in many programming languages
     * @param {SDK.Transformation} elseTx
     */
    otherwise(elseTx) {
        this.elseTx = elseTx;
        this._actionModel.otherwise = elseTx;
        return this;
    }
    toString() {
        return [
            `if_${expression.expression(this.exp)}`,
            `${this.ifTx}`,
            this.elseTx && `if_else/${this.elseTx}`,
            `if_end`
        ].filter((a) => a).join('/');
    }
    static fromJson(actionModel) {
        const { expression, transformation, otherwise } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(expression, transformation);
        otherwise && result.otherwise(otherwise);
        return result;
    }
}
/**
 * @summary action
 * @memberOf Actions.Conditional
 * @description Sets up a conditional transformation with expression.
 * Learn more: {@link https://cloudinary.com/documentation/conditional_transformations|Conditional transformations}
 *
 * @param {string} expression The condition to meet in order to apply the transformation.
 * @param {SDK.Transformation} tx The transformation to conditionally apply
 * @return {Actions.Conditional.ConditionalAction}
 */
function ifCondition(expression, tx) {
    return new ConditionalAction(expression, tx);
}
const Conditional = { ifCondition, ConditionalAction };

exports.Conditional = Conditional;
exports.ConditionalAction = ConditionalAction;
exports.ifCondition = ifCondition;
