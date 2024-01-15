import { Logger } from "@/business/ports/logger.port";

export class LoggerRepository implements Logger{
    debug(message: string): void {
        console.debug(message);
    }

    info(message: string): void {
        console.info(message);
    }

    warn(message: string): void {
        console.warn(message);
    }

    error(message: string): void {
        console.error(message);
    }
}