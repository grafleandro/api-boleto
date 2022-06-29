import { Injectable } from '@nestjs/common';
import * as moment from "moment";

@Injectable()
export class bancoPadraoService {
    async checkBoletoBB(codigoBarra: number): Promise<any> {
        let CheckDvBoleto = this.calcDvBoleto(codigoBarra)
        let CheckDvCampo = await this.calcDvCampo(codigoBarra)

        if (CheckDvBoleto && CheckDvCampo) {
            var valor = this.getValor(codigoBarra)
            var vencimento = this.getVencimento(codigoBarra)
            return {
                barCode: codigoBarra,
                amount: valor,
                expirationDate: vencimento
            }
        }
    }

    async calcDvBoleto(codigoBarra: number): Promise<boolean> {
        let multiplier = '234567892345678923456789234567892345678923456789'

        let codigo = codigoBarra.toString().substring(0, 3) + codigoBarra.toString().substring(5)

        let resCodigo = []

        for (let i = 0; i < codigo.length; i++) {
            let res = parseInt(multiplier[i]) * parseInt(codigo[(codigo.length - 1) - i])
            resCodigo.push(res)
        }

        let sumCodigo = 0

        resCodigo.map((value) => {
            sumCodigo = sumCodigo + value
        })

        let modCodigo = sumCodigo % 11

        let DvBoleto = 11 - modCodigo

        if (DvBoleto == 0) DvBoleto = 1

        if (DvBoleto == codigoBarra[32]) return true

        return false
    }

    async calcDvCampo(codigoBarra: number): Promise<boolean> {
        let multiplier = '212121212121212121'

        let campoOne = codigoBarra.toString().substring(0, 9)

        let resCampoOne = []

        for (let i = 0; i < campoOne.length; i++) {
            let res = parseInt(multiplier[i]) * parseInt(campoOne[(campoOne.length - 1) - i])
            resCampoOne.push(res)
        }

        let sumCampoOne = 0

        resCampoOne.map((value) => {
            if (value < 10) {
                sumCampoOne = sumCampoOne + value
            } else {
                sumCampoOne = sumCampoOne + parseInt(value.toString()[0]) + parseInt(value.toString()[1])
            }
        })

        let modCampoOne = sumCampoOne % 10

        let dezenaCampoOne = parseInt(sumCampoOne.toString()[0] + '0') + 10

        let DvCampoOne = (dezenaCampoOne - modCampoOne) % 10

        console.log(DvCampoOne, codigoBarra[9])

        let campoTwo = codigoBarra.toString().substring(10, 20) //21
        let resCampoTwo = []

        for (let i = 0; i < campoTwo.length; i++) {

            let res = parseInt(multiplier[i]) * parseInt(campoTwo[(campoTwo.length - 1) - i])
            resCampoTwo.push(res)
        }

        let sumCampoTwo = 0

        resCampoTwo.map((value) => {
            if (value < 10) {
                sumCampoTwo = sumCampoTwo + value
            } else {
                sumCampoTwo = sumCampoTwo + parseInt(value.toString()[0]) + parseInt(value.toString()[1])
            }
        })

        let modCampoTwo = sumCampoTwo % 10

        let dezenaCampoTwo = parseInt(sumCampoTwo.toString()[0] + '0') + 10

        let DvCampoTwo = (dezenaCampoTwo - modCampoTwo) % 10

        console.log(DvCampoTwo, codigoBarra[20])

        let campoThree = codigoBarra.toString().substring(21, 31) //32

        let resCampoThree = []

        for (let i = 0; i < campoThree.length; i++) {

            let res = parseInt(multiplier[i]) * parseInt(campoThree[(campoThree.length - 1) - i])
            resCampoThree.push(res)
        }

        let sumCampoThree = 0

        resCampoThree.map((value) => {
            if (value < 10) {
                sumCampoThree = sumCampoThree + value
            } else {
                sumCampoThree = sumCampoThree + parseInt(value.toString()[0]) + parseInt(value.toString()[1])
            }
        })

        let modCampoThree = sumCampoThree % 10

        let dezenaCampoThree = parseInt(sumCampoThree.toString()[0] + '0') + 10

        let DvCampoThree = (dezenaCampoThree - modCampoThree) % 10

        console.log(DvCampoThree, codigoBarra[31])

        if (DvCampoOne == codigoBarra[9] && DvCampoTwo == codigoBarra[20] && DvCampoThree == codigoBarra[31]) return true

        return false
    }

    //DUVIDA NO CASO DE VALORES ALTOS ONDE EH RETIRADO O FATOR VENCIMENTO
    getValor(codigoBarra: number): number {
        let campoValor = parseInt(codigoBarra.toString().substring(37))
        let valor = parseFloat(campoValor.toString().substring(0, (campoValor.toString().length - 2)) + '.' + campoValor.toString().substring(campoValor.toString().length - 2))
        console.log(valor)

        return valor
    }

    getVencimento(codigoBarra: number): string {
        let fatorVencimento = parseInt(codigoBarra.toString().substring(33, 37))

        let today = moment().format("YYYY-MM-DD")
        let dateBase = moment("2000-07-03")

        // if (moment(today.toString()).isAfter('23-02-2025')) {
        //     dateBase = moment("2025-02-23", "YYYY-MM-DD")
        // }

        let dateVencimento = dateBase.add(fatorVencimento - 1000, 'days').format("YYYY-MM-DD")

        console.log('Data=', dateVencimento)

        return dateVencimento
    }
}
