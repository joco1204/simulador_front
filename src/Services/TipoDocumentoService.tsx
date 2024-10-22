import axios from '../axiosConfig';
import { TipoDocumento } from '../Interfaces/TipoDocumentoInterface';

export const fetchTipoDocumento = async (): Promise<TipoDocumento[]> => {
    const response = await axios.get('/tipo_documento');
    return response.data;
};