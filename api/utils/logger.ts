import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class Logger extends ConsoleLogger {
  log(message: string, context?: string) {
    // Add your custom logic here (e.g., send logs to an external service)
    super.log(message, context);
  }

  error(message: string, trace: string, context?: string) {
    // Add your custom logic here (e.g., send error logs to an external service)
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    // Add your custom logic here (e.g., send warning logs to an external service)
    super.warn(message, context);
  }
}

export const logger = new Logger();