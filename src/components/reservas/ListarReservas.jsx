import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import "../../../node_modules/sweetalert2/dist/sweetalert2.css";

const ListarReservas = ({
  listaReservas,
  setListaReservas,
  mesa,
  userStorage,
}) => {
  const handleEliminarReserva = (id) => {
    Swal.fire({
      title: "Estas seguro de eliminar la reserva?",
      text: "Una vez eliminada la reserva no podras revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminala!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Reserva Eliminada!", "", "success");
        //Eliminando reserva
        const itemEliminado = listaReservas.filter(
          (reserva) => reserva.id !== id
        );
        setListaReservas(itemEliminado);
    
      }
    });
  };
  return (
    <Box w="4xl" mt={5}>
      <Heading textAlign={"center"} py={4}>
        Reservas Mesa {mesa}
      </Heading>
      {listaReservas.find((reserva) => reserva.mesa_id === mesa) ? (
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Lista de reservas en curso</TableCaption>
          <Thead bg={"brown"}>
            <Tr>
              <Th textColor={"white"}>Fecha Inicio</Th>
              <Th textColor={"white"}>Fecha Final</Th>
              <Th textColor={"white"}>Usuario</Th>
              <Th textColor={"white"}>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listaReservas.map(
              (listaReserva) =>
                listaReserva &&
                listaReserva.mesa_id === mesa && (
                  <Tr key={listaReserva.id}>
                    <Td>{listaReserva.fecha_inicio}</Td>
                    <Td>{listaReserva.fecha_fin}</Td>
                    <Td>{listaReserva.username}</Td>
                    <Td>
                      {listaReserva.username == userStorage && (
                        <Button
                          size={"md"}
                          colorScheme={"red"}
                          onClick={() => handleEliminarReserva(listaReserva.id)}
                        >
                          Eliminar
                        </Button>
                      )}
                    </Td>
                  </Tr>
                )
            )}
          </Tbody>
        </Table>
      ) : (
        <Heading size={'md'} textAlign='center'>Aún no hay reservas</Heading>
      )}
    </Box>
  );
};

export default ListarReservas;
