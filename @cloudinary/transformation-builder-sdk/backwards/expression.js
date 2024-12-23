/**
 * Represents a transformation expression.
 * @param {string} expressionStr - An expression in string format.
 * @class Expression
 *
 */
class Expression {
    constructor(expressionStr) {
        /**
         * @protected
         * @inner Expression-expressions
         */
        this.expressions = [];
        if (expressionStr != null) {
            this.expressions.push(Expression.normalize(expressionStr));
        }
    }
    /**
     * Convenience constructor method
     * @function Expression.new
     */
    static new(expressionStr) {
        return new this(expressionStr);
    }
    /**
     * Normalize a string expression
     * @function Cloudinary#normalize
     * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
     * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
     */
    static normalize(expression) {
        var operators, operatorsPattern, operatorsReplaceRE, predefinedVarsPattern, predefinedVarsReplaceRE;
        if (expression == null) {
            return expression;
        }
        expression = String(expression);
        operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*|\\^";
        // operators
        operatorsPattern = "((" + operators + ")(?=[ _]))";
        operatorsReplaceRE = new RegExp(operatorsPattern, "g");
        // @ts-ignore
        expression = expression.replace(operatorsReplaceRE, match => OPERATORS[match]);
        // predefined variables
        predefinedVarsPattern = "(" + Object.keys(PREDEFINED_VARS).join("|") + ")";
        predefinedVarsReplaceRE = new RegExp(predefinedVarsPattern, "g");
        // @ts-ignore
        expression = expression.replace(predefinedVarsReplaceRE, (match, p1, offset) => (expression[offset - 1] === '$' ? match : PREDEFINED_VARS[match]));
        return expression.replace(/[ _]+/g, '_');
    }
    /**
     * Serialize the expression
     * @return {string} the expression as a string
     */
    serialize() {
        return Expression.normalize(this.expressions.join("_"));
    }
    toString() {
        return this.serialize();
    }
    /**
     * Get the parent transformation of this expression
     * @return Transformation
     */
    getParent() {
        return this.parent;
    }
    /**
     * Set the parent transformation of this expression
     * @param {Transformation} the parent transformation
     * @return {Expression} this expression
     */
    setParent(parent) {
        this.parent = parent;
        return this;
    }
    /**
     * Add a expression
     * @function Expression#predicate
     * @internal
     */
    predicate(name, operator, value) {
        // @ts-ignore
        if (OPERATORS[operator] != null) {
            // @ts-ignore
            operator = OPERATORS[operator];
        }
        this.expressions.push(`${name}_${operator}_${value}`);
        return this;
    }
    /**
     * @function Expression#and
     */
    and() {
        this.expressions.push("and");
        return this;
    }
    /**
     * @function Expression#or
     */
    or() {
        this.expressions.push("or");
        return this;
    }
    /**
     * Conclude expression
     * @function Expression#then
     * @return {Transformation} the transformation this expression is defined for
     */
    then() {
        return this.getParent().if(this.toString());
    }
    /**
     * @function Expression#height
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */
    height(operator, value) {
        return this.predicate("h", operator, value);
    }
    /**
     * @function Expression#width
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */
    width(operator, value) {
        return this.predicate("w", operator, value);
    }
    /**
     * @function Expression#aspectRatio
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */
    aspectRatio(operator, value) {
        return this.predicate("ar", operator, value);
    }
    /**
     * @function Expression#pages
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */
    pageCount(operator, value) {
        return this.predicate("pc", operator, value);
    }
    /**
     * @function Expression#faces
     * @param {string} operator the comparison operator (e.g. "<", "lt")
     * @param {string|number} value the right hand side value
     * @return {Expression} this expression
     */
    faceCount(operator, value) {
        return this.predicate("fc", operator, value);
    }
    value(value) {
        this.expressions.push(value);
        return this;
    }
    /**
     */
    static variable(name, value) {
        return new this(name).value(value);
    }
    /**
     * @returns Expression a new expression with the predefined variable "width"
     * @function Expression.width
     */
    static width() {
        return new this("width");
    }
    /**
     * @returns Expression a new expression with the predefined variable "height"
     * @function Expression.height
     */
    static height() {
        return new this("height");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialWidth"
     * @function Expression.initialWidth
     */
    static initialWidth() {
        return new this("initialWidth");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialHeight"
     * @function Expression.initialHeight
     */
    static initialHeight() {
        return new this("initialHeight");
    }
    /**
     * @returns Expression a new expression with the predefined variable "aspectRatio"
     * @function Expression.aspectRatio
     */
    static aspectRatio() {
        return new this("aspectRatio");
    }
    /**
     * @returns Expression a new expression with the predefined variable "initialAspectRatio"
     * @function Expression.initialAspectRatio
     */
    static initialAspectRatio() {
        return new this("initialAspectRatio");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageCount"
     * @function Expression.pageCount
     */
    static pageCount() {
        return new this("pageCount");
    }
    /**
     * @returns Expression new expression with the predefined variable "faceCount"
     * @function Expression.faceCount
     */
    static faceCount() {
        return new this("faceCount");
    }
    /**
     * @returns Expression a new expression with the predefined variable "currentPage"
     * @function Expression.currentPage
     */
    static currentPage() {
        return new this("currentPage");
    }
    /**
     * @returns Expression a new expression with the predefined variable "tags"
     * @function Expression.tags
     */
    static tags() {
        return new this("tags");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageX"
     * @function Expression.pageX
     */
    static pageX() {
        return new this("pageX");
    }
    /**
     * @returns Expression a new expression with the predefined variable "pageY"
     * @function Expression.pageY
     */
    static pageY() {
        return new this("pageY");
    }
}
/**
 * @internal
 */
const OPERATORS = {
    "=": 'eq',
    "!=": 'ne',
    "<": 'lt',
    ">": 'gt',
    "<=": 'lte',
    ">=": 'gte',
    "&&": 'and',
    "||": 'or',
    "*": "mul",
    "/": "div",
    "+": "add",
    "-": "sub",
    "^": "pow",
};
/**
 * @internal
 */
const PREDEFINED_VARS = {
    "aspect_ratio": "ar",
    "aspectRatio": "ar",
    "current_page": "cp",
    "currentPage": "cp",
    "preview:duration": "preview:duration",
    "duration": "du",
    "face_count": "fc",
    "faceCount": "fc",
    "height": "h",
    "initial_aspect_ratio": "iar",
    "initial_duration": "idu",
    "initial_height": "ih",
    "initial_width": "iw",
    "initialAspectRatio": "iar",
    "initialDuration": "idu",
    "initialHeight": "ih",
    "initialWidth": "iw",
    "page_count": "pc",
    "page_x": "px",
    "page_y": "py",
    "pageCount": "pc",
    "pageX": "px",
    "pageY": "py",
    "tags": "tags",
    "width": "w"
};
/**
 * @internal
 */
const BOUNDRY = "[ _]+";
export default Expression;
