/**
 * React Native specific entry point for the logger
 * This avoids bundling Node.js specific modules like 'fs'
 */

export * from './console';
export * from './platform';
export * from './reactNativeLogger';

// Export setLogLevel for programmatic control
export { setLogLevel } from './console';

// Note: File logger is intentionally NOT exported here to prevent
// React Native bundler from trying to import Node.js modules
