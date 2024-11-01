import React, { useState } from 'react';
import { db } from '../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../componentscss/EditarProyecto.css';

const SubirProyecto = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [descripcionProyecto, setDescripcionProyecto] = useState('');
  const navigate = useNavigate();


  const handleSubirProyecto = async () => {
    if (nombreProyecto.trim() !== '' && descripcionProyecto.trim() !== '') {
      const proyectosCollection = collection(db, 'proyectos');
      await addDoc(proyectosCollection, { nombre: nombreProyecto, descripcion: descripcionProyecto });
      alert('Proyecto creado');
      setNombreProyecto('');
      setDescripcionProyecto('');
    } else {
        alert('Por favor, completa ambos campos.');
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2 className="welcome-title">Subir Proyecto</h2>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={nombreProyecto}
          onChange={(e) => setNombreProyecto(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Descripción corta del proyecto"
          value={descripcionProyecto}
          onChange={(e) => setDescripcionProyecto(e.target.value)}
          className="input-field"
          rows={4}
        />
        <button onClick={handleSubirProyecto} className="edit-button">Crear</button>
        <button className="logoutt-button" onClick={() => navigate('/admin')}>Volver a Administrador</button>
      </div>
    </div>
  );
};

export default SubirProyecto;
