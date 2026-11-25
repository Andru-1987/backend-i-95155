const { PORT, NODE_ENV } = process.env

if(!PORT || !NODE_ENV) throw new Error("Algunas variables de entorno faltan -> revisar .env");

export default {
  port: Number(PORT),
  nodeEnv: NODE_ENV
}