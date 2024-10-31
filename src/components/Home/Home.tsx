import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TipoDocumento } from '../../Interfaces/TipoDocumentoInterface'; 
import { TipoCredito } from '../../Interfaces/TipoCreditoInterface';
import { fetchTipoDocumento } from '../../Services/TipoDocumentoService';
import { fetchTipoCredito } from '../../Services/TipoCreditoService';
import { fetchCliente } from '../../Services/ClienteService';
import { fetchCredito } from '../../Services/CreditoService';
import './Style.css';

export default function Home() {
    const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento[]>([]);
    const [tipoCredito, setTipoCredito] = useState<TipoCredito[]>([]);
    const [selectedTipoDoc, setSelectedTipoDoc] = useState<string>('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState<string>('');
    const [selectedTipoCredito, setSelectedTipoCredito] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('datosCredito')) {
            localStorage.removeItem('datosCredito');
        }
        const loadData = async () => {
            try {
                const documentos = await fetchTipoDocumento();
                const creditos = await fetchTipoCredito();
                setTipoDocumento(documentos);
                setTipoCredito(creditos);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };
    
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const cliente = await fetchCliente(selectedTipoDoc, numeroIdentificacion);
    
            if (!cliente) {
                navigate(`/simulacion/${selectedTipoDoc}/${numeroIdentificacion}/${selectedTipoCredito}`);
            } else if (cliente.id !== undefined) {
                const credito = await fetchCredito(cliente.id);
    
                if (!credito) {
                    navigate(`/simulacion/${selectedTipoDoc}/${numeroIdentificacion}/${selectedTipoCredito}`);
                } else {
                    if (credito.estado === 1) {
                        if (selectedTipoCredito === credito.id_tipo_credito) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Solicitud en Proceso',
                                text: 'Ya tiene una solicitud de crédito en proceso.',
                            });
                        } else {
                            navigate(`/simulacion/${selectedTipoDoc}/${numeroIdentificacion}/${selectedTipoCredito}`);
                        }
                    } else if (credito.estado === 2) {
                        if (selectedTipoCredito === credito.id_tipo_credito) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Crédito Activo',
                                text: 'Ya cuenta con un crédito activo.',
                            });
                        } else {
                            navigate(`/simulacion/${selectedTipoDoc}/${numeroIdentificacion}/${selectedTipoCredito}`);
                        }
                    } else {
                        navigate(`/simulacion/${selectedTipoDoc}/${numeroIdentificacion}/${selectedTipoCredito}`);
                    }
                }
            } else {
                console.error('Error: Cliente sin ID');
            }
        } catch (error) {
            console.error('Error en la búsqueda del cliente o crédito:', error);
        }
    };    

    return (
        <div className="home-container d-flex justify-content-center align-items-center py-5">
            <div className="card p-4" style={{ width: '400px' }}>
                <h4 className="text-center">Formulario de Solicitud</h4>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className="mb-3">
                        <label htmlFor="tipo-documento" className="form-label">Tipo de Documento</label>
                        <select
                            id="tipo-documento"
                            className="form-select"
                            value={selectedTipoDoc}
                            onChange={(e) => setSelectedTipoDoc(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecciona un tipo</option>
                            {tipoDocumento.map((doc) => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.tipo} - {doc.nomenclatura}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="numero-identificacion" className="form-label">Número de Identificación</label>
                        <input
                            type="text"
                            className="form-control"
                            id="numero-identificacion"
                            value={numeroIdentificacion}
                            onChange={(e) => setNumeroIdentificacion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo-credito" className="form-label">Tipo de Crédito</label>
                        <select
                            id="tipo-credito"
                            className="form-select"
                            value={selectedTipoCredito}
                            onChange={(e) => setSelectedTipoCredito(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecciona un tipo</option>
                            {tipoCredito.map((credito) => (
                                <option key={credito.id} value={credito.id}>
                                    {credito.tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Enviar</button>
                </form>
            </div>
        </div>
    );
}