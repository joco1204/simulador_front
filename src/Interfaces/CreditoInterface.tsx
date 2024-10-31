export interface Credito {
    id?: number;
    id_cliente: string;
    id_tipo_credito: string;
    id_periodo_pago: string;
    valor_solicitud: string;
    numero_cuotas: string;
    valor_interes: string;
    valor_cuota_mensual: string;
    valor_cuota_periodo: string;
    id_linea_moto: string;
    valor_total: string;
    fecha_solicitud: string;
    fecha_inicio_credito: string;
    fecha_fin_credito: string;
    estado: number;
}
