/**
 * Browser specific entry point for the logger
 * This avoids bundling Node.js specific modules like 'fs'
 */

export * from './console';
export * from './platform';
export * from './reactNativeLogger';

// Note: File logger is intentionally NOT exported here to prevent
// browser bundlers from trying to import Node.js modules
