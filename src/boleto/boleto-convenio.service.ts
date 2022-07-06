import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { returnPadrao } from './boleto.module';


@Injectable()
export class boletoConvenioService {
    async processBoletoConvenio(codigoBarra: number): Promise<returnPadrao> {
        let codigo = await this.DacRemove(codigoBarra)
        let checkDvBoleto = await this.calcDvBoletoModTen(codigo)
        let checkDacBoleto = await this.checkDacBoletoModTen(codigoBarra.toString())

        if (checkDvBoleto && checkDacBoleto) {
            var valor = await this.getValor(codigo)
            return {
                barCode: codigoBarra.toString(),
                amount: valor,
                expirationDate: null
            }
        } else {
            throw new HttpException({
                error: true,
                message: `A linha digitavel informada não atende aos padrões exigidos`
            }, HttpStatus.BAD_REQUEST);
        }
    }

    getValor(codigoBarra: number): number {
        let campoValor = parseInt(codigoBarra.toString().substring(4, 15))
        console.log(codigoBarra.toString().substring(4, 15))
        let valor = parseFloat(campoValor.toString().substring(0, (campoValor.toString().length - 2)) + '.' + campoValor.toString().substring(campoValor.toString().length - 2))

        return valor
    }

    async DacRemove(codigoBarra: number): Promise<any> {
        let codigo = codigoBarra.toString().substring(0, 11) +
            codigoBarra.toString().substring(12, 23) +
            codigoBarra.toString().substring(24, 35) +
            codigoBarra.toString().substring(36, 47)

        return codigo
    }

    async calcDvBoletoModTen(codigoBarra: string): Promise<boolean> {
        let multiplicador = '212121212121212121212121212121212212121212121212'

        //retirando o DV Geral
        let codigoClean = codigoBarra.substring(0, 11) + codigoBarra.substring(11, 22) + codigoBarra.substring(22, 33) + codigoBarra.substring(33, 44)
        //pegando as 43 posições para calcular o DV
        let codigo = codigoBarra.substring(0, 3) + codigoBarra.substring(5)

        let resCodigo = []

        for (let i = 0; i < codigo.length; i++) {
            let res = parseInt(multiplicador[i]) * parseInt(codigo[(codigo.length - 1) - i])
            resCodigo.push(res)
        }

        let sumCodigo = 0

        resCodigo.map((value) => {
            if (value < 10) {
                sumCodigo = sumCodigo + value
            } else {
                sumCodigo = sumCodigo + parseInt(value.toString()[0]) + parseInt(value.toString()[1])
            }
        })

        let modCodigo = sumCodigo % 10

        let DvBoleto = 10 - modCodigo

        if (DvBoleto.toString() == codigoBarra[3]) return true

        return false
    }

    async checkDacBoletoModTen(codigoBarra: string): Promise<any> {
        let multiplier = '212121212121212121212121212121212212121212121212'

        let fieldOne = codigoBarra.substring(0, 11)
        let fieldTwo = codigoBarra.substring(12, 23)
        let fieldThree = codigoBarra.substring(24, 35)
        let fieldFour = codigoBarra.substring(36, 47)

        let dacOne = codigoBarra.substring(11, 12)
        let dacTwo = codigoBarra.substring(23, 24)
        let dacThree = codigoBarra.substring(35, 36)
        let dacFour = codigoBarra.substring(47)

        let resFields = []

        for (let i = 0; i < fieldOne.length; i++) {
            let resOne = parseInt(multiplier[i]) * parseInt(fieldOne[(fieldOne.length - 1) - i])

            let resTwo = parseInt(multiplier[i]) * parseInt(fieldTwo[(fieldTwo.length - 1) - i])

            let resThree = parseInt(multiplier[i]) * parseInt(fieldThree[(fieldThree.length - 1) - i])

            let resFour = parseInt(multiplier[i]) * parseInt(fieldFour[(fieldFour.length - 1) - i])

            resFields.push([resOne, resTwo, resThree, resFour])
        }

        let sumFields = [0, 0, 0, 0]

        resFields.map((value) => {
            if (value[0] < 10) {
                sumFields[0] = sumFields[0] + value[0]
            } else {
                sumFields[0] = sumFields[0] + parseInt(value[0].toString()[0]) + parseInt(value[0].toString()[1])
            }

            if (value[1] < 10) {
                sumFields[1] = sumFields[1] + value[1]
            } else {
                sumFields[1] = sumFields[1] + parseInt(value[1].toString()[0]) + parseInt(value[1].toString()[1])
            }

            if (value[2] < 10) {
                sumFields[2] = sumFields[2] + value[2]
            } else {
                sumFields[2] = sumFields[2] + parseInt(value[2].toString()[0]) + parseInt(value[2].toString()[1])
            }

            if (value[3] < 10) {
                sumFields[3] = sumFields[3] + value[3]
            } else {
                sumFields[3] = sumFields[3] + parseInt(value[3].toString()[0]) + parseInt(value[3].toString()[1])
            }
        })

        let dacCalcFieldOne = 10 - (sumFields[0] % 10)
        let dacCalcFieldTwo = 10 - (sumFields[1] % 10)
        let dacCalcFieldThree = 10 - (sumFields[2] % 10)
        let dacCalcFieldFour = 10 - (sumFields[3] % 10)

        console.log('calc DAC', Number(dacOne), dacCalcFieldOne, Number(dacTwo), dacCalcFieldTwo, Number(dacThree), dacCalcFieldThree, Number(dacFour), dacCalcFieldFour)

        if (Number(dacOne) == dacCalcFieldOne && Number(dacTwo) == dacCalcFieldTwo && Number(dacThree) == dacCalcFieldThree && Number(dacFour) == dacCalcFieldFour) return true

        return false
    }

    async calcDAC(codigo: string): Promise<Number> {
        let multiplier = '212121212121212121212121212121212212121212121212'
        let resField = []

        for (let i = 0; i < codigo.length; i++) {
            let res = parseInt(multiplier[i]) * parseInt(codigo[(codigo.length - 1) - i])
            resField.push(res)
        }

        let sumField = 0

        resField.map((value) => {
            if (value < 10) {
                sumField = sumField + value
            } else {
                sumField = sumField + parseInt(value.toString()[0]) + parseInt(value.toString()[1])
            }
        })
        return sumField
    }
}
