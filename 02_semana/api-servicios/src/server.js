import app from "./app.js";
import envConfig from "./config/env.config.js";

//inicializamos nuestro servidor
app.listen(envConfig.port, ()=> {
  console.log(`Servidor iniciado en el puerto ${envConfig.port}`);
});