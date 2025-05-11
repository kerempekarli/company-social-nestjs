import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '@shared/config/configuration';
import { validationSchema } from '@shared/config/validation';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module'; // örnek modül

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => ({ req }),
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true, // 🛑 production'da false olacak
      }),
    }),

    AuthModule, // diğer modüller buraya eklenecek
  ],
})
export class GatewayModule { }
