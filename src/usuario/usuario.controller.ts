import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UsuarioPostDto } from 'src/dto/usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('usuario')
@ApiTags('Usuário')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: "Exibir todos os registros." })
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: "Exibir apenas um registro." })
    async findOne(@Param() params): Promise<Usuario> {
        return await this.usuarioService.findOne(params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: "Adicionar um novo registro." })
    async create(@Body() usuario: UsuarioPostDto) {
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: "Atualizar um determinado registro." })
    async update(@Param() params, @Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(params.id, usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: "Excluir um determinado registro" })
    delete(@Param() params) {
        return this.usuarioService.delete(params.id)
    }
}
