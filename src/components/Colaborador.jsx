import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../componentscss/Colaborador.css';

const Colaborador = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nuevoProyecto, setNuevoProyecto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectosCollection = collection(db, 'proyectos');
        const querySnapshot = await getDocs(proyectosCollection);
        const proyectosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProyectos(proyectosData);
      } catch (error) {
        setError(error);
        console.error("Error al recuperar proyectos:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchProyectos();
  }, []);

  const handleCrearProyecto = async () => {
    try {
      const proyectosCollection = collection(db, 'proyectos');
      await addDoc(proyectosCollection, { nombre: nuevoProyecto });
      setNuevoProyecto('');
    } catch (error) {
      console.error("Error al crear proyecto:", error);
    }
  };

  if (cargando) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">Error al cargar proyectos: {error.message}</div>;
  }

  return (
    <div className="colaborador-container">
      <h1 className="colaborador-title">Gestión de Proyectos</h1>
      <form className="colaborador-form">
        <input
          type="text"
          value={nuevoProyecto}
          onChange={(e) => setNuevoProyecto(e.target.value)}
          placeholder="Crear nuevo proyecto"
        />
        <button type="button" onClick={handleCrearProyecto}>Crear</button>
      </form>
      <Link to="/ver" className="view-button">Ver Proyectos</Link> {/* Botón para ver proyectos */}
      <ul className="colaborador-list">
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>{proyecto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Colaborador;
