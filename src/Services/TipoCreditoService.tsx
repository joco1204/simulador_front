import axios from '../axiosConfig';
import { TipoCredito } from '../Interfaces/TipoCreditoInterface'

export const fetchTipoCredito = async (): Promise<TipoCredito[]> => {
    const response = await axios.get('/tipo_credito');
    return response.data;
};