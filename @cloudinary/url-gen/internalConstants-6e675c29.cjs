'use strict';

/**
 * Flip keys and values for given object
 * @param obj
 */
function objectFlip(obj) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        result[obj[key]] = key;
    });
    return result;
}

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
const CONDITIONAL_OPERATORS = {
    "=": "eq",
    "!=": "ne",
    "<": "lt",
    ">": "gt",
    "<=": "lte",
    ">=": "gte",
    "&&": "and",
    "||": "or",
    "*": "mul",
    "/": "div",
    "+": "add",
    "-": "sub",
    "^": "pow"
};
const RESERVED_NAMES = {
    "aspect_ratio": "ar",
    "aspectRatio": "ar",
    "current_page": "cp",
    "currentPage": "cp",
    "duration": "du",
    "face_count": "fc",
    "faceCount": "fc",
    "height": "h",
    "initial_aspect_ratio": "iar",
    "initial_height": "ih",
    "initial_width": "iw",
    "initialAspectRatio": "iar",
    "initialHeight": "ih",
    "initialWidth": "iw",
    "initial_duration": "idu",
    "initialDuration": "idu",
    "page_count": "pc",
    "page_x": "px",
    "page_y": "py",
    "pageCount": "pc",
    "pageX": "px",
    "pageY": "py",
    "tags": "tags",
    "width": "w",
    "trimmed_aspect_ratio": "tar",
    "current_public_id": "cpi",
    "initial_density": "idn",
    "page_names": "pgnames"
};
const ACTION_TYPE_TO_CROP_MODE_MAP = {
    limitFit: 'limit',
    limitFill: 'lfill',
    minimumFit: 'mfit',
    thumbnail: 'thumb',
    limitPad: 'lpad',
    minimumPad: 'mpad',
    autoPad: 'auto_pad'
};
const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
    colorSpace: 'cs',
    dpr: 'dpr',
    density: 'dn',
    defaultImage: 'd',
    format: 'f',
    quality: 'q'
};
const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
    redEye: 'redeye',
    advancedRedEye: 'adv_redeye',
    oilPaint: 'oil_paint',
    unsharpMask: 'unsharp_mask',
    makeTransparent: 'make_transparent',
    generativeRestore: 'gen_restore',
    upscale: 'upscale'
};
const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
    autoBest: 'auto:best',
    autoEco: 'auto:eco',
    autoGood: 'auto:good',
    autoLow: 'auto:low',
    jpegminiHigh: 'jpegmini:1',
    jpegminiMedium: 'jpegmini:2',
    jpegminiBest: 'jpegmini:0'
};
const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
    fullHd: 'full_hd',
    fullHdWifi: 'full_hd_wifi',
    fullHdLean: 'full_hd_lean',
    hdLean: 'hd_lean'
};
const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
    444: "CHROMA_444",
    420: "CHROMA_420"
};
const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
    'noCmyk': 'no_cmyk',
    'keepCmyk': 'keep_cmyk',
    'tinySrgb': 'tinysrgb',
    'srgbTrueColor': 'srgb:truecolor'
};
const ACTION_TYPE_TO_BLEND_MODE_MAP = {
    'antiRemoval': 'anti_removal'
};
const CHROMA_MODEL_ENUM_TO_CHROMA_VALUE = objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
const COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP = objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
const CROP_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
const EFFECT_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
const STREAMING_PROFILE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

exports.ACTION_TYPE_TO_BLEND_MODE_MAP = ACTION_TYPE_TO_BLEND_MODE_MAP;
exports.ACTION_TYPE_TO_CROP_MODE_MAP = ACTION_TYPE_TO_CROP_MODE_MAP;
exports.ACTION_TYPE_TO_EFFECT_MODE_MAP = ACTION_TYPE_TO_EFFECT_MODE_MAP;
exports.ACTION_TYPE_TO_QUALITY_MODE_MAP = ACTION_TYPE_TO_QUALITY_MODE_MAP;
exports.ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP;
exports.CHROMA_MODEL_ENUM_TO_CHROMA_VALUE = CHROMA_MODEL_ENUM_TO_CHROMA_VALUE;
exports.CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = CHROMA_VALUE_TO_CHROMA_MODEL_ENUM;
exports.COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP;
exports.COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP = COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP;
exports.CONDITIONAL_OPERATORS = CONDITIONAL_OPERATORS;
exports.CROP_MODE_TO_ACTION_TYPE_MAP = CROP_MODE_TO_ACTION_TYPE_MAP;
exports.DELIVERY_MODE_TO_ACTION_TYPE_MAP = DELIVERY_MODE_TO_ACTION_TYPE_MAP;
exports.EFFECT_MODE_TO_ACTION_TYPE_MAP = EFFECT_MODE_TO_ACTION_TYPE_MAP;
exports.RESERVED_NAMES = RESERVED_NAMES;
exports.STREAMING_PROFILE_TO_ACTION_TYPE_MAP = STREAMING_PROFILE_TO_ACTION_TYPE_MAP;
