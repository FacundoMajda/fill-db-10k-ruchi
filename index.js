//@ts-check
import fs from "fs/promises";
import { writeFile } from "fs/promises";

//esquema basico, faltan datos
const DataNombresFemeninos = [
  "Sofía",
  "Valentina",
  "Martina",
  "Camila",
  "Victoria",
  "Lucía",
  "Florencia",
  "Milagros",
  "Rocío",
  "Sol",
  "Emilia",
  "Silvana",
  "Malena",
  "Aymará",
];

const DataNombresMasculinos = [
  "Lucas",
  "Daniel",
  "Sergio",
  "Fabian",
  "Mario",
  "Leonardo",
  "Leandro",
  "Diego",
  "Hector",
  "Carlos",
  "Axel",
  "Dante",
  "Mateo",
  "Agustín",
  "Santiago",
  "Nicolás",
  "Joaquín",
  "Facundo",
  "Matías",
  "Leonardo",
  "Tomás",
  "Emiliano",
  "Fausto",
  "Mauricio",
  "Ruperto",
];

const DataApellidos = [
  "Mernes",
  "García",
  "Martínez",
  "Rodríguez",
  "López",
  "Fernández",
  "González",
  "Pérez",
  "Ramírez",
  "Sánchez",
  "Romero",
  "Torres",
  "Díaz",
  "Alvarez",
  "Ruiz",
  "Hernández",
  "Mendoza",
  "Flores",
  "Gómez",
  "Ortega",
  "Silva",
  "Majda",
  "Piazza",
  "Britez",
  "Fárias",
  "Valdez",
  "Rios",
  "Meyer",
  "Caeiro",
  "Wanwewi",
];

const DataLocalidades = [
  { name: "Formosa Capital" },
  { name: "El Colorado" },
  { name: "Laguna Blanca" },
  { name: "General Belgrano" },
];

const DataBarrios = {
  "Formosa Capital": [
    { name: "12 DE OCTUBRE", houses: 526 },
    { name: "2 DE ABRIL", houses: 1022 },
    { name: "BARRIO MILITAR", houses: 119 },
    { name: "OBRERO", houses: 1401 },
    { name: "BARRIO VIAL", houses: 958 },
    { name: "DON BOSCO", houses: 1606 },
    { name: "EL MISTOL", houses: 98 },
    { name: "EL RESGUARDO", houses: 513 },
    { name: "MANUEL BELGRANO", houses: 71 },
    { name: "EMILIO TOMAS", houses: 340 },
    { name: "EVA PERÓN", houses: 2200 },
    { name: "GUADALUPE", houses: 1435 },
    { name: "INDEPENDENCIA", houses: 1462 },
    { name: "J.F. KENNEDY", houses: 90 },
    { name: "JUAN D. PERÓN", houses: 1143 },
    { name: "LA FLORESTA", houses: 831 },
    { name: "LAS DELICIAS", houses: 213 },
    { name: "LIBORSI", houses: 714 },
    { name: "MARIANO MORENO", houses: 1636 },
    { name: "NANQOM", houses: 433 },
    { name: "SAN AGUSTÍN", houses: 780 },
    { name: "SAN FRANCISCO", houses: 2222 },
    { name: "SAN JOSÉ OBRERO", houses: 741 },
    { name: "SAN MARTÍN", houses: 3814 },
    { name: "SAN MIGUEL", houses: 1333 },
    { name: "SAN PEDRO", houses: 743 },
    { name: "SANTA ROSA", houses: 421 },
    { name: "SIMÓN BOLIVAR", houses: 2161 },
    { name: "VENEZUELA", houses: 619 },
    { name: "VILLA DEL ROSARIO", houses: 1106 },
    { name: "VILLA HERMOSA", houses: 505 },
    { name: "VILLA LA PILAR", houses: 954 },
    { name: "VILLA LOURDES", houses: 1244 },
    { name: "VIRGEN DE LUJÁN", houses: 316 },
    { name: "LA ESPERANZA", houses: 180 },
    { name: "7 DE MAYO", houses: 368 },
    { name: "ANTENOR GAUNA", houses: 1069 },
    { name: "1° DE MAYO", houses: 184 },
    { name: "EL PORVENIR", houses: 352 },
    { name: "BERNARDINO RIVADAVIA", houses: 890 },
    { name: "VIRGEN DE ITATÍ", houses: 782 },
    { name: "PARQUE INDUSTRIAL", houses: 27 },
    { name: "SAN JUAN BAUTISTA", houses: 671 },
    { name: "16 DE JULIO", houses: 73 },
    { name: "SAG. CORAZÓN DE MARÍA", houses: 100 },
    { name: "ARTURO ILLIA", houses: 935 },
    { name: "HIPÓLITO IRIGOYEN", houses: 193 },
    { name: "SAN CAYETANO", houses: 217 },
    { name: "FACUNDO QUIROGA", houses: 82 },
    { name: "SAN ANDRES", houses: 177 },
    { name: "SANTA LUCÍA", houses: 101 },
    { name: "LA VIRGEN NIÑA", houses: 184 },
    { name: "17 DE OCTUBRE", houses: 123 },
    { name: "LIBERTAD", houses: 129 },
    { name: "ISLAS MALVINAS", houses: 197 },
    { name: "COLLUCCIO", houses: 443 },
    { name: "SAN ISIDRO LABRADOR", houses: 396 },
    { name: "ROBERTO SOTELO", houses: 133 },
    { name: "8 DE MARZO", houses: 226 },
    { name: "CO.VI.FOL.", houses: 124 },
    { name: "FONTANA", houses: 1232 },
    { name: "SOLANO LIMA", houses: 217 },
    { name: "LA ESTRELLA", houses: 53 },
    { name: "20 de JULIO", houses: 225 },
    { name: "REPÚBLICA ARGENTINA", houses: 1895 },
    { name: "8 DE OCTUBRE", houses: 344 },
    { name: "EL QUEBRANTO", houses: 152 },
    { name: "EL PALOMAR", houses: 493 },
    { name: "STELLA MARIS", houses: 216 },
    { name: "LOS INMIGRANTES", houses: 112 },
    { name: "LAS ORQUIDEAS", houses: 275 },
    { name: "Dr. RICARDO BALBÍN", houses: 170 },
    { name: "SAN JUAN", houses: 316 },
    { name: "SAN ANTONIO", houses: 454 },
    { name: "PARQUE URBANO", houses: 522 },
    { name: "ARTURO ILLIA II", houses: 670 },
  ],

  Colorado: [
    { name: "Obrero" },
    { name: "San Miguel" },
    { name: "San Francisco" },
  ],
  Belgrano: [
    { name: "Centro" },
    { name: "40 Viviendas" },
    { name: "12 de octubre" },
  ],
  "Laguna Blanca": [{ name: "Centro" }],
  Clorinda: [{ name: "Centro" }],
};

const DataModalidadesSecundaria = [
  "Cs. Sociales",
  "Cs. Naturales",
  "Producción de Bienes y Servicios",
];

function obtenerElementoAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generarDNIaleatorio(usedDNIs) {
  let dni;
  do {
    dni = Math.floor(100000000 + Math.random() * 900000000);
  } while (usedDNIs.has(dni));
  usedDNIs.add(dni);
  return dni;
}

function generarEdadAleatoria(nivel) {
  let edadMinima, edadMaxima;
  if (nivel === "Primaria") {
    edadMinima = 6;
    edadMaxima = 12; // 6 años de primaria
  } else if (nivel === "Secundaria") {
    edadMinima = 13; // Inicio de secundaria
    edadMaxima = 18; // Fin de secundaria
  } else {
    edadMinima = 18; // Inicio de terciario
    edadMaxima = 20; // Fin de terciario
  }
  return Math.floor(edadMinima + Math.random() * (edadMaxima - edadMinima + 1));
}

function obtenerBarrioAleatorio(localidadName) {
  const barrios = DataBarrios[localidadName] || [];
  return barrios.length > 0
    ? obtenerElementoAleatorio(barrios).name
    : localidadName;
}

function generarDomicilio(localidadName) {
  const domicilio = { calle: `Calle ${Math.floor(Math.random() * 100) + 1}` };
  if (localidadName === "Formosa Capital") {
    const tiposDomicilio = ["Edificio", "Vivienda", "Normal"];
    const tipo = obtenerElementoAleatorio(tiposDomicilio);

    if (tipo === "Edificio") {
      domicilio.tipo = "Edificio";
      domicilio.piso = Math.floor(Math.random() * 20) + 1;
      domicilio.depto = Math.floor(Math.random() * 10) + 1;
    } else if (tipo === "Vivienda") {
      domicilio.tipo = "Vivienda";
      domicilio.manzana = Math.floor(Math.random() * 20) + 1;
      domicilio.casa = Math.floor(Math.random() * 100) + 1;
    } else {
      domicilio.tipo = "Normal";
      domicilio.casa = Math.floor(Math.random() * 100) + 1;
    }
    domicilio.barrio = obtenerBarrioAleatorio(localidadName);
  } else {
    domicilio.tipo = "Normal";
    domicilio.casa = Math.floor(Math.random() * 100) + 1;
    domicilio.barrio = obtenerBarrioAleatorio(localidadName);
  }
  return domicilio;
}

function generarAlumno(usedDNIs) {
  const nombre = obtenerElementoAleatorio(
    Math.random() < 0.5 ? DataNombresFemeninos : DataNombresMasculinos
  );
  const apellido = obtenerElementoAleatorio(DataApellidos);
  const localidad = obtenerElementoAleatorio(DataLocalidades);
  const dni = generarDNIaleatorio(usedDNIs);
  const edad = generarEdadAleatoria();

  const nivel =
    Math.random() < 0.3
      ? "Terciario"
      : Math.random() < 0.5
      ? "Primaria"
      : "Secundaria";
  const gradoAño = nivel === "Primaria" ? "Grado" : "Año";
  const modalidad =
    nivel === "Secundaria" && Math.random() < 0.25
      ? obtenerElementoAleatorio(DataModalidadesSecundaria)
      : null;

  const cantidadMaterias =
    nivel === "Primaria" ? 8 : nivel === "Secundaria" ? 12 : 8;

  const notas = {};
  for (let j = 1; j <= cantidadMaterias; j++) {
    notas[`Materia${j}`] = Math.floor(Math.random() * 10) + 1;
  }

  const establecimiento = {
    codigo: nivel === "Primaria" ? 102 : nivel === "Secundaria" ? 103 : 115,
    nombre: `Escuela ${dni}`,
  };

  const domicilio = generarDomicilio(localidad.name);

  return {
    _id: dni,
    nombres: nombre,
    apellidos: apellido,
    genero: Math.random() < 0.5 ? "Femenino" : "Masculino",
    localidad: localidad,
    domicilio: domicilio,
    edad: edad,
    nivel: nivel,
    [gradoAño]: Math.floor(Math.random() * (nivel === "Primaria" ? 6 : 7)) + 1,
    modalidad: modalidad,
    notas: notas,
    establecimiento: establecimiento,
  };
}

async function guardarAlumnos() {
  const usedDNIs = new Set();
  const alumnos = [];

  for (let i = 0; i < 10000; i++) {
    alumnos.push(generarAlumno(usedDNIs));
  }

  try {
    await fs.writeFile("alumnos.json", JSON.stringify(alumnos, null, 2));
    console.log(
      "Los documentos JSON de los alumnos se han generado y guardado exitosamente en el archivo 'alumnos.json'."
    );
  } catch (error) {
    console.error("Ocurrió un error al guardar los alumnos:", error.message);
  }
}

guardarAlumnos();
