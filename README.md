# USERS-GESTOR
SIMULACRO DE NODEJS.  Gestionar usuarios mediante un CRUD, registrar usuarios - loguear usuarios, - Encriptar el password - Generar un token de autenticación - Proteger las rutas de las API de acceso no autorizado

# Crearemos una aplicación que permita:

Componente de gestión:
- Gestionar usuarios mediante un CRUD

Componente de acceso:
- Registrar usuarios
- Loguear usuarios

Componente de seguridad:
- Encriptar el password
- Generar un token de autenticación
- Proteger las rutas de las API de acceso no autorizado

Buenas prácticas

- Implementar una estructura de directorios que permita separar responsabilidades.

# SOLUCIÓN

1. Gestión de usuarios mediante CRUD en carpete controllers
2. Registro de usuarios en index y controller
3. Logueo de usuarios en indes y controller
4. Contraseña encriptada con bcrypt con ayuda de middleware
5. Token generado al loguearse un usuario
6. Rutas protegidas desde rutas con la importanción de la función authenticate

   # ESTRUCTURA DE DIRECTORIOS QUE PERMITE SEPARAR RESPONSABILIDADES:

   ![image](https://github.com/SamuelSml8/USERS-GESTOR/assets/127326262/37b70649-510b-47d6-a522-3e95a6c15543)
