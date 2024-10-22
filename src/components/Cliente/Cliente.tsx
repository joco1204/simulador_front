import React from 'react';
import { useParams } from 'react-router-dom';

const Cliente: React.FC = () => {
    const { tipo_documento, numero_documento, tipo_credito } = useParams();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            
        </div>
    );
};

export default Cliente;
