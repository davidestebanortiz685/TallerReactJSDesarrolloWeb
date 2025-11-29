import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Administrador';
import Colaborador from './components/Colaborador';
import EditarProyecto from './components/EditarProyecto';
import EliminarProyecto from './components/EliminarProyecto';
import SubirProyecto from './components/SubirProyecto'; 
import Ver from './components/Ver';
import { auth } from './firebaseconfig';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
    return unsuscribe;
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUsuario(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={usuario ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin/*" element={usuario ? <Admin signOut={signOut} /> : <Navigate to="/login" />} />
        <Route path="/colaborador" element={usuario ? <Colaborador /> : <Navigate to="/login" />} />
        <Route path="/colaborador" element = {<Colaborador/>}/>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/editar" element={<EditarProyecto />} />
        <Route path="/eliminar" element={<EliminarProyecto />} />
        <Route path="/subir" element={<SubirProyecto />} />
        <Route path="/ver" element={<Ver />} />
        
        <Route path="*" element={<div>No encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;