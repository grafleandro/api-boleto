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

  it(`Check Boleto Convenio - Caminho Feliz`, () => {
    return request(app.getHttpServer())
      .get('/boleto/826500000003472901102021306051668698408456430821')
      .expect(200)
      .then((result) => {
        expect(typeof result.body.barCode).toBe("string")
        expect(typeof result.body.amount).toBe("number")
      })
  });

  it(`Check Boleto Convenio - DAC errado`, () => {
    return request(app.getHttpServer())
      .get('/boleto/826500000004472901102021306051668698408456430821')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  it(`Check Boleto Convenio - DV errado`, () => {
    return request(app.getHttpServer())
      .get('/boleto/823500000003472901102021306051668698408456430821')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });

  it(`Check Boleto Convenio - Linha digital maior que o permitido`, () => {
    return request(app.getHttpServer())
      .get('/boleto/82350000000347290110202130605166869840845643082145')
      .expect(400)
      .catch((error) => {
        expect(typeof error.response.message).toBe("string")
      })
  });


  afterAll(async () => {
    await app.close();
  });

});

