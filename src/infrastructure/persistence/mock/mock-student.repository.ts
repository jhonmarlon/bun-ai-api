import type { StudentRepositoryPort } from "../../../application/ports/student-repository.port";
import type { Student } from "../../../domain/entities/student";


export class MockStudentRepository implements StudentRepositoryPort {

    private students: Student[] = [

        {
            id: 1,
            fullname: "Javier Saín Osorno Aguirre",
            email: "javi@test.com",
            phoneNumber: "+573016725898",
            courses: [
                {
                    id: 101,
                    name: "NodeJS Avanzado",
                    teacher: "Carlos Ramirez",
                    progress: 75,
                    grade: 4.2,
                    description: "Backend avanzado con NodeJS, arquitectura y APIs REST.",
                    syllabus: [
                        "NodeJS internals",
                        "Express avanzado",
                        "JWT authentication",
                        "Middleware patterns",
                        "WebSockets",
                        "Clean Architecture",
                        "Microservices",
                        "Testing"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz 1 - Node fundamentals",
                            type: "quiz",
                            completed: true,
                            grade: 4.5,
                            description: "Conceptos básicos de NodeJS y event loop"
                        },
                        {
                            id: 2,
                            name: "Quiz 2 - Express routing",
                            type: "quiz",
                            completed: true,
                            grade: 3.8,
                            description: "Routing, middleware y controladores"
                        },
                        {
                            id: 3,
                            name: "Forum: Arquitectura limpia",
                            type: "forum",
                            completed: true,
                            description: "Discusión sobre separación de capas"
                        },
                        {
                            id: 4,
                            name: "Proyecto Final API REST",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-06-30",
                            description: "Construir API con autenticación JWT"
                        },
                        {
                            id: 5,
                            name: "Proyecto Final Microservices",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-06-30",
                            description: "Arquitectura de microservicios"
                        }
                    ]
                },

                {
                    id: 102,
                    name: "Bases de Datos",
                    teacher: "Laura Martínez",
                    progress: 40,
                    grade: 3.5,
                    description: "Modelado y consultas SQL y NoSQL",
                    syllabus: [
                        "Modelado relacional",
                        "SQL avanzado",
                        "MongoDB",
                        "Indexación",
                        "Optimización"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz SQL básico",
                            type: "quiz",
                            completed: true,
                            grade: 3.0,
                            description: "SELECT, JOIN, WHERE"
                        },
                         {
                            id: 2,
                            name: "Quiz SQL avanzado",
                            type: "quiz",
                            completed: true,
                            grade: 4.8,
                            description: "Operaciones agregadas, subconsultas, vistas"
                        },
                        {
                            id: 2,
                            name: "Taller MongoDB",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-07-10",
                            description: "CRUD en MongoDB"
                        }
                    ]
                }
            ]
        },

        {
            id: 2,
            fullname: "Maria Gomez",
            email: "maria@test.com",
            phoneNumber: "+573001112233",
            courses: [
                {
                    id: 201,
                    name: "Python para Data Science",
                    teacher: "Ana Torres",
                    progress: 90,
                    grade: 4.9,
                    description: "Python aplicado a análisis de datos e IA",
                    syllabus: [
                        "Python básico",
                        "Pandas",
                        "NumPy",
                        "Matplotlib",
                        "Machine Learning básico"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Taller Pandas",
                            type: "assignment",
                            completed: true,
                            grade: 5,
                            description: "Manipulación de DataFrames"
                        },
                        {
                            id: 2,
                            name: "Quiz NumPy",
                            type: "quiz",
                            completed: true,
                            grade: 4.8,
                            description: "Operaciones vectorizadas"
                        },
                        {
                            id: 3,
                            name: "Proyecto visualización",
                            type: "assignment",
                            completed: true,
                            grade: 4.9,
                            description: "Dashboard con matplotlib"
                        }
                    ]
                },

                {
                    id: 202,
                    name: "Machine Learning",
                    teacher: "David Ruiz",
                    progress: 60,
                    grade: 4.2,
                    description: "Modelos predictivos y aprendizaje automático",
                    syllabus: [
                        "Regresión lineal",
                        "Clasificación",
                        "Árboles de decisión",
                        "Overfitting",
                        "Validación cruzada"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz Regresión",
                            type: "quiz",
                            completed: true,
                            grade: 4.0,
                            description: "Modelos lineales"
                        },
                        {
                            id: 2,
                            name: "Proyecto ML",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-07-20",
                            description: "Modelo predictivo de precios"
                        }
                    ]
                }
            ]
        },

        {
            id: 3,
            fullname: "Carlos Lopez",
            email: "carlos@test.com",
            phoneNumber: "+573004445566",
            courses: [
                {
                    id: 301,
                    name: "Introducción a Programación",
                    teacher: "Pedro Sánchez",
                    progress: 20,
                    grade: 2.8,
                    description: "Fundamentos básicos de programación",
                    syllabus: [
                        "Variables",
                        "Condicionales",
                        "Bucles",
                        "Funciones",
                        "Arrays"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz Variables",
                            type: "quiz",
                            completed: true,
                            grade: 3.0,
                            description: "Tipos de datos básicos"
                        },
                        {
                            id: 2,
                            name: "Taller Bucles",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-07-05",
                            description: "For y while loops"
                        },
                        {
                            id: 3,
                            name: "Foro dudas",
                            type: "forum",
                            completed: false,
                            description: "Espacio de preguntas básicas"
                        }
                    ]
                }
            ]
        },

        {
            id: 4,
            fullname: "John Marlon",
            email: "montoyamarlon14@gmail.com",
            phoneNumber: "+573226224623",
            courses: [
                {
                    id: 301,
                    name: "Introducción a Programación",
                    teacher: "Pedro Sánchez",
                    progress: 20,
                    grade: 2.8,
                    description: "Fundamentos básicos de programación",
                    syllabus: [
                        "Variables",
                        "Condicionales",
                        "Bucles",
                        "Funciones",
                        "Arrays"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz Variables",
                            type: "quiz",
                            completed: true,
                            grade: 3.0,
                            description: "Tipos de datos básicos"
                        },
                        {
                            id: 2,
                            name: "Taller Bucles",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-07-05",
                            description: "For y while loops"
                        },
                        {
                            id: 3,
                            name: "Foro dudas",
                            type: "forum",
                            completed: false,
                            description: "Espacio de preguntas básicas"
                        }
                    ]
                }
            ]
        },
   
        {
            id: 4,
            fullname: "Sebastian Moreno Echeverry",
            email: "montoyamarlon14@gmail.com",
            phoneNumber: "+573008959194",
            courses: [
                {
                    id: 301,
                    name: "Introducción a Programación",
                    teacher: "Pedro Sánchez",
                    progress: 20,
                    grade: 2.8,
                    description: "Fundamentos básicos de programación",
                    syllabus: [
                        "Variables",
                        "Condicionales",
                        "Bucles",
                        "Funciones",
                        "Arrays"
                    ],
                    activities: [
                        {
                            id: 1,
                            name: "Quiz Variables",
                            type: "quiz",
                            completed: true,
                            grade: 3.0,
                            description: "Tipos de datos básicos"
                        },
                        {
                            id: 2,
                            name: "Taller Bucles",
                            type: "assignment",
                            completed: false,
                            dueDate: "2026-07-05",
                            description: "For y while loops"
                        },
                        {
                            id: 3,
                            name: "Quiz SQL básico",
                            type: "quiz",
                            completed: true,
                            grade: 3.0,
                            description: "SELECT, JOIN, WHERE"
                        },
                        {
                            id: 3,
                            name: "Foro dudas",
                            type: "forum",
                            completed: false,
                            description: "Espacio de preguntas básicas"
                        }
                    ]
                }
            ]
        }
    ];

    getStudentById(id: number): Student | undefined {
        return this.students.find(student => student.id === id);
    }

    getStudentByPhoneNumber(phoneNumber: string): Student | undefined {
        return this.students.find(student => student.phoneNumber === phoneNumber);
    }

    getAllStudents(): Student[] {
        return this.students;
    }
}
