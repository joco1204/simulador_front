import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Cliente } from '../../Interfaces/ClienteInterface';
import { createCliente } from '../../Services/ClienteService';
import { createCredito } from '../../Services/CreditoService';
import { Credito } from '../../Interfaces/CreditoInterface';

export default function Clientes() {
    const { tipo_documento = "", numero_documento = "" } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        celular: '',
        direccion: '',
        barrio: '',
        ciudad: '',
        departamento: '',
        nombreRef1: '',
        celularRef1: '',
        nombreRef2: '',
        celularRef2: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newValue =
            name === 'celular' || name === 'celularRef1' || name === 'celularRef2'
                ? value.replace(/\D/g, '').slice(0, 10)
                : value.toUpperCase();

        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async () => {
        const clienteData: Omit<Cliente, 'id'> = {
            tipo_documento,
            numero_documento,
            nombres: formData.nombres,
            apellidos: formData.apellidos,
            celular: formData.celular,
            direccion: formData.direccion,
            barrio: formData.barrio,
            ciudad: formData.ciudad,
            departamento: formData.departamento,
            nombre_referencia_1: formData.nombreRef1,
            celular_referencia_1: formData.celularRef1,
            nombre_referencia_2: formData.nombreRef2,
            celular_referencia_2: formData.celularRef2,
        };

        const clienteResponse = await createCliente(clienteData);

        if (clienteResponse && clienteResponse.id) {
            const datosCredito = JSON.parse(localStorage.getItem('datosCredito') || '{}');

            const creditoData: Omit<Credito, 'id'> = {
                id_cliente: String(clienteResponse.id),
                id_tipo_credito: datosCredito.tipo_credito,
                id_periodo_pago: datosCredito.periodoSeleccionado,
                valor_solicitud: datosCredito.valorSolicitud,
                numero_cuotas: datosCredito.numeroCuotas,
                valor_interes: datosCredito.valorInteres,
                valor_cuota_mensual: datosCredito.valorCuota,
                valor_cuota_periodo: datosCredito.valorCuota,
                id_linea_moto: datosCredito.lineaSeleccionada,
                valor_total: datosCredito.valorTotal,
                fecha_solicitud: datosCredito.fechaSolicitud,
                fecha_inicio_credito: datosCredito.fechaInicioCredito,
                fecha_fin_credito: datosCredito.fechaFinCredito,
                estado: 1
            };

            await createCredito(creditoData);

            localStorage.removeItem('datosCredito');
            Swal.fire({
                title: 'Éxito',
                text: 'Su solicitud ha sido creada con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate('/');
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo crear el cliente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h4 className="text-center">Datos de Cliente</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} autoComplete='off'>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="nombres"
                                className="form-control"
                                value={formData.nombres}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                name="apellidos"
                                className="form-control"
                                value={formData.apellidos}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label>Celular</label>
                            <input
                                type="text"
                                name="celular"
                                className="form-control"
                                value={formData.celular}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                className="form-control"
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Barrio</label>
                            <input
                                type="text"
                                name="barrio"
                                className="form-control"
                                value={formData.barrio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Ciudad</label>
                            <input
                                type="text"
                                name="ciudad"
                                className="form-control"
                                value={formData.ciudad}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Departamento</label>
                            <input
                                type="text"
                                name="departamento"
                                className="form-control"
                                value={formData.departamento}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Nombre Referencia 1</label>
                            <input
                                type="text"
                                name="nombreRef1"
                                className="form-control"
                                value={formData.nombreRef1}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Celular Referencia 1</label>
                            <input
                                type="text"
                                name="celularRef1"
                                className="form-control"
                                value={formData.celularRef1}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label>Nombre Referencia 2</label>
                            <input
                                type="text"
                                name="nombreRef2"
                                className="form-control"
                                value={formData.nombreRef2}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Celular Referencia 2</label>
                            <input
                                type="text"
                                name="celularRef2"
                                className="form-control"
                                value={formData.celularRef2}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary mt-3">
                                Enviar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}