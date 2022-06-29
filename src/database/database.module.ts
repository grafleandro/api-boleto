import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: () => ({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT) || 3306,
                username: process.env.DATABASE_USER || "root",
                password: process.env.DATABASE_PASS || "",
                database: process.env.DATABASE_NAME || "step1",
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
                migrations: [
                  "src/migrations/**/*.ts"
                ]
            })
        })
    ]
})

export class DatabaseModule { }
