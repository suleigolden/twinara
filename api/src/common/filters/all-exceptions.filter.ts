import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: number;
    let message: string | string[];
    let error: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'object' && 'message' in response
          ? (response['message'] as string | string[])
          : exception.message;
      error =
        typeof response === 'object' && 'error' in response
          ? (response['error'] as string)
          : 'Error';
    } else if (exception instanceof QueryFailedError) {
      // Handle database errors
      statusCode = HttpStatus.BAD_REQUEST;
      error = 'Validation Error';

      // Handle specific database errors
      const errorCode = exception.driverError?.code;
      
      switch (errorCode) {
        case 'ER_DUP_ENTRY':
          // MySQL duplicate entry
          message = this.handleDuplicateEntry(exception.driverError.sqlMessage);
          break;
        case '23505':
          // PostgreSQL unique constraint violation
          message = this.handlePostgresUniqueViolation(exception.driverError);
          break;
        case 'ER_NO_REFERENCED_ROW':
        case 'ER_NO_REFERENCED_ROW_2':
        case '23503':
          // Foreign key constraint violation
          message = 'Referenced record does not exist';
          break;
        default:
          message = 'Database operation failed';
          console.error('Database Error:', exception);
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = 'Internal server error';

      // Log unexpected errors for debugging
      console.error('Unexpected Error:', exception);
    }

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  private handleDuplicateEntry(sqlMessage: string): string {
    // Extract the duplicate value from the SQL message (MySQL)
    const matches = sqlMessage.match(/Duplicate entry '(.+)' for key/);
    if (matches && matches[1]) {
      const duplicateValue = matches[1];
      return `The value '${duplicateValue}' is already in use`;
    }
    return 'A duplicate entry was detected';
  }

  private handlePostgresUniqueViolation(driverError: any): string {
    // Parse PostgreSQL unique constraint violation
    // Format: "Key (field_name)=(value) already exists."
    const detail = driverError?.detail;
    
    if (detail) {
      // Extract field name and value from detail
      // Example: "Key (email)=(dtest@gmail.com) already exists."
      const match = detail.match(/Key \((.+?)\)=\((.+?)\) already exists/);
      
      if (match) {
        const fieldName = match[1];
        const fieldValue = match[2];
        
        // Format field name for display (e.g., "email" -> "Email")
        const formattedFieldName = fieldName
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Return user-friendly message
        if (fieldName.toLowerCase() === 'email') {
          return `This email address is already registered`;
        }
        
        return `${formattedFieldName} '${fieldValue}' is already in use`;
      }
    }
    
    // Fallback message
    return 'This record already exists';
  }
}
