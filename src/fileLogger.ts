/**
 * File logging utility with separate error and info log files
 * 
 * NOTE: This module is Node.js only and will not work in React Native or browser environments.
 * Use the console logger for cross-platform logging.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface FileLoggerOptions {
    logDir: string;
    infoLogFile?: string;
    errorLogFile?: string;
    maxFileSize?: number; // in bytes
    maxFiles?: number;
    clearOnInit?: boolean; // Clear log files on initialization
}

export class FileLogger {
    private logDir: string;
    private infoLogFile: string;
    private errorLogFile: string;
    private maxFileSize: number;
    private maxFiles: number;
    private clearOnInit: boolean;
    private infoStream: fs.WriteStream | null = null;
    private errorStream: fs.WriteStream | null = null;

    constructor(options: FileLoggerOptions) {
        // Runtime check to ensure we're in a Node.js environment
        if (typeof process === 'undefined' || !process.versions || !process.versions.node) {
            throw new Error('FileLogger is only available in Node.js environments. Use console logging for React Native and browser environments.');
        }

        this.logDir = options.logDir;
        this.infoLogFile = options.infoLogFile || 'info.log';
        this.errorLogFile = options.errorLogFile || 'error.log';
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB default
        this.maxFiles = options.maxFiles || 5; // Keep 5 files by default
        this.clearOnInit = options.clearOnInit || false;

        this.initializeLogging();
    }

    private initializeLogging(): void {
        try {
            // Ensure log directory exists
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }

            // Create info log stream
            const infoLogPath = path.join(this.logDir, this.infoLogFile);
            this.infoStream = fs.createWriteStream(infoLogPath, { 
                flags: this.clearOnInit ? 'w' : 'a', // 'w' to clear, 'a' to append
                encoding: 'utf8'
            });

            // Create error log stream
            const errorLogPath = path.join(this.logDir, this.errorLogFile);
            this.errorStream = fs.createWriteStream(errorLogPath, { 
                flags: this.clearOnInit ? 'w' : 'a', // 'w' to clear, 'a' to append
                encoding: 'utf8'
            });

            this.info('=== File Logger Started ===');
            this.error('=== File Logger Error Log Started ===');
        } catch (error) {
            console.error('❌ Failed to initialize file logging:', error);
        }
    }

    private getTimestamp(): string {
        return new Date().toISOString();
    }

    private writeToStream(stream: fs.WriteStream | null, message: string): void {
        if (stream && !stream.destroyed) {
            const timestamp = this.getTimestamp();
            const logEntry = `${timestamp} - ${message}\n`;
            stream.write(logEntry);
        }
    }

    public info(message: string): void {
        this.writeToStream(this.infoStream, message);
    }

    public error(message: string): void {
        this.writeToStream(this.errorStream, `❌ ${message}`);
    }

    public warn(message: string): void {
        this.writeToStream(this.infoStream, `⚠️ ${message}`);
    }

    public debug(message: string): void {
        this.writeToStream(this.infoStream, `🐞 ${message}`);
    }

    public log(message: string): void {
        this.writeToStream(this.infoStream, message);
    }

    public clearLogs(): void {
        try {
            // Close existing streams
            this.close();
            
            // Clear info log file
            const infoLogPath = path.join(this.logDir, this.infoLogFile);
            if (fs.existsSync(infoLogPath)) {
                fs.writeFileSync(infoLogPath, '');
            }
            
            // Clear error log file
            const errorLogPath = path.join(this.logDir, this.errorLogFile);
            if (fs.existsSync(errorLogPath)) {
                fs.writeFileSync(errorLogPath, '');
            }
            
            // Reinitialize streams
            this.initializeLogging();
        } catch (error) {
            console.error('❌ Failed to clear log files:', error);
        }
    }

    public wasClearedOnInit(): boolean {
        return this.clearOnInit;
    }

    public close(): void {
        if (this.infoStream) {
            this.infoStream.end();
            this.infoStream = null;
        }
        if (this.errorStream) {
            this.errorStream.end();
            this.errorStream = null;
        }
    }
}

// Convenience function to create a file logger
export function createFileLogger(options: FileLoggerOptions): FileLogger {
    return new FileLogger(options);
}
