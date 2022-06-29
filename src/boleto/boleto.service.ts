
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { boletoConvenioService } from './boleto-convenio.service';
import { bancoPadraoService } from './boleto-padrao.service';
import { getBank } from './boleto.module';

@Injectable()
export class BoletoService {

    constructor(private bancoPadrao: bancoPadraoService, private boletoConvenio: boletoConvenioService) { }

    async codeProcessing(codigoBarra: number): Promise<any> {
        console.log('Codigo de barra recebido: \n', codigoBarra)
        //funcao para capturar o codigo do banco e demais informações
        if (codigoBarra.toString().length == 47) {
            var bank = await this.getBank(codigoBarra)
        }


        // tratando caso o codigo do banco nao exist
        if (bank && bank.error) {
            return bank
        }
        console.log(codigoBarra.toString().length)

        switch (codigoBarra.toString().length) {
            case 47: return this.bancoPadrao.checkBoletoBB(codigoBarra)
            case 48: return await this.boletoConvenio.processBoletoConvenio(codigoBarra)
        }

    }

    // Funcao que pega os 3 primeiros digitos para buscar em uma API gratuita os dados do banco por meio do codigo informado
    async getBank(codigoBarra: number): Promise<getBank> {
        let code = codigoBarra.toString().substring(0, 3)
        console.log('code\n', `https://brasilapi.com.br/api/banks/v1/${code}`)

        let config = {
            method: 'get',
            url: `https://brasilapi.com.br/api/banks/v1/${code}`,
            headers: {}
        };

        let bank = await axios(config)
            .then((response) => {
                console.log('Retorno API com dados do Banco => ', JSON.stringify(response.data));
                return response.data
            })
            .catch((error) => {
                console.log(error);

                return {
                    erro: true,
                    message: error.message
                }
            });

        return bank
    }

}


