// import { DatabaseModule } from './database/database.module';
// import { LoginModule } from './login/login.module';
// import { UsuarioModule } from './usuario/usuario.module';
// import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { BoletoModule } from './boleto/boleto.module';

@Module({
  imports: [
    // DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    // LoginModule,
    // UsuarioModule,
    // AuthModule,
    BoletoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
