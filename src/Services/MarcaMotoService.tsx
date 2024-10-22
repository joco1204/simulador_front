import axios from '../axiosConfig';
import { MarcaMoto } from '../Interfaces/MarcaMotoInterface';

export const fetchMarcaMoto = async (): Promise<MarcaMoto[]> => {
    try {
        const response = await axios.get('/marca_moto');
        if (response.data) {
            return response.data as MarcaMoto[];
        }
        return [];
    } catch (error) {
        console.error('Error al obtener la lista de marcas de moto:', error);
        return [];
    }
};
