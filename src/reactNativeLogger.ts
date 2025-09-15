/**
 * React Native compatible logger that provides the same interface as FileLogger
 * but uses console methods instead of file system operations
 */

import { detectPlatform } from './platform';

export interface ReactNativeLoggerOptions {
    enableConsoleLogging?: boolean;
    logLevel?: 'error' | 'warn' | 'info' | 'debug';
}

export class ReactNativeLogger {
    private enableConsoleLogging: boolean;
    private logLevel: string;

    constructor(options: ReactNativeLoggerOptions = {}) {
        this.enableConsoleLogging = options.enableConsoleLogging ?? true;
        this.logLevel = options.logLevel ?? 'info';

        // Verify we're in a React Native environment
        const platform = detectPlatform();
        if (!platform.isReactNative && !platform.isExpo) {
            console.warn('⚠️ ReactNativeLogger is designed for React Native/Expo environments. Consider using FileLogger for Node.js.');
        }
    }

    private shouldLog(level: string): boolean {
        const levels = { error: 0, warn: 1, info: 2, debug: 3 };
        const currentLevel = levels[this.logLevel as keyof typeof levels] ?? 2;
        const messageLevel = levels[level as keyof typeof levels] ?? 2;
        return messageLevel <= currentLevel;
    }

    public info(message: string): void {
        if (this.enableConsoleLogging && this.shouldLog('info')) {
            console.log(`ℹ️ ${message}`);
        }
    }

    public error(message: string): void {
        if (this.enableConsoleLogging && this.shouldLog('error')) {
            console.error(`❌ ${message}`);
        }
    }

    public warn(message: string): void {
        if (this.enableConsoleLogging && this.shouldLog('warn')) {
            console.warn(`⚠️ ${message}`);
        }
    }

    public debug(message: string): void {
        if (this.enableConsoleLogging && this.shouldLog('debug')) {
            console.debug(`🐞 ${message}`);
        }
    }

    public log(message: string): void {
        if (this.enableConsoleLogging && this.shouldLog('info')) {
            console.log(message);
        }
    }

    public clearLogs(): void {
        // In React Native, we can't clear console logs
        // This method exists for API compatibility
        if (this.enableConsoleLogging) {
            console.log('🧹 Console logs cannot be cleared in React Native');
        }
    }

    public close(): void {
        // No cleanup needed for console logging
        // This method exists for API compatibility
    }

    public wasClearedOnInit(): boolean {
        // Always false for React Native logger
        return false;
    }
}

// Convenience function to create a React Native logger
export function createReactNativeLogger(options?: ReactNativeLoggerOptions): ReactNativeLogger {
    return new ReactNativeLogger(options);
}
