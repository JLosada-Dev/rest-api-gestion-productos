import { Link } from 'react-router-dom'; // Link es un componente de react-router-dom que se utiliza para navegar entre rutas.

export default function Products() {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500"> Productos </h2>
        <Link
          to="products/new"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
    </>
  );
}
