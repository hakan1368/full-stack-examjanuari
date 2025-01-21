import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: { id?: number; name: string }) {
        this.id = classroom.id;
        this.name = classroom.name;
        this.validate(classroom);
    }

    validate(classroom: { name: string }) {
        if (!classroom.name.trim()) {
            throw new Error('Name is required !');
        }
    }

    equals({ id, name }: Classroom): boolean {
        return this.id === id && this.name === name;
    }

    static from({ id, name }: { id?: number; name: string }): Classroom {
        return new Classroom({ id, name });
    }
}
