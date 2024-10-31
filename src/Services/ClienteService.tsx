import axios from '../axiosConfig';
import { Cliente } from '../Interfaces/ClienteInterface';

export const fetchCliente = async (tipo_documento: string, numero_documento: string): Promise<Cliente | null> => {
    try {
        const response = await axios.get(
            '/clientes', 
            {
                params: {
                    tipo_documento,
                    numero_documento,
                },
            }
        );

        if (response.data && response.data.id) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error al consultar el cliente:', error);
        return null;
    }
};

export const createCliente = async (clienteData: Omit<Cliente, 'id'>): Promise<{ message: string; id?: number }> => {
    try {
        const response = await axios.post(
            '/clientes', 
            clienteData
        );
        
        if (response.status === 201) {
            return {
                message: "Cliente creado",
                id: response.data.id
            };
        }

        return { message: "Error inesperado al crear cliente" };
    } catch (error) {
        console.error('Error al registrar el cliente:', error);
        return { message: 'Error al registrar cliente' };
    }
};