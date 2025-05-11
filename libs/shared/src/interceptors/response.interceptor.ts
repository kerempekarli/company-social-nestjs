import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { success } from '../dto/api-response';

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ReturnType<typeof success>> {
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map((data) => success(data)));
    }
}
