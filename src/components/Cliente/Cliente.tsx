import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cliente: React.FC = () => {
    const { tipo_documento, numero_documento, tipo_credito } = useParams();

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

    const handleSubmit = () => {
        
        console.log('Datos del formulario:', formData);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <h4 className="text-center">Datos de Cliente</h4>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="p-4 border rounded">
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
    );
};

export default Cliente;
