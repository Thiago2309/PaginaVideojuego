// src/services/api.ts
import axios from "axios";

// Configura la instancia de Axios con la URL base de tu API
const api = axios.create({
  baseURL: "https://localhost:7029", // Asegúrate de que esta URL sea correcta para tu API
});

// Define la función para obtener todas las ofertas
export const getOfertas = async () => {
  const response = await api.get("/Ofertas/ObtenerOfertas");
  console.log(response.data); // Verificar la respuesta de la API
  return response.data.result; // Extraer el array de ofertas
};

// Define la función para obtener una oferta por ID
export const getOfertaById = async (id: number) => {
  const response = await api.get(`/Ofertas/${id}`);
  console.log(response.data); // Verificar la respuesta de la API
  return response.data.result; // Ajustado según el formato de tu respuesta
};

// Define la función para crear una nueva oferta
export const createOferta = async (oferta: any) => {
  const response = await api.post("/Ofertas/RegistroDeOferta", oferta);
  console.log(response.data); // Verificar la respuesta de la API
  return response.data; // Ajustado según el formato de tu respuesta
};

// Define la función para actualizar una oferta existente
export const updateOferta = async (id: number, oferta: any) => {
  const response = await api.put(`/Ofertas/${id}`, oferta);
  console.log(response.data); // Verificar la respuesta de la API
  return response.data; // Ajustado según el formato de tu respuesta
};

// Define la función para eliminar una oferta
export const deleteOferta = async (id: number) => {
  const response = await api.delete(`/Ofertas/${id}`);
  console.log(response.data); // Verificar la respuesta de la API
  return response.data; // Ajustado según el formato de tu respuesta
};

// Define la función para buscar ofertas por término
export const searchOfertas = async (term: string) => {
  const response = await api.get(`/Ofertas/BuscarOfertas?search=${term}`);
  console.log(response.data); // Verificar la respuesta de la API
  return response.data.result; // Extraer el array de ofertas
};

// Define la función para obtener un usuario por ID
export const getUsuarioById = async (id: number) => {
  const response = await api.get(`/Usuarios/${id}`);
  return response.data.result; // Ajustado según el formato de tu respuesta
};