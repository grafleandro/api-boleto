import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './login.entity';

@Injectable()
export class LoginService {
    constructor (
        @InjectRepository(Login)
        private readonly loginRepository: Repository<Login>
    ) {}
    
    async findAll(): Promise<Login[]> {
        return await this.loginRepository.find()
    }

    async findOne(id: number): Promise<Login> {
        return await this.loginRepository.findOne({
            where: {id}
        })
    }

    async findOneEmail(email: string): Promise<Login> {
        return await this.loginRepository.findOne({
            where: {email}
        })
    }

    async findPess(usua_id: number): Promise<Login> {
        return await this.loginRepository.findOne({
            where: {usua_id}
        })
    }
}
