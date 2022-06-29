import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioPostDto } from 'src/dto/usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from "./usuario.entity";


@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find()
    }

    async findOne(uuid: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({
            where: { usua_uuid: uuid }
        })
    }

    async findOneEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({
            where: { usua_email: email }
        })
    }

    async create(usuario: UsuarioPostDto): Promise<Usuario> {
        return await this.usuarioRepository.save(usuario)
    }

    async update(uuid: string, usuario: Usuario): Promise<Usuario> {
        const usuarioEntity = await this.findOne(uuid)

        if (!usuarioEntity) {
            throw new NotFoundException(`Registro não encontrado!`)
        }

        usuario.updatedAt = new Date()

        await this.usuarioRepository.update({ usua_uuid: uuid }, usuario)

        return await this.findOne(uuid)
    }

    async delete(uuid: string) {
        const usuario = await this.findOne(uuid)

        if (!usuario) {
            throw new NotFoundException(`Registro não encontrado!`)
        }

        await this.usuarioRepository.delete(usuario.usua_id)

        return { data: `Item ${usuario.usua_id} foi removido com sucesso` }
    }
}
