//@ts-check
import fs from "fs/promises";
import { writeFile } from "fs";

//Gracias Dante por la inspiracion
//esquema basico, faltan datos

const DataNombres = [
  "Sofía",
  "Mateo",
  "Valentina",
  "Agustín",
  "Martina",
  "Santiago",
  "Camila",
  "Nicolás",
  "Victoria",
  "Joaquín",
  "Lucía",
  "Facundo",
  "Florencia",
  "Matías",
  "Milagros",
  "Leonardo",
  "Rocío",
  "Tomás",
  "Sol",
  "Emiliano",
  "Fausto",
  "Mauricio",
  "Ruperto",
  "Emilia",
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

const DataBarrios = [
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

function obtenerElementoAleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Función para generar un DNI aleatorio
function generarDNIaleatorio() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

// Función para generar una edad aleatoria entre 18 y 100 años
function generarEdadAleatoria() {
  const edadMinima = 18;
  const edadMaxima = 100;
  return Math.floor(edadMinima + Math.random() * (edadMaxima - edadMinima + 1));
}

function generarDocumentosUnicos() {
  const documentos = new Set();

  while (documentos.size < 10000) {
    const nombre = obtenerElementoAleatorio(DataNombres);
    const apellido = obtenerElementoAleatorio(DataApellidos);
    const barrio = obtenerElementoAleatorio(DataBarrios);
    const dni = generarDNIaleatorio();
    const edad = generarEdadAleatoria();

    const documento = {
      _id: dni,
      nombres: nombre,
      apellidos: apellido,
      domicilio: {
        barrio: barrio.name,
        casa: Math.floor(Math.random() * barrio.houses),
      },
      edad: edad,
    };

    documentos.add(JSON.stringify(documento));
  }

  return Array.from(documentos).map((documento) => JSON.parse(documento));
}

async function guardarDocumentos() {
  try {
    const documentos = generarDocumentosUnicos();
    const documentosJSON = JSON.stringify(documentos);

    await fs.writeFile("documentos.json", documentosJSON);
    console.log(
      "Los documentos JSON se han generado y guardado exitosamente en el archivo 'documentos.json'."
    );
  } catch (error) {
    console.error("Ocurrió un error al guardar los documentos:", error);
  }
}

guardarDocumentos();


//el registro que devuelve se ve algo como esto:
//{"_id":124307767,"nombres":"Fausto","apellidos":"Majda","domicilio":{"barrio":"1° DE MAYO","casa":114},"edad":57},