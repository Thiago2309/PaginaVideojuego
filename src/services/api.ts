import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7029", 
});

export const getOfertas = async () => {
  const response = await api.get("/Ofertas/ObtenerOfertas");
  console.log(response.data); 
  return response.data.result; 
};

export const getOfertaById = async (id: number) => {
  const response = await api.get(`/Ofertas/${id}`);
  console.log(response.data); 
  return response.data.result;
};

export const createOferta = async (oferta: any) => {
  const response = await api.post("/Ofertas/RegistroDeOferta", oferta);
  console.log(response.data); 
  return response.data; 
};

export const updateOferta = async (id: number, oferta: any) => {
  const response = await api.put(`/Ofertas/${id}`, oferta);
  console.log(response.data); 
  return response.data; 
};

export const deleteOferta = async (id: number) => {
  const response = await api.delete(`/Ofertas/${id}`);
  console.log(response.data); 
  return response.data; 
};

export const searchOfertas = async (term: string) => {
  const response = await api.get(`/Ofertas/BuscarOfertas?search=${term}`);
  console.log(response.data); 
  return response.data.result; 
};

export const getUsuarioById = async (id: number) => {
  const response = await api.get(`/Usuarios/${id}`);
  return response.data.result; 
};