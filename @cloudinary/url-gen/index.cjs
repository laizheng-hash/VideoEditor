'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config_URLConfig = require('./config/URLConfig.cjs');
var config_CloudConfig = require('./config/CloudConfig.cjs');
var config_CloudinaryConfig = require('./config/CloudinaryConfig.cjs');
var assets_CloudinaryImage = require('./assets/CloudinaryImage.cjs');
var assets_CloudinaryVideo = require('./assets/CloudinaryVideo.cjs');
var assets_CloudinaryFile = require('./assets/CloudinaryFile.cjs');
var assets_CloudinaryMedia = require('./assets/CloudinaryMedia.cjs');
var instance_Cloudinary = require('./instance/Cloudinary.cjs');
var backwards_createCloudinaryLegacyURL = require('./backwards/createCloudinaryLegacyURL.cjs');
var backwards_generateTransformationString = require('./backwards/generateTransformationString.cjs');
var actions = require('./actions-e4a2d7b0.cjs');
var qualifiers = require('./qualifiers-57ec5edd.cjs');
var Transformation = require('./Transformation-186b91ce.cjs');
var ImageTransformation = require('./ImageTransformation-a0911f0c.cjs');
var VideoTransformation = require('./VideoTransformation-1229b337.cjs');
require('./tslib.es6-66bcd4e3.cjs');
require('./config/BaseConfig.cjs');
require('./internal/internalConstants.cjs');
require('./assets/CloudinaryTransformable.cjs');
require('./DeliveryFormatAction-54638930.cjs');
require('./flag-31bc1b8c.cjs');
require('./FlagQualifier-7b069f22.cjs');
require('./QualifierValue-e770d619.cjs');
require('./Qualifier-6633a22f.cjs');
require('./QualifierModel-0923d819.cjs');
require('./unsupportedError-74070138.cjs');
require('./DeliveryAction-9cae8595.cjs');
require('./Action-0ed405c1.cjs');
require('./FormatQualifier-ffbb8eb3.cjs');
require('./internalConstants-6e675c29.cjs');
require('./progressive-1ce2ceea.cjs');
require('./internal/url/cloudinaryURL.cjs');
require('./internal/url/urlUtils/isUrl.cjs');
require('./internal/url/urlUtils/isFileName.cjs');
require('./internal/url/urlUtils/publicIDContainsVersion.cjs');
require('./sdkAnalytics/getSDKAnalyticsSignature.cjs');
require('./sdkAnalytics/encodeVersion.cjs');
require('./sdkAnalytics/base64Map.cjs');
require('./sdkAnalytics/stringPad.cjs');
require('./sdkAnalytics/reverseVersion.cjs');
require('./sdkAnalytics/padVersion.cjs');
require('./sdkAnalytics/getAnalyticsOptions.cjs');
require('./internal/utils/packageVersion.cjs');
require('./sdkAnalytics/encodeOSVersion.cjs');
require('./internal/utils/cloneDeep.cjs');
require('./backwards/utils/finalizeResourceType.cjs');
require('./backwards/utils/finalize_source.cjs');
require('./backwards/utils/smartEscape.cjs');
require('./backwards/utils/unsigned_url_prefix.cjs');
require('./backwards/consts.cjs');
require('./backwards/transformationProcessing/processLayer.cjs');
require('./backwards/utils/isObject.cjs');
require('./internal/utils/base64Encode.cjs');
require('./backwards/legacyLayer/textlayer.cjs');
require('./backwards/legacyLayer/layer.cjs');
require('./backwards/utils/snakeCase.cjs');
require('./backwards/utils/isEmpty.cjs');
require('./backwards/utils/isNumberLike.cjs');
require('./backwards/transformationProcessing/processIf.cjs');
require('./backwards/utils/legacyNormalizeExpression.cjs');
require('./backwards/utils/toArray.cjs');
require('./backwards/transformationProcessing/processRadius.cjs');
require('./backwards/transformationProcessing/processCustomFunction.cjs');
require('./backwards/transformationProcessing/processCustomPreFunction.cjs');
require('./backwards/utils/splitRange.cjs');
require('./backwards/utils/norm_range_values.cjs');
require('./backwards/transformationProcessing/processVideoParams.cjs');
require('./backwards/transformation.cjs');
require('./backwards/condition.cjs');
require('./backwards/expression.cjs');
require('./backwards/configuration.cjs');
require('./backwards/utils/legacyBaseUtil.cjs');
require('./backwards/legacyLayer/subtitleslayer.cjs');
require('./backwards/legacyLayer/fetchlayer.cjs');
require('./internal/utils/dataStructureUtils.cjs');
require('./backwards/utils/isFunction.cjs');
require('./backwards/transformationProcessing/processDpr.cjs');
require('./resize-496d4085.cjs');
require('./ResizePadAction-ea4e370e.cjs');
require('./ResizeAdvancedAction-d9fa13e5.cjs');
require('./ResizeSimpleAction-0ef78caa.cjs');
require('./toFloatAsString-4766ab85.cjs');
require('./AspectRatioQualifierValue-d520bb1a.cjs');
require('./createGravityModel-e2badc0f.cjs');
require('./gravity-99ed826d.cjs');
require('./GravityQualifier-3be0186a.cjs');
require('./FocusOnValue-b928027a.cjs');
require('./createGravityFromModel-0f5b0a48.cjs');
require('./focusOn-861558da.cjs');
require('./autoFocus-e4d0f8f8.cjs');
require('./CompassQualifier-59a71fa8.cjs');
require('./BlurredBackgroundAction-76a33e5d.cjs');
require('./BackgroundQualifier-ab682c8f.cjs');
require('./BackgroundAutoBorderQualifier-b9f58961.cjs');
require('./BaseCommonBackground-337b931a.cjs');
require('./prepareColor-c03e99eb.cjs');
require('./BackgroundBorderGradientQualifier-749ad1ba.cjs');
require('./BaseGradientBackground-22905746.cjs');
require('./BackgroundPredominantGradientQualifier-16137fe0.cjs');
require('./BackgroundAutoPredominantQualifier-0964e7f7.cjs');
require('./background-c64752f1.cjs');
require('./ResizeScaleAction-905903b0.cjs');
require('./ThumbnailAction-46889ae1.cjs');
require('./ResizeCropAction-2db7ec5b.cjs');
require('./ResizeFillAction-a00aae1d.cjs');
require('./ResizeLimitFitAction-22d3f29a.cjs');
require('./ResizeLimitFillAction-e39e0fde.cjs');
require('./ResizeLimitPadAction-8f85c149.cjs');
require('./ResizeMinimumPadAction-e98089de.cjs');
require('./border-47f488e1.cjs');
require('./RoundCornersAction-13b88d77.cjs');
require('./roundCorners-aeb5a96b.cjs');
require('./effect-c2ef4285.cjs');
require('./Blur-bfbb28a9.cjs');
require('./region-ef039f04.cjs');
require('./NamedRegion-38e9cc4d.cjs');
require('./RectangleRegion-2672a877.cjs');
require('./Accelerate-269acc42.cjs');
require('./Loop-20af27a6.cjs');
require('./LeveledEffectAction-c6a11f05.cjs');
require('./SimpleEffectAction-aadd7e24.cjs');
require('./Cartoonify-10d02441.cjs');
require('./Outline-c98a41df.cjs');
require('./MakeTransparent-468ef2ac.cjs');
require('./Vectorize-83429cdb.cjs');
require('./SimulateColorBlind-2a1253bf.cjs');
require('./EffectActionWithLevel-69a976c7.cjs');
require('./AssistColorBlind-d89f5f85.cjs');
require('./GradientFade-5fbf7b64.cjs');
require('./FadeOut-dfe0f0fc.cjs');
require('./Colorize-012fe385.cjs');
require('./Shadow-35824aa8.cjs');
require('./StyleTransfer-34e93b6e.cjs');
require('./Dither-6aebc058.cjs');
require('./Deshake-acd938db.cjs');
require('./Pixelate-f1f2f0f1.cjs');
require('./EffectActionWithStrength-32a97380.cjs');
require('./Blackwhite-888c6b63.cjs');
require('./FadeIn-db605d72.cjs');
require('./RemoveBackgroundAction-bdeeab1a.cjs');
require('./Theme-84161b18.cjs');
require('./BackgroundRemoval-8758e15c.cjs');
require('./DropShadow-76097e92.cjs');
require('./GenerativeRemove-fb3990b0.cjs');
require('./GenerativeReplace-688ba16f.cjs');
require('./GenerativeRecolor-427c8b81.cjs');
require('./GenerativeBackgroundReplace-204fa1ef.cjs');
require('./Extract-48d0f44c.cjs');
require('./rotate-7af8cf6d.cjs');
require('./RotateAction-3874422b.cjs');
require('./adjust-5c98d9fc.cjs');
require('./FillLightAction-3bd8e98e.cjs');
require('./RecolorAction-a18dbf99.cjs');
require('./OpacityAdjustAction-fcb81f52.cjs');
require('./By3dLutAction-04372615.cjs');
require('./ImproveAction-98870cae.cjs');
require('./ReplaceColorAction-579bd6c2.cjs');
require('./EffectActionWithBlend-bafa37ec.cjs');
require('./ViesusCorrectAdjustAction-6b16a3b5.cjs');
require('./overlay-3e3d4294.cjs');
require('./LayerAction-b50aad58.cjs');
require('./BlendModeQualifier-744337e6.cjs');
require('./createSourceFromModel-e4533c35.cjs');
require('./ImageSource-2890c2e5.cjs');
require('./BaseSource-d2277592.cjs');
require('./FetchSource-b49b90bf.cjs');
require('./base64Encode-08c19f63.cjs');
require('./VideoSource-c3c76a47.cjs');
require('./TextSource-e553076e.cjs');
require('./BaseTextSource-bc602fae.cjs');
require('./textStyle-563429b1.cjs');
require('./fontWeight-26f14240.cjs');
require('./fontStyle-26a61de5.cjs');
require('./textDecoration-97f36d3b.cjs');
require('./textStroke-36d008fd.cjs');
require('./AudioSource-10f49548.cjs');
require('./PositionQualifier-5c8f4ac6.cjs');
require('./TimelinePosition-bc131865.cjs');
require('./underlay-a2f44e0d.cjs');
require('./namedTransformation-f7b34328.cjs');
require('./NamedTransformationAction-f104826b.cjs');
require('./delivery-9b01904f.cjs');
require('./DeliveryQualityAction-975cd776.cjs');
require('./DeliveryColorSpaceFromICCAction-fb5a3a16.cjs');
require('./DeliveryColorSpaceAction-3bb1e736.cjs');
require('./colorSpace-e71e2b55.cjs');
require('./DeliveryDPRAction-983168be.cjs');
require('./customFunction-357510c5.cjs');
require('./CustomFunctionAction-a158bea9.cjs');
require('./RemoteAction-675a9b4a.cjs');
require('./videoEdit-32d259ca.cjs');
require('./TrimAction-78f1e431.cjs');
require('./ConcatenateAction-2c41751d.cjs');
require('./VolumeAction-a58afce5.cjs');
require('./PreviewAction-ccf85140.cjs');
require('./transcode-f4e67665.cjs');
require('./BitRateAction-de4e9190.cjs');
require('./AudioCodecAction-2374c44a.cjs');
require('./AudioFrequencyAction-d58337eb.cjs');
require('./FPSAction-22d445a2.cjs');
require('./FPSRangeAction-cef193a2.cjs');
require('./KeyframeIntervalsAction-5139d389.cjs');
require('./StreamingProfile-1ebb93ee.cjs');
require('./ToAnimatedAction-7f580024.cjs');
require('./VideoCodecAction-9bb5a7fa.cjs');
require('./VideoCodecType-69d56a1b.cjs');
require('./videoCodec-b8fe49c0.cjs');
require('./psdTools-ce8d03dd.cjs');
require('./ClipAction-b3630bc3.cjs');
require('./GetLayerAction-b8af18d5.cjs');
require('./SmartObjectAction-62673654.cjs');
require('./animated-3a06f86a.cjs');
require('./textAlignment-3505e13d.cjs');
require('./streamingProfile-de0a2ef9.cjs');
require('./simulateColorBlind-80c31874.cjs');
require('./rotationMode-d46d664e.cjs');
require('./RotationModeQualifierValue-ea72af07.cjs');
require('./quality-c14c23cc.cjs');
require('./outlineMode-12a29f69.cjs');
require('./improveMode-c9451699.cjs');
require('./gradientDirection-3cd4d01c.cjs');
require('./GradientDirectionQualifierValue-a6c6b20b.cjs');
require('./format-6def9352.cjs');
require('./fontHinting-062586cb.cjs');
require('./expression-c5bcffbe.cjs');
require('./ExpressionQualifier-635a5213.cjs');
require('./dither-9218abb1.cjs');
require('./color-d9845444.cjs');
require('./audioFrequency-25294930.cjs');
require('./audioCodec-1d9842ee.cjs');
require('./aspectRatio-15ba0d01.cjs');
require('./artisticFilter-9642c6c0.cjs');
require('./animatedFormat-9a9719f2.cjs');
require('./AnimatedFormatQualifierValue-48d5a908.cjs');
require('./chromaSubSampling-4bc52bfd.cjs');
require('./dpr-81474448.cjs');
require('./source-b28c4046.cjs');
require('./SubtitlesSource-6a2a4387.cjs');
require('./GradientFade-7c8738b0.cjs');
require('./BackgroundColor-ebfc5c25.cjs');
require('./RawAction-d0d9c15d.cjs');



exports.URLConfig = config_URLConfig;
exports.CloudConfig = config_CloudConfig;
exports.CloudinaryConfig = config_CloudinaryConfig;
exports.CloudinaryImage = assets_CloudinaryImage.CloudinaryImage;
exports.CloudinaryVideo = assets_CloudinaryVideo.CloudinaryVideo;
exports.CloudinaryFile = assets_CloudinaryFile.CloudinaryFile;
exports.CloudinaryMedia = assets_CloudinaryMedia.CloudinaryMedia;
exports.Cloudinary = instance_Cloudinary.Cloudinary;
exports.createCloudinaryLegacyURL = backwards_createCloudinaryLegacyURL.createCloudinaryLegacyURL;
exports.transformationStringFromObject = backwards_generateTransformationString.transformationStringFromObject;
exports.Actions = actions.actions;
exports.Qualifiers = qualifiers.qualifiers;
exports.Transformation = Transformation.Transformation;
exports.ImageTransformation = ImageTransformation.ImageTransformation;
exports.VideoTransformation = VideoTransformation.VideoTransformation;