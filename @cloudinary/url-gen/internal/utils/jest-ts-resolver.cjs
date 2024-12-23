/**
 * Jest can’t find files with a .js extension. We use this resolver to catch that error and replace the files with a
 * .ts extension.
 */
module.exports = (request, options) => {
    // Jest's default resolver
    const { defaultResolver } = options;
    try {
        return defaultResolver(request, options);
        // if default resolver fails we replace file extension from .js to .ts
    }
    catch (e) {
        return defaultResolver(request.replace(/\.js$/, '.ts'), options);
    }
};
export {};
