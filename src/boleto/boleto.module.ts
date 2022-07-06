import { Module, } from '@nestjs/common';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';
import { bancoPadraoService } from './boleto-padrao.service';
import { boletoConvenioService } from './boleto-convenio.service';


@Module({
    imports: [
        // TypeOrmModule.forFeature([ Usuario ])
    ],
    controllers: [
        BoletoController,],
    providers: [
        BoletoService,
        bancoPadraoService,
        boletoConvenioService,
    ]
})

export class BoletoModule { }

export interface getBank {
    "ispb": number,
    "name": string,
    "code": number,
    "fullName": string,
    error?: boolean,
    message?: string,
    type?: string
}

export interface returnPadrao {
    barCode: string,
    amount: number,
    expirationDate: string,
    error?: boolean,
    message?: string,
}