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