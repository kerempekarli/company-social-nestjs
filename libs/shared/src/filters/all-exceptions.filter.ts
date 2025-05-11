import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { failure } from '../dto/api-response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? (exception.getResponse() as any).message || exception.message
            : 'Internal server error';

        const error = exception instanceof HttpException
            ? (exception.getResponse() as any).error || 'HttpException'
            : 'InternalException';

        response.status(status).json({
            ...failure(message, error),
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
