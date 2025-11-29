import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../componentscss/Home.css";

const Home = () => {
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };
  const handlever = () => {
    navigate("/ver");
  };

  useEffect(() => {
    const proyectosCollectionRef = collection(db, "proyectos");
    const getProyectos = async () => {
      const querySnapshot = await getDocs(proyectosCollectionRef);
      const proyectosData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProyectos(proyectosData);
    };
    getProyectos();
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido, Colaborador</h1>
        <p>Esta es la página de gestión de proyectos.</p>
      </div>

      <div className="home-form">
        <button className="logout-button" onClick={handlever}>
          {" "}
          Ver Proyectos{" "}
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
