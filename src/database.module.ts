import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(process.env.DB_HOST),
        port: configService.get(process.env.DB_PORT),
        username: configService.get(process.env.DB_USERNAME),
        password: configService.get(process.env.DB_PASSWORD),
        database: configService.get(process.env.DB_DATABASE),
        entities: ['dist/**/*.entity.ts'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule { }