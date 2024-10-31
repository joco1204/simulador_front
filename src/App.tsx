import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Simulacion from './components/Simulacion/Simulacion';
import Clientes from './components/Cliente/Cliente';

export default function App() {
    return (
        <Router>
            <main className="flex-shrink-0">
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/simulacion/:tipo_documento/:numero_documento/:tipo_credito" element={<Simulacion />} />
                                <Route path="/cliente/:tipo_documento/:numero_documento/:tipo_credito" element={<Clientes />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </Router>
    );
}