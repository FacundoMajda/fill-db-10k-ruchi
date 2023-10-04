import { obtenerNivelEducativo, generarNumeroAleatorio } from "./utils.js";
import { DataMaterias } from "./data.js";
import fs from "fs/promises";

// Función para generar notas para un alumno según el nivel educativo y el año
function generarNotasParaAlumno(alumno) {
  const nivel = obtenerNivelEducativo(alumno.edad);
  const year = new Date().getFullYear() - alumno.edad;

  // Obtén las materias del año del alumno
  const materiasDelAnio = DataMaterias[year] || [];

  // Genera notas aleatorias para cada materia
  const notas = {};
  materiasDelAnio.forEach((materia) => {
    notas[materia] = generarNumeroAleatorio(1, 10);
  });

  return notas;
}

async function generarNotasParaAlumnos(alumnos) {
  const alumnosConNotas = await Promise.all(
    alumnos.map(async (alumno) => {
      const notas = generarNotasParaAlumno(alumno);
      return { id: alumno.id, notas };
    })
  );
  return alumnosConNotas;
}

async function procesarAlumnos() {
  const ALUMNOS_JSON_PATH = "../alumnos.json";
  const OUTPUT_JSON_PATH = "alumnos_con_materias.json";

  try {
    const data = await fs.readFile(ALUMNOS_JSON_PATH, "utf-8");
    const alumnos = JSON.parse(data);
    const alumnosConNotas = await generarNotasParaAlumnos(alumnos);

    await fs.writeFile(
      OUTPUT_JSON_PATH,
      JSON.stringify(alumnosConNotas, null, 2)
    );

    console.log("Notas generadas y guardadas en", OUTPUT_JSON_PATH);
  } catch (error) {
    console.error("Error al procesar el archivo de alumnos:", error);
  }
}

// Llamar a la función para procesar los alumnos
procesarAlumnos();
