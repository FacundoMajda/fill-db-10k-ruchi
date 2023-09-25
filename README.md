# Fill Database 10k documents

# Trabajo Integrador Base de Datos II / NoSql

Este proyecto tiene como objetivo generar 10,000 documentos de alumnos utilizando JavaScript. Los documentos de los alumnos se almacenan en formato JSON y representan información sobre estudiantes en la provincia de Formosa. Este proyecto está diseñado para la materia "Base de Datos" bajo la supervisión de los Profesores Victor Hugo Ruchinsky y Ramón Díaz.

Hecho en colaboración entre los alumnos del primer año TSDSM - IPF

## Modelo de datos

## Interface de Alumno

```bash
 Alumno {
  _id: number;
  nombres: string;
  apellidos: string;
  genero: string;
  contacto: {
    email: string;
    telefono: string;
  },

  localidad: DataLocalidades;
  domicilio: Object;
  fechaNacimiento: string;
  año: string;
  notas: Object;
  establecimiento: DataEstablecimientosEducativos;
}
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
