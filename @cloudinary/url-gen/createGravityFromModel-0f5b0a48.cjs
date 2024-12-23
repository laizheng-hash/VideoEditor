'use strict';

var gravity = require('./gravity-99ed826d.cjs');
var focusOn = require('./focusOn-861558da.cjs');
var autoFocus = require('./autoFocus-e4d0f8f8.cjs');
var CompassQualifier = require('./CompassQualifier-59a71fa8.cjs');
var FocusOnValue = require('./FocusOnValue-b928027a.cjs');

/**
 * Validates that gravityModel is an ICompassGravityModel
 * @param gravityModel
 */
function isCompassGravityModel(gravityModel) {
    return gravityModel.gravityType === 'direction';
}
/**
 * Validates that gravityModel is an IOcrGravityModel
 * @param gravityModel
 */
function isOcrGravityModel(gravityModel) {
    return gravityModel.gravityType === 'ocr';
}
/**
 * Validates that gravityModel is an IAutoGravityModel
 * @param gravityModel
 */
function isAutoGravityModel(gravityModel) {
    return gravityModel.gravityType === 'auto';
}
/**
 * Create AutoFocus from IAutoGravityObjectModel
 * @param autoGravityObjectModel
 */
function createAutoFocusFromModel(autoGravityObjectModel) {
    const { object, weight, avoid } = autoGravityObjectModel;
    const autoFocus$1 = new autoFocus.AutoFocus(new FocusOnValue.FocusOnValue(object));
    (weight || weight === 0) && autoFocus$1.weight(weight);
    avoid && autoFocus$1.avoid();
    return autoFocus$1;
}
/**
 * Create AutoGravity from IAutoGravityModel
 * @param gravityModel
 */
function createAutoGravityFromModel(gravityModel) {
    const autoFocusModel = gravityModel.autoFocus || [];
    const autoFocus = autoFocusModel.map(createAutoFocusFromModel);
    return gravity.autoGravity().autoFocus(...autoFocus);
}
/**
 * Create FocusOnGravity from given IFocusOnGravityModel
 * @param gravityModel
 */
function createFocusOnGravityFromModel(gravityModel) {
    const focusOnObjects = (gravityModel.focusOnObjects || []).map((str) => new FocusOnValue.FocusOnValue(str));
    const result = gravity.focusOn(...focusOnObjects);
    if (gravityModel.fallbackGravity) {
        const autoGravity = createAutoGravityFromModel(gravityModel.fallbackGravity);
        result.fallbackGravity(autoGravity);
    }
    return result;
}
/**
 * Create gravity instance from given gravity model
 * @param gravityModel
 */
function createGravityFromModel(gravityModel) {
    if (isCompassGravityModel(gravityModel)) {
        return new gravity.CompassGravity(new CompassQualifier.CompassQualifier(gravityModel.compass));
    }
    if (isOcrGravityModel(gravityModel)) {
        return gravity.focusOn(focusOn.ocr());
    }
    if (isAutoGravityModel(gravityModel)) {
        return createAutoGravityFromModel(gravityModel);
    }
    return createFocusOnGravityFromModel(gravityModel);
}

exports.createGravityFromModel = createGravityFromModel;
