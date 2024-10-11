import { Outlet } from 'react-router-dom'; // Outlet es un componente de react-router-dom que se utiliza para renderizar las rutas hijas de un componente padre.

export default function layout() {
 
  return (
    <>
      <header className="bg bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
}
