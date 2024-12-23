import { VideoSource } from "./source/sourceTypes/VideoSource.js";
import { ImageSource } from "./source/sourceTypes/ImageSource.js";
import { TextStyle } from "./textStyle.js";
import { SubtitlesSource } from "./source/sourceTypes/SubtitlesSource.js";
import { FetchSource } from "./source/sourceTypes/FetchSource.js";
import { TextSource } from "./source/sourceTypes/TextSource.js";
import { AudioSource } from "./source/sourceTypes/AudioSource.js";
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
declare function image(publicID: string): ImageSource;
/**
 * @summary qualifier
 * @description Returns an instance of a TextSource
 * @memberOf Qualifiers.Source
 * @param {string} text The text to display.
 * @param {TextStyle | string} textStyle The textStyle to use with the text in the layer
 * @return {Qualifiers.Source.TextSource}
 */
declare function text(text: string, textStyle: TextStyle | string): TextSource;
/**
 * @summary qualifier
 * @description Returns an instance of a VideoSource
 * @memberOf Qualifiers.Source
 * @param {string} publicID The publicID of the video to be used as a layer
 * @return {Qualifiers.Source.VideoSource}
 */
declare function video(publicID: string): VideoSource;
/**
 * @summary qualifier
 * @description Returns an instance of a AudioSource
 * @memberOf Qualifiers.Source
 * @param {string} publicID The publicID of the audio to be used as a layer
 * @return {Qualifiers.Source.AudioSource}
 */
declare function audio(publicID: string): AudioSource;
/**
 * @summary qualifier
 * @description Returns an instance of an VideoSource
 * @memberOf Qualifiers.Source
 * @param {string} fileName The publicID of the video to be used as a layer
 * @return {Qualifiers.Source.VideoSource}
 */
declare function subtitles(fileName: string): SubtitlesSource;
/**
 * @summary qualifier
 * @description Returns an instance of a FetchSource
 * @memberOf Qualifiers.Source
 * @param {string} remoteURL The URL of the remote asset to fetch as a layer
 * @return {Qualifiers.Source.FetchSource}
 */
declare function fetch(remoteURL: string): FetchSource;
declare const Source: {
    image: typeof image;
    text: typeof text;
    video: typeof video;
    subtitles: typeof subtitles;
    fetch: typeof fetch;
    audio: typeof audio;
};
export { Source, image, text, video, subtitles, fetch, audio };
