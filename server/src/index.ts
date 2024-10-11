import server from './server';
import colors from 'colors';

// Iniciamos el servidor en el puerto 4000 usando el método listen de express y pasando el puerto y una función de callback que imprime un mensaje en la consola.
const port = process.env.PORT || 4000; // Puerto en el que se va a ejecutar el servidor, si no hay una variable de entorno llamada PORT, se ejecutará en el puerto 4000
server.listen(port, () => {
  console.log(colors.cyan.bold(`REST API en el puerto ${port}`));
});
