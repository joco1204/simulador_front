import axios from '../axiosConfig';
import { Credito } from '../Interfaces/CreditoInterface';

export const fetchCredito = async (id_cliente: number): Promise<Credito | null> => {
    try {
        const response = await axios.get(`/credito/${id_cliente}`);
        return response.data;
    } catch (error) {
        console.error('Error al consultar el crédito:', error);
        return null;
    }
};

export const createCredito = async (creditoData: Omit<Credito, 'id'>): Promise<Credito | null> => {
    try {
        const response = await axios.post(
            '/credito/add', 
            creditoData
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear el crédito:', error);
        return null;
    }
};