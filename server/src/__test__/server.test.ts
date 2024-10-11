import request from 'supertest';
import server, { connectDB } from '../server';
import db from '../config/db';

describe('GET /api', () => {
  it('should send back a json response', async () => {
    const res = await request(server).get('/api');

    // Código que se va cumplir
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toMatch(/json/);
    //Esperamos que el tipo de contenido sea json, en caso que la ruta no exista, el tipo de contenido será text/html y la prueba fallará.
    expect(res.body.msg).toBe('API de productos'); //  Probar el contenido de la respuesta.
    console.log(res.body.msg); //  Probar el contenido de la respuesta.

    // Código que no se va cumplir
    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe('API de productos no encontrada');
  });
});

// Nota: Describe es el que agrupa y it es el que realiza la prueba.}

//mock en jest: es una función falsa que se puede usar para simular el comportamiento de una función real.

jest.mock('../config/db');

//spyOn: es una función de Jest que permite espiar una función y controlar su comportamiento. toma dos argumentos, el primero es el objeto que contiene la función que se va a espiar y el segundo es el nombre de la función que se va a espiar.
describe('connectDB', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Error al conectar a la base de datos')); // lanza in excepción al llamar a la función authenticate de db y se le pasa un mensaje de error.
    const consoleSpy = jest.spyOn(console, 'log'); // Espía la función console.log

    await connectDB(); // Llama a la función connectDB

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error al conectar a la base de datos')
    ); // Espera que se llame a console.log con el mensaje de error
  });
});
