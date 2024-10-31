import axios from '../axiosConfig';
import { Credito } from '../Interfaces/CreditoInterface';

export const fetchCredito = async (id_cliente: number): Promise<Credito | null> => {
    try {
        const response = await axios.get(`/credito/${id_cliente}`);

        if (response.data && response.data.id) {
            return response.data;
        }
        return null;
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
        if (response.data && response.data.id) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error al crear el crédito:', error);
        return null;
    }
};