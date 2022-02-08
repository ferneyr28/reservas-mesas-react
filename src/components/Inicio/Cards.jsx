
import { Grid, Center, Heading } from "@chakra-ui/react";
import Card from "../Inicio/Card";
import { mesas } from "../../data/mesas";


const Cards = () => {
  return (
    <>
      <Center>
        <Heading mb={10}>Selecciona la Mesa a reservar</Heading>
      </Center>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {mesas.map((mesa) => (
          <Card key={mesa.id} {...mesa} />
        ))}
      </Grid>
    </>
  );
};

export default Cards;
