import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import '../../../node_modules/sweetalert2/dist/sweetalert2.css'

export function ValidarUsuarioExistente(userSearch, users) {
    return users.find(user => user.username === userSearch)
}

export function consultarUsuarioSession(usuarios, nombreUsuario, password ) {
    const consultarUsuario = usuarios.find(usuario => usuario.username === nombreUsuario && usuario.password === password);
    return consultarUsuario;
}

export function registrarUsuario(userName, userEmail, UserPassword, users, setUsers, limpiarCampos) {
        if([userName, userEmail, UserPassword].includes("")){
            Swal.fire({
                title: 'Error!',
                text: 'Faltan datos en el formulario',
                icon: 'error',
                confirmButtonText: 'Entendido'
              })
              return
        }
        const consultarUsuario = ValidarUsuarioExistente(userName, users);
  
        if (consultarUsuario) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario ya existe por favor elige otro',
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
  
        const usuarioTmp = {
          id: uuidv4(),
          username: userName,
          password: UserPassword,
          tipo_usuario: "usuario",
        };
        setUsers([...users, usuarioTmp]);
        limpiarCampos();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        // alert("Usuario creado correctamente");
}

