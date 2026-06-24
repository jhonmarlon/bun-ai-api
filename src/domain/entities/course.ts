import type { CourseActivity } from "./activity";

export interface Course {
    id: number;
    name: string;
    teacher: string;
    progress: number;
    grade: number;
    description: string;
    syllabus: string[];
    activities: CourseActivity[];
}