import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BoletoModule } from './boleto.module';
import * as request from 'supertest';



describe('BoletoController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleBoleto = await Test.createTestingModule({
      imports: [BoletoModule]
    })
      .compile();

    app = moduleBoleto.createNestApplication();
    await app.init();
  });

  it(`Check Boleto Padrao - Caminho Feliz`, () => {
    return request(app.getHttpServer())
      .get('/boleto/00190000090242117300201130801176190120000047092')
      .expect(200)
      .then((result) => {
        expect(typeof result.body.barCode).toBe("string")
        expect(typeof result.body.amount).toBe("number")
        expect(typeof result.body.expirationDate).toBe("string")
      })
  });

  it(`Check Boleto Padrao - Banco não existente`, () => {
    return request(app.getHttpServer())
      .get('/boleto/81690000090242117300201130801176190120000047092')
      .expect(404)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  it(`Check Boleto Padrao - Linha digitavel com quantidade de caracter errada`, () => {
    return request(app.getHttpServer())
      .get('/boleto/816900000902421173002011308011761901200000')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  it(`Check Boleto Padrao - DV do Boleto  incorreto`, () => {
    return request(app.getHttpServer())
      .get('/boleto/00190000090226117300201130801176190120000047092')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  it(`Check Boleto Padrao - Linha Digitavel com digitos alterados`, () => {
    return request(app.getHttpServer())
      .get('/boleto/00190000090226117300201130801176190120000047092')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  afterAll(async () => {
    await app.close();
  });

});

