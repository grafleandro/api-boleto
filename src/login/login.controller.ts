import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Login } from './login.entity';
import { LoginService } from './login.service';

@Controller('login')
@ApiTags('Login')
export class LoginController {
    constructor(private loginService: LoginService) {
    }

    @Get()
    async findAll(): Promise<Login[]> {
        return await this.loginService.findAll()
    }

    @Get(':id')
    async findOne(@Param() params): Promise<Login> {
        return await this.loginService.findOne(params.id)
    }
}
