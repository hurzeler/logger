# Logger

A comprehensive logging utility for Node.js and React Native applications with console filtering and file logging capabilities.

## Features

- **Console Logging**: Level-based filtering with environment variable control
- **File Logging**: Separate info and error log files with rotation support (Node.js only)
- **React Native Support**: Optimized logging for React Native applications
- **Flexible Configuration**: Customizable log directories, file names, and clearing options
- **TypeScript Support**: Full type definitions included
- **Platform Detection**: Automatic platform-specific logging behavior

## Installation

```bash
npm install @etek.com.au/logger
```

## Usage

### Console Logging

```typescript
import { error, warn, info, debug, log } from '@etek.com.au/logger';

// Respects CONSOLE_LEVEL environment variable
error('Critical error message');
warn('Warning message');
info('Information message');
debug('Debug message');
log('General log message');
```

### React Native Logging

```typescript
import { error, warn, info, debug, log } from '@etek.com.au/logger/react-native';

// Optimized for React Native - no file system dependencies
error('Critical error message');
warn('Warning message');
info('Information message');
debug('Debug message');
log('General log message');
```

### File Logging

```typescript
import { createFileLogger } from '@etek.com.au/logger';

const logger = createFileLogger({
    logDir: 'logs',
    infoLogFile: 'app.log',
    errorLogFile: 'errors.log',
    clearOnInit: false
});

logger.info('Application started');
logger.error('Connection failed');
logger.warn('Resource usage high');
```

### Environment Variables

```bash
# Control console output level
CONSOLE_LEVEL=error    # Only show errors
CONSOLE_LEVEL=warn     # Show errors and warnings
CONSOLE_LEVEL=info     # Show errors, warnings, and info (default)
CONSOLE_LEVEL=debug    # Show everything
```

## API Reference

### Console Functions

- `error(...args)`: Log error messages
- `warn(...args)`: Log warning messages  
- `info(...args)`: Log info messages
- `debug(...args)`: Log debug messages
- `log(...args)`: General logging (info level)

### FileLogger Class

- `info(message)`: Log to info file
- `error(message)`: Log to error file
- `warn(message)`: Log to info file
- `debug(message)`: Log to info file
- `clearLogs()`: Clear all log files
- `close()`: Close file streams

## License

MIT
