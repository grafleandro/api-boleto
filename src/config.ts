export const config = () => ({
    port: Number(process.env.PORT),
    jwtToken: process.env.JWT_TOKEN,
    database: {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: 3306,
        username: 'root',
        password: 'lms663',
        database: process.env.DATABASE_NAME,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        migrations: [
            "src/migrations/**/*.ts"
        ],
    }
})