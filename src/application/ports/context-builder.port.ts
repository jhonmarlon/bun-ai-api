import type { Course } from "../../domain/entities/course";

export abstract class ContextBuilderPort {
    abstract build(courses: Course[]): string;
}
