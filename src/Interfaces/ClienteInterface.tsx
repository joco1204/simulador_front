export interface Cliente {
    id?: number;
    tipo_documento: string;
    numero_documento: string;
    nombres: string;
    apellidos: string;
    celular: string;
    direccion: string;
    barrio: string;
    ciudad: string;
    departamento: string;
    nombre_referencia_1: string;
    celular_referencia_1: string;
    nombre_referencia_2: string;
    celular_referencia_2: string;
}