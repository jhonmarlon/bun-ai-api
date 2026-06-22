export type Intent =
  | "CHEAT_REQUEST"
  | "STUDY_HELP"
  | "NORMAL_QUESTION";

export class QuestionGuard {

  classify(question: string): Intent {
    const q = question.toLowerCase();

    // INTENTO DE HACKEAR / COPIAR RESPUESTAS
    if (
      q.includes("respuesta") ||
      q.includes("solucionario") ||
      q.includes("cual es la respuesta") ||
      q.includes("examen resuelto") ||
      q.includes("quiz completo") ||
      q.includes("dame las respuestas") ||
      q.includes("cuestionario resuelto")
    ) {
      return "CHEAT_REQUEST";
    }

    // INTENTO EDUCATIVO
    if (
      q.includes("cómo estudiar") ||
      q.includes("explica") ||
      q.includes("ayúdame a entender") ||
      q.includes("temas del curso") ||
      q.includes("prepararme")
    ) {
      return "STUDY_HELP";
    }

    return "NORMAL_QUESTION";
  }

}