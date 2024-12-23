const packageVersion = '1.16.1';
/**
 * Export package version (injected during our build).
 * Reason for this is that If we import values from from package.json,
 * it will cause an error for users who do not have an 'import from json' plugin
 * as part of their build process / bundler.
 */
export { packageVersion };
