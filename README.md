# Fill Database 10k documents

# Trabajo Integrador Base de Datos II / NoSql

Este proyecto tiene como objetivo generar 10,000 documentos de alumnos utilizando JavaScript. Los documentos de los alumnos se almacenan en formato JSON y representan información sobre estudiantes en la provincia de Formosa. Este proyecto está diseñado para la materia "Base de Datos" bajo la supervisión de los Profesores Victor Hugo Ruchinsky y Ramón Díaz.

Hecho en colaboración entre los alumnos del primer año TSDSM - IPF

## Modelo de datos

## Interface de Alumno

```bash
 {
    _id: dni,
    nombre: nombre,
    apellido: apellido,
    genero: genero,
    contacto: {
      email: email,
      telefono: telefono,
    },
    localidad: localidad,
    domicilio: domicilio,
    fechaNacimiento: fechaNacimiento,
    edad: edad,
    notas: {},
    establecimiento: {
      nombre: establecimiento.nombre,
      ambito: establecimiento.ambito,
      departamento: establecimiento.departamento,
      localidad: establecimiento.localidad,
      cod_loca: establecimiento.cod_loca,
      CUEanexo: establecimiento.CUEanexo,
    },
  };
```

## Modo de Ejecución

Para ejecutar este proyecto, sigue estos pasos:

1. Clona el repositorio a tu máquina local utilizando el siguiente comando:

```bash
git clone https://github.com/FacundoMajda/fill-db-10k-ruchi.git
```

2. Cambia al directorio del proyecto:

```bash
cd fill-db-10k-ruchi
```

3. Instala las dependencias del proyecto utilizando npm:

```bash
npm install
```

4. Ejecuta el siguiente comando para generar los 10,000 documentos de alumnos:

```bash
node app.js
```

Este comando ejecutará el script `app.js`, que generará los documentos de alumnos y los almacenará en formato JSON.
