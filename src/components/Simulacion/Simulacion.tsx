import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMarcaMoto } from '../../Services/MarcaMotoService';
import { fetchLineaMoto } from '../../Services/LineaMotoService';
import { fetchPeriodos } from '../../Services/PeriodoPagoService';
import { MarcaMoto } from '../../Interfaces/MarcaMotoInterface';
import { LineaMoto } from '../../Interfaces/LineaMotoInterface';
import { PeriodoPago } from '../../Interfaces/PeriodoPagoInterface';

export default function Simulacion() {
    const { tipo_documento, numero_documento, tipo_credito } = useParams();
    const navigate = useNavigate();
    const [marcas, setMarcas] = useState<MarcaMoto[]>([]);
    const [lineas, setLineas] = useState<LineaMoto[]>([]);
    const [valorSolicitud, setValorSolicitud] = useState('');
    const [valorInteres, setValorInteres] = useState('');
    const [numeroCuotas, setNumeroCuotas] = useState('');
    const [periodos, setPeriodos] = useState<PeriodoPago[]>([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
    const [valorCuota, setValorCuota] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [fechaSolicitud, setFechaSolicitud] = useState(new Date().toISOString().split('T')[0]);
    const [fechaInicioCredito, setFechaInicioCredito] = useState(new Date().toISOString().split('T')[0]);
    const [fechaFinCredito, setFechaFinCredito] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [lineaSeleccionada, setLineaSeleccionada] = useState<LineaMoto | null>(null);
    const [mostrarBotonConfirmar, setMostrarBotonConfirmar] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('datosCredito')) {
            localStorage.removeItem('datosCredito');
        }
        fetchMarcaMoto().then(setMarcas);
        fetchPeriodos().then(setPeriodos);
    }, []);

    const fetchLineasPorMarca = async (marcaId: number) => {
        const data = await fetchLineaMoto(marcaId);
        setLineas(data);
        setLineaSeleccionada(null);
        setValorSolicitud('');
    };

    const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMarca = e.target.value;
        setMarcaSeleccionada(selectedMarca);
        fetchLineasPorMarca(selectedMarca ? Number(selectedMarca) : 0);
    };

    const handleLineaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLinea = lineas.find(linea => linea.id === parseInt(e.target.value));
        setLineaSeleccionada(selectedLinea || null);
        setValorSolicitud(selectedLinea ? selectedLinea.precio : '');
    };

    const handleCalcularCredito = () => {
        const montoSolicitado = parseFloat(valorSolicitud);
        const interesAnual = parseFloat(valorInteres);
        const cuotas = parseInt(numeroCuotas);
    
        if (isNaN(montoSolicitado) || isNaN(interesAnual) || isNaN(cuotas) || cuotas <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }
    
        const diasDelMes = 30; 
        const interes = (montoSolicitado * (interesAnual / 100)) * (cuotas / diasDelMes);
        const valorTotalConInteres = montoSolicitado + interes;
        const valorCuotaMensual = valorTotalConInteres / cuotas;
    
        const periodo = periodos.find((p) => p.id === parseInt(periodoSeleccionado));
        if (periodo) {
            const valorCuota = valorCuotaMensual;
            const totalPagar = valorCuotaMensual * cuotas;
            setValorCuota(valorCuota.toFixed(0));
            setValorTotal(totalPagar.toFixed(0));
        } else {
            console.error('Periodo no encontrado');
        }
    
        const fechaInicio = new Date(fechaInicioCredito);
        fechaInicio.setMonth(fechaInicio.getMonth() + cuotas);
        setFechaFinCredito(fechaInicio.toISOString().split('T')[0]);
    
        setMostrarBotonConfirmar(true); 
    };

    const handleConfirmarCliente = () => {
        const datosCredito = {
            tipo_documento,
            numero_documento,
            tipo_credito,
            valorSolicitud,
            valorInteres,
            numeroCuotas,
            periodoSeleccionado,
            valorCuota,
            valorTotal,
            fechaSolicitud,
            fechaInicioCredito,
            fechaFinCredito,
            ...(tipo_credito === '2' && {
                marcaSeleccionada,
                lineaSeleccionada: lineaSeleccionada?.id.toString(),
            }),
        };
    
        localStorage.setItem('datosCredito', JSON.stringify(datosCredito));
        
        navigate(`/cliente/${tipo_documento}/${numero_documento}/${tipo_credito}`);
    };
    

    const labelValor = tipo_credito === '2' ? 'Precio Moto' : tipo_credito === '3' ? 'Precio eBike' : 'Valor Solicitud';

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <form className="p-4 border rounded" autoComplete='off'>
                {tipo_credito === '1' || tipo_credito === '2' || tipo_credito === '3' ? (
                    <>
                        { tipo_credito === '2' && (
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Marca</label>
                                    <select
                                        className="form-control"
                                        value={marcaSeleccionada}
                                        onChange={handleMarcaChange}
                                    >
                                        <option value="">Seleccione una marca</option>
                                        {marcas.map((marca) => (
                                            <option key={marca.id} value={marca.id}>
                                                {marca.marca}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Línea</label>
                                    <select
                                        className="form-control"
                                        value={lineaSeleccionada ? lineaSeleccionada.id : ''}
                                        onChange={handleLineaChange}
                                        disabled={!marcaSeleccionada}
                                    >
                                        <option value="">Seleccione una línea</option>
                                        {lineas.map((linea) => (
                                            <option key={linea.id} value={linea.id}>
                                                {linea.linea}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {lineaSeleccionada && (
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <img src={lineaSeleccionada.url_imagen} alt="Imagen de la moto" className="img-fluid" width="500" height="500" />
                                </div>
                            </div>
                        )}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>{labelValor}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={valorSolicitud}
                                    onChange={(e) => setValorSolicitud(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Valor Interés (%)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={valorInteres}
                                    onChange={(e) => setValorInteres(e.target.value.replace(/[^0-9.]/g, ''))} // Solo números
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Número de Cuotas</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={numeroCuotas}
                                    onChange={(e) => setNumeroCuotas(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Periodo de Pago</label>
                                <select
                                    className="form-control"
                                    value={periodoSeleccionado}
                                    onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                                >
                                    <option value="">Seleccione un periodo</option>
                                    {periodos.map((periodo) => (
                                        <option key={periodo.id} value={periodo.id}>
                                            {periodo.periodo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <button
                                    type="button"
                                    className="btn btn-primary mb-3"
                                    onClick={handleCalcularCredito}
                                >
                                    Calcular Crédito
                                </button>
                            </div>
                        </div>
                                
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Valor Cuota</label>
                                <input type="text" className="form-control" value={valorCuota} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label>Valor Total</label>
                                <input type="text" className="form-control" value={valorTotal} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Fecha Solicitud</label>
                                <input type="date" className="form-control" value={fechaSolicitud} readOnly />
                            </div>
                            <div className="col-md-6">
                                <label>Fecha Inicio Crédito</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={fechaInicioCredito}
                                    onChange={(e) => setFechaInicioCredito(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Fecha Fin Crédito</label>
                                <input type="text" className="form-control" value={fechaFinCredito} readOnly />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <div className="col-md-12">
                                {mostrarBotonConfirmar && ( 
                                    <button
                                        type="button"
                                        className="btn btn-success mb-3"
                                        onClick={handleConfirmarCliente}
                                    >
                                        Confirmar Cliente
                                    </button>
                                )}
                            </div>
                        </div>
                                
                    </>
                ) : (
                    <h2>No se ha encontrado el tipo de crédito</h2>
                )}
            </form>
        </div>
    );
}
