import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../services/ProductService';

// procesa la acción del formulario
export async function action({ request }: ActionFunctionArgs) {
  // Recuperar los datos del formulario.
  const data = Object.fromEntries(await request.formData());

  let error = '';
  // Verificar si hay campos vacíos.
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios.';
  }
  if (error.length) {
    return error;
  }

  addProduct(data);

  return {};
  // Siempre se debe retornar un algo.
}

export default function NewProduct() {
  // Recuperar el error.
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* Formulario */}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
