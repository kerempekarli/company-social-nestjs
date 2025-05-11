import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger  {
    log(msg: string) {
        super.log('🟢 ' + msg);
    }

    warn(msg: string) {
        super.warn('🟠 ' + msg);
    }

    error(msg: string, trace?: string) {
        super.error('🔴 ' + msg, trace);
    }

    debug(msg: string) {
        super.debug('🔵 ' + msg);
    }
}
