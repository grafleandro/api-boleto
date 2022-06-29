import { Controller, Get, Param } from '@nestjs/common';
import { BoletoService } from './boleto.service';


@Controller('boleto')

export class BoletoController {
    constructor(private boletoService: BoletoService) {
    }

    @Get(':codigoBarra')
    async processaBoleto(@Param() params): Promise<any> {
        return await this.boletoService.codeProcessing(params.codigoBarra)
    }

}
