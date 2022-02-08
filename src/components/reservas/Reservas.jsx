import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { mesas } from "../../data/mesas";
import ListarReservas from "./ListarReservas";
import Swal from "sweetalert2";
import "../../../node_modules/sweetalert2/dist/sweetalert2.css";
import {
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

const Reservas = () => {
  //  console.log(useParams())
  const [listaReservas, setListaReservas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const { id } = useParams();
  const [userStorage, setUserStorage] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    // redireciconar en el caso que no exista la mesa (url)
    const validacionMesa =
      mesas.find((mesa) => mesa.id == id) ?? navigate("/home");

    const listaReservaStorage = localStorage.getItem("lista-reservas");

    if (listaReservaStorage) setListaReservas(JSON.parse(listaReservaStorage));
    else setListaReservas([]);

    //traer datos de session de usuario
    const { user } = JSON.parse(sessionStorage.getItem("session_usuario"));
    setUserStorage(user);
  }, []);

  useEffect(() => {
    localStorage.setItem("lista-reservas", JSON.stringify(listaReservas));
  }, [listaReservas]);

  const handleOnclick = () => {
    const diferencia = moment(fechaFin).diff(fechaInicio, "hours");
    if ([fechaInicio, fechaFin].includes("")) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "faltan llenar datos del formulario",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      //Validando reserva
      //diferencia > 2 || diferencia < 1
      if (diferencia > 2 || diferencia < 1) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Puedes reservas 1 o 2 horas una mesa",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        //fin validacion
        console.log(diferencia);
        const itemReserva = {
          id: uuidv4(),
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          mesa_id: id,
          username: userStorage,
        };

        //Agregando reserva de mesa
        setListaReservas([...listaReservas, itemReserva]);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reserva generada satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <>
      <HStack w={"500"}>
        <FormControl>
          <FormLabel htmlFor="fecha-inicio">Fecha Inicio</FormLabel>
          <Input
            id="fecha-inicio"
            type="datetime-local"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="fecha-fin">Fecha Fin</FormLabel>
          <Input
            id="fecha-fin"
            type="datetime-local"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <Box pt={5}>
          <Button w={"10rem"} bg={"red.300"} onClick={handleOnclick}>
            AGREGAR
          </Button>
        </Box>
      </HStack>

      <ListarReservas
        listaReservas={listaReservas}
        setListaReservas={setListaReservas}
        mesa={id}
        userStorage={userStorage}
      />

    
    </>
  );
};

export default Reservas;
