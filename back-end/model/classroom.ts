import { User } from './user';
import { Teacher as TeacherPrisma, User as UserPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: { id?: number; name: string }) {
        this.id = classroom.id;
        this.name = classroom.name;
    }

    static from({ id, name }: { id?: number; name: string }): Classroom {
        return new Classroom({ id, name });
    }
}
