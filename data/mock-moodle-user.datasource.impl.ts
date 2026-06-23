import type { MoodleUser, MoodleUserDatasource } from "../contracts/moodle-users.datasource";


export class MockMoodleUserDatasourceImpl implements MoodleUserDatasource {

    private users: MoodleUser[] = [

        /* =========================
           👨‍💻 USUARIO 1 - FULL STACK
        ========================== */
        {
            id: 1,
            fullname: "Juan Perez",
            email: "juan@test.com",
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
                        "Clean Architecture"
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

        /* =========================
           👩‍🔬 USUARIO 2 - DATA SCIENCE
        ========================== */
        {
            id: 2,
            fullname: "Maria Gomez",
            email: "maria@test.com",
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

        /* =========================
           👨‍🎓 USUARIO 3 - PRINCIPIANTE
        ========================== */
        {
            id: 3,
            fullname: "Carlos Lopez",
            email: "carlos@test.com",
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
        }
    ];

    getUserById(id: number): MoodleUser | undefined {
        return this.users.find(user => user.id === id);
    }

    getAllUsers(): MoodleUser[] {
        return this.users;
    }
}