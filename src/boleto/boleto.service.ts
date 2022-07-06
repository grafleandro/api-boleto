
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { boletoConvenioService } from './boleto-convenio.service';
import { bancoPadraoService } from './boleto-padrao.service';
import { getBank, returnPadrao } from './boleto.module';

@Injectable()
export class BoletoService {

    constructor(private bancoPadrao: bancoPadraoService, private boletoConvenio: boletoConvenioService) { }

    async codeProcessing(codigoBarra: number): Promise<returnPadrao> {

        //Verifica se o banco existe no caso de boleto bancarios
        if (codigoBarra.toString().length == 47) {
            await this.getBank(codigoBarra)
        }


        console.log(codigoBarra.toString().length)

        switch (codigoBarra.toString().length) {
            case 47: return this.bancoPadrao.checkBoletoBB(codigoBarra)
            case 48: return await this.boletoConvenio.processBoletoConvenio(codigoBarra)
            default: throw new HttpException({
                error: true,
                message: `Tamanho inválido! A linha digitavel informada possui ${codigoBarra.toString().length} digitos, o tamanho correto é 47 ou 48 digitos`
            }, HttpStatus.BAD_REQUEST);
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
                // console.log('Retorno API com dados do Banco => ', JSON.stringify(response.data));
                return response.data
            })
            .catch((error) => {
                throw new HttpException({
                    ...error.response.data,
                }, error.response.status);
            });

        return bank
    }

}


