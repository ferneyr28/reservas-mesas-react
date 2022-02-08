import { useState, useEffect } from "react";
import SignIn from "./SignIn";


const Login = () => {
  const [usuarios, setUsuarios] = useState([])  
  console.log(usuarios);

  
    
  useEffect(() => {
    const listaDeUsuarios = localStorage.getItem("usuarios") ?? [];
    setUsuarios(JSON.parse(listaDeUsuarios));
  }, []);

  useEffect(()=>{
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
  }, [usuarios])

  
  return (
    <SignIn setUsuarios={setUsuarios} usuarios={usuarios}/>
  );
};

export default Login;
