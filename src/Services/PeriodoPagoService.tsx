import axios from '../axiosConfig';
import { PeriodoPago } from '../Interfaces/PeriodoPagoInterface';

export const fetchPeriodos = async (): Promise<PeriodoPago[]> => {
    try {
        const response = await axios.get('/periodo');
        return response.data as PeriodoPago[];
    } catch (error) {
        console.error('Error al obtener los periodos de pago:', error);
        return [];
    }
};
