// Credenciales:
//   Colaborador: estafano@gmail.com, 123456
//   admin: brayanjaram@gmail.com, 123456789

import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../componentscss/Login.css";

const auth = getAuth();

const Login = () => {
  const navigate = useNavigate();
  const [registrando, setRegistrando] = useState(false);
  const [rol, setRol] = useState("");
  const [campos, setCampos] = useState({});
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const functAuthentication = async (e) => {
    e.preventDefault();
    setError("");
    if (registrando) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          campos.correo,
          campos.contraseña
        );
        const usuario = {
          uid: userCredential.user.uid,
          rol: rol,
          ...campos,
        };
        const usuariosCollection = collection(db, "usuarios");
        await addDoc(usuariosCollection, usuario);
        console.log("Usuario registrado con éxito");
        navigate("/home");
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credenciales.email,
          credenciales.password
        );
        const user = userCredential.user;
        const usuariosCollection = collection(db, "usuarios");
        const querySnapshot = await getDocs(usuariosCollection);
        const usuario = querySnapshot.docs.find(
          (doc) => doc.data().uid === user.uid
        );
        if (usuario.data().rol === "administrador") {
          navigate("/admin");
        } else if (usuario.data().rol === "colaborador") {
          navigate("/home");
        } else {
          setError("No se encontró la información del usuario");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        if (error.code === "auth/wrong-password") {
          setError("Contraseña incorrecta.");
        } else if (error.code === "auth/user-not-found") {
          setError("No se encontró una cuenta con este correo.");
        } else {
          setError("Error al iniciar sesión: " + error.message);
        }
      }
    }
  };

  const handleRolChange = (e) => {
    setRol(e.target.value);
  };

  const handleCampoChange = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  const handleCredencialesChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={functAuthentication}>
        <h2>{registrando ? "Registro" : "Iniciar sesión"}</h2>
        {error && <p className="error-message">{error}</p>}
        {registrando ? (
          <>
            <select
              value={rol}
              onChange={handleRolChange}
              className="input-field"
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="colaborador">Colaborador</option>
            </select>
            {rol === "administrador" && (
              <>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={campos.nombre}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={campos.apellido}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={campos.correo}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={campos.contraseña}
                  onChange={handleCampoChange}
                  className="input-field"
                />
              </>
            )}
            {rol === "colaborador" && (
              <>
                <input
                  type="text"
                  name="identificacion"
                  placeholder="Identificación"
                  value={campos.identificacion}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={campos.nombre}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={campos.apellido}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  value={campos.telefono}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={campos.correo}
                  onChange={handleCampoChange}
                  className="input-field"
                />
                <input
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={campos.contraseña}
                  onChange={handleCampoChange}
                  className="input-field"
                />
              </>
            )}
          </>
        ) : (
          <>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={credenciales.email}
              onChange={handleCredencialesChange}
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credenciales.password}
              onChange={handleCredencialesChange}
              className="input-field"
            />
          </>
        )}
        <button type="submit" className="submit-button">
          {registrando ? "Registrar" : "Iniciar sesión"}
        </button>
        <button
          onClick={() => setRegistrando(!registrando)}
          className="toggle-button"
        >
          {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
        </button>
      </form>
    </div>
  );
};

export default Login;
