import request from 'supertest';
import server, { connectDB } from '../server';
import db from '../config/db';

// Mock en jest: es una función falsa que se puede usar para simular el comportamiento de una función real.
jest.mock('../config/db');

// spyOn: es una función de Jest que permite espiar una función y controlar su comportamiento. 
// Toma dos argumentos, el primero es el objeto que contiene la función que se va a espiar y el segundo es el nombre de la función que se va a espiar.
describe('connectDB', () => {
  it('should handle database connection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Error al conectar a la base de datos')); // Lanza una excepción al llamar a la función authenticate de db y se le pasa un mensaje de error.
    
    const consoleSpy = jest.spyOn(console, 'log'); // Espía la función console.log

    await connectDB(); // Llama a la función connectDB

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error al conectar a la base de datos')
    ); // Espera que se llame a console.log con el mensaje de error
  });
});
