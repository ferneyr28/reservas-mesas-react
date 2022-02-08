import {useState, useEffect } from "react";
import Swal from "sweetalert2";
import '../../../node_modules/sweetalert2/dist/sweetalert2.css'
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  // const Links = ["Dashboard", "Projects", "Team"];
  const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [cerrarSesion, setCerrarSersion] = useState(false);

  useEffect(() => {
    if (cerrarSesion) {
      sessionStorage.removeItem("session_usuario");
      navigate("/");
    }
  }, [cerrarSesion]);

  const CerrarSession = () => {
    setCerrarSersion(true);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sessión cerrada con exito!',
      showConfirmButton: false,
      timer: 1500
    })
  };
  return (
    <>
      <Box bg={useColorModeValue("brown", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link to={"/home"}>
              <Button colorScheme={"orange"}>
                <Text textColor={"white"}>Inicio</Text>
              </Button>
            </Link>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={CerrarSession}>Cerrar Sesion</Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
