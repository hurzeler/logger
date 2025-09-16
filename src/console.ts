/**
 * Console utility with level-based filtering
 * Respects CONSOLE_LEVEL environment variable
 */

// Console levels in order of importance
const CONSOLE_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

// Global log level override (for React Native)
let globalLogLevel: number | null = null;

// Set log level programmatically
export const setLogLevel = (level: keyof typeof CONSOLE_LEVELS): void => {
    globalLogLevel = CONSOLE_LEVELS[level];
    //console.log('🔧 Logger: Log level set to', level, '(value:', globalLogLevel, ')');
};

// Get current console level from environment or global override
const getCurrentLevel = (): number => {
    // Check global override first
    if (globalLogLevel !== null) {
        return globalLogLevel;
    }
    
    try {
        const level = process.env?.CONSOLE_LEVEL?.toLowerCase();
        const currentLevel = CONSOLE_LEVELS[level as keyof typeof CONSOLE_LEVELS] ?? CONSOLE_LEVELS.info;
        return currentLevel;
    } catch (e) {
        // Fallback for React Native where process.env might not be available
        return CONSOLE_LEVELS.info;
    }
};

// Check if a level should be displayed
const shouldDisplay = (level: keyof typeof CONSOLE_LEVELS): boolean => {
    return CONSOLE_LEVELS[level] <= getCurrentLevel();
};

// Create filtered console methods
export const consoleFilter = {
    error: (...args: any[]): void => {
        if (shouldDisplay('error')) {
            console.error('❌ ', ...args);
        }
    },
    
    warn: (...args: any[]): void => {
        if (shouldDisplay('warn')) {
            console.warn('⚠️ ', ...args);
        }
    },
    
    info: (...args: any[]): void => {
        if (shouldDisplay('info')) {
            console.log('ℹ️ ', ...args);
        }
    },
    
    debug: (...args: any[]): void => {
        if (shouldDisplay('debug')) {
            console.debug('🐞 ', ...args);
        }
    },
    
    log: (...args: any[]): void => {
        if (shouldDisplay('info')) {
            console.log(...args);
        }
    }
};

// Export individual methods for convenience
export const { error, warn, info, debug, log } = consoleFilter;
