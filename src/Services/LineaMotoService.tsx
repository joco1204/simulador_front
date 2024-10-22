import axios from '../axiosConfig';
import { LineaMoto } from '../Interfaces/LineaMotoInterface';

export const fetchLineaMoto = async (id_marca: number): Promise<LineaMoto[]> => {
    try {
        const response = await axios.get(`/linea_moto/${id_marca}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las líneas de moto:', error);
        return [];
    }
};