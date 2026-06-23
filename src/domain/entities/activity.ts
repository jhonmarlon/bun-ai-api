export interface CourseActivity {
    id: number;
    name: string;
    type: 'assignment' | 'quiz' | 'forum' | 'resource';
    completed: boolean;
    dueDate?: string;
    grade?: number;
    description: string;
}