import { safeParse } from 'valibot';
import axios from 'axios';
import { DraftProductSchema } from '../types';

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price, // + convierte el string a number.
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      // Peticiones de tipo post con axios.post(url, data, config)
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {
    console.log(error);
  }
}
