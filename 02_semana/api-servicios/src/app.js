import express from "express";
import path from "node:path"
import ServiceManager from "./managers/ServiceManager.js";

const app = express();
app.use(express.json());

const databasePath = path.join( import.meta.dirname, "data", "services.json" );
const manager = new ServiceManager(databasePath);

//Endpoints
app.get("/health", (req, res)=> {
  res.json({ status: "success", message: "ok" });
})

app.get("/api/services", async(req, res)=> {
  try {
    //Queda pendiente filtrar por categoria y available
    const { category = "", available = true } = req.query;

    const services = await manager.getServices();
    res.status(200).json({ status: "success", payload: services });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener los servicios" });
  }
});

app.get("/api/services/:sid", async(req, res)=> {
  try {
    const id = Number(req.params.sid);
    
    const service = await manager.getServiceById(id);
    if(!service){
      return res.status(404).json({ status: "error", message: "Servicio no encontrado" });
    }

    res.status(200).json({ status: "success", payload: service });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener el servicio" });
  }
});

app.post("/api/services", async(req, res)=> {
  try {
    const { name, description, duration, price, category, available } = req.body;
    if(!name || !description || !duration || !price || !category || !available){
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const result = await manager.addService({ name, description, duration, price, category, available });
    res.status(201).json({ status: "success", payload: result.payload });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al crear un servicio" });
  }
});

app.put("/api/services/:sid", async(req, res)=> {
  try {
    const id = Number(req.params.sid);
    const updates = req.body;

    const result = await manager.updateService(id, updates);
    if(!result.payload){
      return res.status(404).json({ status: "error", message: "Servicio no encontrado" });
    }

    res.status(200).json({ status: "success", payload: result.payload });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar un servicio" });
  }
})

//Falta el delete

export default app;