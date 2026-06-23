import type { Student } from "../../domain/entities/student";

export abstract class StudentRepositoryPort {
    abstract getStudentById(id: number): Student | undefined
    abstract getStudentByPhoneNumber(phoneNumber: string): Student | undefined
    abstract getAllStudents(): Student[] 
}
