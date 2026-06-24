import type { Course } from "./course";

export interface Student {
    id: number;
    fullname: string;
    email: string;
    phoneNumber: string;
    courses: Course[];
}
