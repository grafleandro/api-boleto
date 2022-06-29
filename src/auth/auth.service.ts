import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class AuthService { 
    constructor(
        private readonly loginService: LoginService,
        private jwtService: JwtService
    ) {}

    async validateLogin(email: string, password: string) {
        const pessoaLogin = await this.loginService.findOneEmail(email)

        if(pessoaLogin && pessoaLogin.senha === password) {
            const {usua_id, uuid} = pessoaLogin

            return {usua_id, uuid}
        }

        return null
    }

    async login(user: any) {
        const payload = {email: user.email, usua_id: user.usua_id}

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
