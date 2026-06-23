export type Intent =
  | "CHEAT_REQUEST"
  | "STUDY_HELP"
  | "NORMAL_QUESTION";

export class QuestionPolicy {

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
      q.includes("como estudiar") ||
      q.includes("explica") ||
      q.includes("explicame") ||
      q.includes("explícame") ||
      q.includes("ayúdame a entender") ||
      q.includes("ayudame a entender") ||
      q.includes("que es") ||
      q.includes("qué es") ||
      q.includes("temas del curso") ||
      q.includes("prepararme") ||
      q.includes("quiero estudiar") ||
      q.includes("necesito estudiar") ||
      q.includes("ayudame a estudiar") ||
      q.includes("ayúdame a estudiar") ||
      q.includes("preparar el examen") ||
      q.includes("prepararme para el examen")
    ) {
      return "STUDY_HELP";
    }

    return "NORMAL_QUESTION";
  }

}
