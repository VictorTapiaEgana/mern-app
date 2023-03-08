
![Logo](https://camo.githubusercontent.com/85cf7e1a8b85221e81ba91cbce29c917b91a7390bb3ca06aa31cfd1eadd7fe60/68747470733a2f2f7777772e337269746563686e6f6c6f676965732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f31312f4d45524e2d537461636b2d547261696e696e672d696e2d50756e652d65313537353032323432373234342e706e67)

# MERN App

Es una aplicacion que combina los 4 componentes del stack MERN, se dividio en 2 partes, Frontend y Backend,

El Frontend en reactjs, envia solicitudes GET, PUT, POST y DELETE, con las cuales muestra, edita, actualiza y elimina los datos presentados al usuario.

El Backend, montado con nodejs y expressjs se conecta a una base de datos de MondoDB, los datos son enviados en formato JSON.

# Endpoints

Los Datos se reciben desde la raiz: 
```bash
https://servidordenodemernstack.vercel.app/api/task 
```
Para agregar un nuevo registro se envia un POST a la direccion raiz con el arreglo de datos.
```bash
https://servidordenodemernstack.vercel.app/api/task 
```
Para modificar un registro de envia un PUT,especificando el Id del registro a modificar y un arreglo con los nuevos datos.
```bash
https://servidordenodemernstack.vercel.app/api/task/id
```
Para eliminar un registro de envia un DELETE,especificando el Id del registro a eliminar y un arreglo con los nuevos datos.
```bash
https://servidordenodemernstack.vercel.app/api/task/id
```

-> [Frontend](https://mern-example.vercel.app/) <-

-> [Backend](https://servidordenodemernstack.vercel.app/api/task) <-
