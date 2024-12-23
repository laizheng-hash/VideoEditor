'use strict';

var VideoSource = require('./VideoSource-c3c76a47.cjs');
var ImageSource = require('./ImageSource-2890c2e5.cjs');
var SubtitlesSource = require('./SubtitlesSource-6a2a4387.cjs');
var FetchSource = require('./FetchSource-b49b90bf.cjs');
var TextSource = require('./TextSource-e553076e.cjs');
var AudioSource = require('./AudioSource-10f49548.cjs');

/**
 * @description This namespace contains different sources that can be used in overlays and underlays
 * @memberOf Qualifiers
 * @namespace Source
 * @see {@link Actions.Overlay| The overlay action}
 * @see {@link Actions.Underlay| The underlay action}
 */
/**
 * @summary qualifier
 * @description Returns an instance of an ImageSource
 * @memberOf Qualifiers.Source
 * @param {string} publicID The publicID of the image to be used as a layer
 * @return {Qualifiers.Source.ImageSource}
 */
function image(publicID) {
    return new ImageSource.ImageSource(publicID);
}
/**
 * @summary qualifier
 * @description Returns an instance of a TextSource
 * @memberOf Qualifiers.Source
 * @param {string} text The text to display.
 * @param {TextStyle | string} textStyle The textStyle to use with the text in the layer
 * @return {Qualifiers.Source.TextSource}
 */
function text(text, textStyle) {
    return new TextSource.TextSource(text, textStyle);
}
/**
 * @summary qualifier
 * @description Returns an instance of a VideoSource
 * @memberOf Qualifiers.Source
 * @param {string} publicID The publicID of the video to be used as a layer
 * @return {Qualifiers.Source.VideoSource}
 */
function video(publicID) {
    return new VideoSource.VideoSource(publicID);
}
/**
 * @summary qualifier
 * @description Returns an instance of a AudioSource
 * @memberOf Qualifiers.Source
 * @param {string} publicID The publicID of the audio to be used as a layer
 * @return {Qualifiers.Source.AudioSource}
 */
function audio(publicID) {
    return new AudioSource.AudioSource(publicID);
}
/**
 * @summary qualifier
 * @description Returns an instance of an VideoSource
 * @memberOf Qualifiers.Source
 * @param {string} fileName The publicID of the video to be used as a layer
 * @return {Qualifiers.Source.VideoSource}
 */
function subtitles(fileName) {
    return new SubtitlesSource.SubtitlesSource(fileName);
}
/**
 * @summary qualifier
 * @description Returns an instance of a FetchSource
 * @memberOf Qualifiers.Source
 * @param {string} remoteURL The URL of the remote asset to fetch as a layer
 * @return {Qualifiers.Source.FetchSource}
 */
function fetch(remoteURL) {
    return new FetchSource.FetchSource(remoteURL);
}
const Source = { image, text, video, subtitles, fetch, audio };

exports.Source = Source;
exports.audio = audio;
exports.fetch = fetch;
exports.image = image;
exports.subtitles = subtitles;
exports.text = text;
exports.video = video;
