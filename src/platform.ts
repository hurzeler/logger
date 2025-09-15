/**
 * Platform detection utility for the logger
 */

export interface PlatformInfo {
    isNodeJS: boolean;
    isReactNative: boolean;
    isBrowser: boolean;
    isExpo: boolean;
}

/**
 * Detect the current platform/runtime environment
 */
export function detectPlatform(): PlatformInfo {
    // Check for React Native
    const isReactNative = typeof global !== 'undefined' &&
        (global as any).navigator &&
        (global as any).navigator.product === 'ReactNative';

    // Check for Expo
    const isExpo = typeof global !== 'undefined' &&
        (global as any).expo &&
        (global as any).expo.Constants;

    // Check for Node.js
    const isNodeJS = Boolean(typeof process !== 'undefined' &&
        process.versions &&
        process.versions.node &&
        typeof window === 'undefined' &&
        !isReactNative);

    // Check for browser
    const isBrowser = typeof window !== 'undefined' &&
        typeof document !== 'undefined' &&
        !isReactNative &&
        !isExpo;

    return {
        isNodeJS,
        isReactNative,
        isBrowser,
        isExpo
    };
}

/**
 * Check if file logging is available in the current environment
 */
export function isFileLoggingAvailable(): boolean {
    const platform = detectPlatform();
    return platform.isNodeJS;
}

/**
 * Get the current platform name for logging purposes
 */
export function getPlatformName(): string {
    const platform = detectPlatform();

    if (platform.isReactNative) return 'React Native';
    if (platform.isExpo) return 'Expo';
    if (platform.isNodeJS) return 'Node.js';
    if (platform.isBrowser) return 'Browser';

    return 'Unknown';
}
