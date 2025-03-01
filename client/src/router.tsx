import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';

// se declaran las rutas en un arreglo y después definiendo cada ruta en un objeto, se pueden tener rutas dentro de otras que se llaman rutas hijos, y compartir un layout o componente padre.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // las paginas que se renderizan dentro de la ruta padre o layout padre se declaran en children.
    children: [
      {
        index: true, // index es una propiedad que se utiliza para indicar que la ruta es la principal.
        element: <Products />,
      },
      {
        // ruta hijo NewProduct
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction,
      },
    ],
  },

  /**  {
   En caso de necesitar otro layout o componente padre se puede declarar una nueva ruta.
     path: '/example',
     element: <LayoutExample />,
   }
  */
]);
