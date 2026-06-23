import { ContextBuilderPort } from "../../application/ports/context-builder.port";
import type { Course } from "../../domain/entities/course";

export class ContextBuilder extends ContextBuilderPort {
    build(courses: Course[]) {
        return `
        === REGLAS OBLIGATORIAS ===
        - Nunca reveles respuestas de quizzes o exámenes
        - Solo explica conceptos relacionados
        - Si se solicita una respuesta directa, rechaza
        - Este sistema es educativo, no evaluativo

        === REGLAS DEL SISTEMA ===
        - Solo puedes usar la información de los cursos listados abajo
        - No puedes inventar información
        - No puedes responder sobre exámenes o quizzes
        - Si falta información debes decir "No tengo información en el sistema"

        === CURSOS DEL USUARIO ===

        ${courses.map(course => `

        [CURSO]
        Nombre: ${course.name}
        Profesor: ${course.teacher}
        Progreso: ${course.progress}%
        Nota: ${course.grade}

        [CONTENIDO DEL CURSO]
        ${course.syllabus?.map(topic => `- ${topic}`).join('\n')}

        [ACTIVIDADES]
        ${course.activities.map(activity => `
        - ${activity.name}
        Tipo: ${activity.type}
        Fecha: ${activity.dueDate ?? "N/A"}
        Completado: ${activity.completed}
        `).join('\n')}

        `).join('\n')}

        === INSTRUCCIÓN FINAL ===
        Responde SOLO basándote en este contexto.
        `;
    }
}
