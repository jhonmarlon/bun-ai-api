export interface CourseActivity {
    id: number;
    name: string;
    type: 'assignment' | 'quiz' | 'forum' | 'resource';
    completed: boolean;
    dueDate?: string;
    grade?: number;
    description: string;
}

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

export interface MoodleUser {
    id: number;
    fullname: string;
    email: string;
    courses: Course[];
}

export abstract class MoodleUserDatasource {
    abstract getUserById(id: number): MoodleUser | undefined
    abstract getAllUsers(): MoodleUser[] 
}