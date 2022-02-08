import React, { useEffect } from "react";
import Header from "./Header";
import {Container } from "@chakra-ui/react";
// import Reservas from "../reservas/Reservas";
// import Card from "./Card";
import {Outlet, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     setTimeout(() => {
    //         if(sessionStorage.getItem('session-usuario')){
    //             navigate('/');
    //         }
    //     }, 3000)
        
    // })

    useEffect(()=>{
        if(!sessionStorage.getItem('session_usuario')){
        //   setSessionStart(false)
          navigate('/')
        }
      }, [])
  return (
    <>
      <Header />
      <Container maxW="xl" py={10} centerContent>
        <Outlet />
       
      </Container>
    </>
  );
}

export default Home;
