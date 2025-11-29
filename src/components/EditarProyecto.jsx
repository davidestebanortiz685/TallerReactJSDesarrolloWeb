import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../componentscss/EditarProyecto.css";

const EditarProyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [descripcionNueva, setDescripcionNueva] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectosCollection = collection(db, "proyectos");
      const querySnapshot = await getDocs(proyectosCollection);
      const proyectosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProyectos(proyectosData);
    };
    fetchProyectos();
  }, []);

  const handleEditarProyecto = async () => {
    if (proyectoSeleccionado) {
      const proyectoDoc = doc(db, "proyectos", proyectoSeleccionado.id);
      await updateDoc(proyectoDoc, {
        nombre: nombreNuevo,
        descripcion: descripcionNueva,
      });
      alert("Proyecto actualizado");
      setNombreNuevo("");
      setDescripcionNueva("");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2 className="welcome-title">Editar Proyecto</h2>
        <select
          onChange={(e) =>
            setProyectoSeleccionado(
              proyectos.find((p) => p.id === e.target.value)
            )
          }
          className="edit-select"
        >
          <option value="">Selecciona un proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto.id} value={proyecto.id}>
              {proyecto.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={nombreNuevo}
          onChange={(e) => setNombreNuevo(e.target.value)}
          className="edit-input"
        />
        <textarea
          placeholder="Nueva descripción corta"
          value={descripcionNueva}
          onChange={(e) => setDescripcionNueva(e.target.value)}
          className="edit-input"
          rows={4}
        />
        <div className="edit-form">
          <button onClick={handleEditarProyecto} className="edit-button">
            Editar
          </button>
          <button className="logoutt-button" onClick={() => navigate("/admin")}>
            Volver a Administrador
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarProyecto;
