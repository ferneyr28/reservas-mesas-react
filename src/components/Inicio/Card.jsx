import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button
} from "@chakra-ui/react";
import {Link} from 'react-router-dom'

const IMAGE =
  "https://espacio-novias.argyor.com/wp-content/uploads/2020/07/recetas-cena-romantica-1280x720-1.jpg";

const Card = ({id, nombre, url}) => {
  return (
      <>
        

      <Center py={4}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        // bg={useColorModeValue('white', 'gray.800')}
        bg={"red.200"}
        boxShadow={"md"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={url}
          />
        </Box>
        <Stack py={4} align={"center"} bg={"white"} shadow={"2xl"}>
          <Heading
            color={"blue.500"}
            fontSize={"md"}
            textTransform={"uppercase"}
          >
            {nombre}
          </Heading>
          {/* <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Nice Chair, pink
          </Heading> */}
          <Link to={`/home/reservas/${id}`}>
          <Button w={60} colorScheme={"orange"}>
            Reservar
          </Button>
          
          </Link>
          {/* <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text>
          </Stack> */}
        </Stack>
      </Box>
    </Center>

      </>
    
  );
};

export default Card;
