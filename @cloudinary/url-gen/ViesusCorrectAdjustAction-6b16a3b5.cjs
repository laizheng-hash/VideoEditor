'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * Enhances an image to its best visual quality with the Viesus Automatic Image Enhancement add-on.</br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/viesus_automatic_image_enhancement_addon|Viesus Automatic Image Enhancement.}
 * @memberOf Actions.Adjust
 */
class ViesusCorrectAdjustAction extends Action.Action {
    /**
     * @description Enhances the image without correcting for red eye.
     */
    noRedEye() {
        this._noRedEye = true;
        return this;
    }
    /**
     * @description Applies saturation to the skin tones in the image.
     * @param level The saturation level. (Range: -100 to 100, Server default: 50).
     */
    skinSaturation(level) {
        this._skinSaturation = true;
        if (level) {
            this._skinSaturationLevel = level;
        }
        return this;
    }
    prepareQualifiers() {
        let value = 'viesus_correct';
        if (this._noRedEye) {
            value += ':no_redeye';
        }
        if (this._skinSaturation) {
            value += ':skin_saturation';
            if (typeof this._skinSaturationLevel !== 'undefined') {
                value += `_${this._skinSaturationLevel}`;
            }
        }
        this.addQualifier(new Qualifier.Qualifier('e', value));
    }
}

exports.ViesusCorrectAdjustAction = ViesusCorrectAdjustAction;
