import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Module } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Usuario ])
    ],
    controllers: [
        UsuarioController,],
    providers: [
        UsuarioService,
    ]
})
export class UsuarioModule { }
