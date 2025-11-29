import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Colaborador from './Colaborador';
import '../componentscss/Administrador.css';

const Administrador = () => {
  return (
    <div className="admin-container">
      <form className="admin-form">
        <h2 className="welcome-title">Bienvenido, Administrador</h2>
        <p className="welcome-message">Administra Los Proyectos</p>
        <div className="admin-buttons">
          {/* <Link to="/admin/colaborador" className="admin-button">Gestionar colaborador</Link> */}
          <Link to="/subir" className="admin-button">Subir</Link>
          <Link to="/editar" className="admin-button">Editar</Link>
          <Link to="/eliminar" className="admin-button">Eliminar</Link>
        </div>
        <button className="logout-button">Cerrar sesión</button>
      </form>
      
    </div>
  );
};

export default Administrador;