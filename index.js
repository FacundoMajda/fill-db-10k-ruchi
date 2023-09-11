//@ts-check
import fs from "fs/promises";
import { writeFile } from "fs";

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
  { name: "Clorinda" },
  { name: "Laguna Blanca" },
  { name: "General Belgrano" },
];

const DataBarriosColorado = [];
const DataBarriosBelgrano = [];
const DataBarriosLagBlanca = [];
const DataBarriosClorinda = [];

const DataBarriosFsa = [
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
];

//asd
const DataModalidadesSecundaria = [
  "Cs. Sociales",
  "Cs. Naturales",
  "Produccion de Bienes y Servicios",
];
function obtenerElementoAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generarDNIaleatorio() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

function generarEdadAleatoria() {
  const edadMinima = 18;
  const edadMaxima = 100;
  return Math.floor(edadMinima + Math.random() * (edadMaxima - edadMinima + 1));
}

function generarAlumnos() {
  const alumnos = [];

  for (let i = 0; i < 10000; i++) {
    const nombre = obtenerElementoAleatorio(
      i % 2 === 0 ? DataNombresFemeninos : DataNombresMasculinos
    );
    const apellido = obtenerElementoAleatorio(DataApellidos);
    const localidad = obtenerElementoAleatorio(DataLocalidades);
    const dni = generarDNIaleatorio();
    const edad = generarEdadAleatoria();

    const nivel =
      i % 3 === 0 ? "Terciario" : i % 2 === 0 ? "Primaria" : "Secundaria";
    const gradoAño = nivel === "Primaria" ? "Grado" : "Año";
    const modalidad =
      nivel === "Secundaria" && i % 4 === 0
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
      nombre: `Escuela ${i + 1}`,
    };

    const alumno = {
      _id: dni,
      nombres: nombre,
      apellidos: apellido,
      genero: i % 2 === 0 ? "Femenino" : "Masculino",
      localidad: localidad,
      domicilio: {
        barrio: localidad,
        calle: `Calle ${i + 1}`,
        casa: i + 1,
      },
      edad: edad,
      nivel: nivel,
      [gradoAño]: (i % (nivel === "Primaria" ? 6 : 7)) + 1,
      modalidad: modalidad,
      notas: notas,
      establecimiento: establecimiento,
    };

    alumnos.push(alumno);
  }

  return alumnos;
}

async function guardarAlumnos() {
  try {
    const alumnos = generarAlumnos();
    const alumnosJSON = JSON.stringify(alumnos, null, 2);

    await fs.writeFile("alumnos.json", alumnosJSON);
    console.log(
      "Los documentos JSON de los alumnos se han generado y guardado exitosamente en el archivo 'alumnos.json'."
    );
  } catch (error) {
    console.error("Ocurrió un error al guardar los alumnos:", error);
  }
}

guardarAlumnos();
