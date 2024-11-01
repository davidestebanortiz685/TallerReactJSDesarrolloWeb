import React, { useEffect, useState } from "react";
import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import "../componentscss/Ver.css";

const Ver = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectosCollection = collection(db, "proyectos");
        const querySnapshot = await getDocs(proyectosCollection);
        const proyectosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const handleComentarioChange = (proyectoId, texto) => {
    setNuevoComentario((prevComentarios) => ({
      ...prevComentarios,
      [proyectoId]: texto,
    }));
  };

  const agregarComentario = async (proyectoId) => {
    if (
      !nuevoComentario[proyectoId] ||
      nuevoComentario[proyectoId].trim() === ""
    )
      return;
    const comentario = {
      nombreColaborador: "Colaborador",
      texto: nuevoComentario[proyectoId],
      fecha: Timestamp.now(),
    };

    try {
      const comentarioRef = collection(
        db,
        `proyectos/${proyectoId}/comentarios`
      );
      await addDoc(comentarioRef, comentario);
      setComentarios((prevComentarios) => ({
        ...prevComentarios,
        [proyectoId]: [...(prevComentarios[proyectoId] || []), comentario],
      }));
      setNuevoComentario((prevComentarios) => ({
        ...prevComentarios,
        [proyectoId]: "",
      }));
    } catch (error) {
      setError("Error al agregar comentario.");
    }
  };

  if (cargando) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar proyectos: {error.message}
      </div>
    );
  }

  return (
    <div className="ver-container">
      <h1 className="ver-title">Proyectos Subidos</h1>
      <ul className="ver-list">
        {proyectos.map((proyecto) => (
          <li key={proyecto.id}>
            <h2>{proyecto.nombre}</h2>
            <p>{proyecto.descripcion}</p>

            <div className="comentarios-section">
              <h3>Comentarios:</h3>
              {(comentarios[proyecto.id] || []).map((comentario, index) => (
                <div key={index} className="comentario">
                  <p>
                    <strong>{comentario.nombreColaborador}: </strong>
                    {comentario.texto}
                  </p>
                  <p>
                    <small>{comentario.fecha.toDate().toLocaleString()}</small>
                  </p>
                </div>
              ))}
              <textarea
                placeholder="Escribe un comentario..."
                value={nuevoComentario[proyecto.id] || ""}
                onChange={(e) =>
                  handleComentarioChange(proyecto.id, e.target.value)
                }
                className="comentario-input"
              />
              <button onClick={() => agregarComentario(proyecto.id)}>
                Enviar Comentario
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ver;
