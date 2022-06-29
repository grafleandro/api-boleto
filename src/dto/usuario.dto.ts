import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNotEmpty } from "class-validator"

export class UsuarioPostDto {
    @IsNotEmpty()
    @ApiProperty()
    usua_nome: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    usua_email: string

    @IsDate()
    @ApiProperty()
    usua_dataNascimento: Date
}