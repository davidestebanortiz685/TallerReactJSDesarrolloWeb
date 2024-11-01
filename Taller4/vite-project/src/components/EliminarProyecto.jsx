import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../componentscss/EditarProyecto.css';

const EliminarProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectosCollection = collection(db, 'proyectos');
      const querySnapshot = await getDocs(proyectosCollection);
      const proyectosData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProyectos(proyectosData);
    };
    fetchProyectos();
  }, []);

  const handleEliminarProyecto = async () => {
    if (proyectoSeleccionado) {
      const proyectoDoc = doc(db, 'proyectos', proyectoSeleccionado.id);
      await deleteDoc(proyectoDoc);
      alert('Proyecto eliminado');
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2 className="welcome-title">Eliminar Proyecto</h2>
        <select
          onChange={(e) => setProyectoSeleccionado(proyectos.find(p => p.id === e.target.value))}
          className="input-field"
        >
          <option value="">Selecciona un proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto.id} value={proyecto.id}>
              {proyecto.nombre}
            </option>
          ))}
        </select>
        <button onClick={handleEliminarProyecto} className="edit-button">Eliminar</button>
        <button className="logoutt-button" onClick={() => navigate('/admin')}>Volver a Administrador</button>
      </div>
    </div>
  );
};

export default EliminarProyecto;
