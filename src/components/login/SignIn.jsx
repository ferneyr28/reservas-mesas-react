import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import '../../../node_modules/sweetalert2/dist/sweetalert2.css'

import {
  registrarUsuario,
  consultarUsuarioSession,
} from "../../helpers/Login/LoginHelpers";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  FormLabel,
} from "@chakra-ui/react";

import { AtSignIcon } from "@chakra-ui/icons";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const SignIn = ({ setUsuarios, usuarios }) => {
  const navigate = useNavigate();
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  //Estado para activar el formulario modo registro
  const [activarRegistro, setActivarRegistro] = useState(false);

  //Estados para capturar valores de inputs
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sessionStart, setSessionStart] = useState(false);
  const [tokenSession, setTokenSesion] = useState(null);

  const handleShowClick = () => setShowPassword(!showPassword);

  //Crear sesion
  useEffect(() => {
    if (sessionStart) {
      const tokenUi = uuidv4();
      setTokenSesion(tokenUi);
      const objUsuario = {
        user: nombreUsuario,
        fecha: new Date(),
        token: tokenUi,
      };
      sessionStorage.setItem("session_usuario", JSON.stringify(objUsuario));
      navigate('/home')
    }

    
  }, [sessionStart]);


  //Limpiar inputs
  const limpiarCampos = () => {
    setNombreUsuario("");
    setEmail("");
    setPassword("");
  };

  //Formulario registro
  const formularioRegistro = () => {
    setActivarRegistro(!activarRegistro);
    activarRegistro ? setEmail("") : email;
  };

  //Ejecucion de formulario
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (activarRegistro) {
      registrarUsuario(
        nombreUsuario,
        email,
        password,
        usuarios,
        setUsuarios,
        limpiarCampos
      );
    } else {
      if (![nombreUsuario, password].includes("")) {
        const sesionTmp = consultarUsuarioSession(
          usuarios,
          nombreUsuario,
          password
        );
        if (sesionTmp) {
          setSessionStart(true);

        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña invalida',
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
        }
      } else {
        alert("faltan datos en el login");
      }
    }
  };

  return (
    <Flex
      flexDir={"column"}
      minW={"100wh"}
      minH={"100vh"}
      bg={"red.200"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Red 400 Gray 50 Blue 100 Blue 400 Blue 900 */}
      <Stack
        flexDir={"column"}
        mb={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* <PhoneIcon /> */}
        <Heading color={"blue.600"}>Reservas App</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleOnSubmit}>
            <Stack
              rounded={"md"}
              spacing={4}
              p={"1rem"}
              boxShadow={"md"}
              border={"2px"}
              borderColor={"orange.300"}
              bg={"whiteAlpha.900"}
            >
              <FormControl>
                <FormLabel htmlFor="usuario">Usuario</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<CFaUserAlt color={"blue.400"} />}
                  />
                  <Input
                    id="usuario"
                    type={"text"}
                    placeholder="Ingresa Usuario"
                    border={"1px"}
                    colorScheme={"red"}
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              {activarRegistro && (
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents={"none"}
                      children={<AtSignIcon color={"blue.400"} />}
                    />
                    <Input
                      id="email"
                      type={"email"}
                      placeholder="Ingresa Email"
                      border={"1px"}
                      colorScheme={"red"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              )}

              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<CFaLock color={"blue.400"} />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    border={"1px"}
                    colorScheme={"red"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex justifyContent={"space-between"}>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme={activarRegistro ? "yellow" : "facebook"}
                  width="40"
                >
                  {activarRegistro ? "Nuevo Usuario" : "Login"}
                </Button>

                <Button
                  borderRadius={0}
                  type="button"
                  variant="solid"
                  colorScheme={activarRegistro ? "red" : "yellow"}
                  width="40"
                  onClick={formularioRegistro}
                >
                  {activarRegistro ? "Cancelar" : "Registrarse"}
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
