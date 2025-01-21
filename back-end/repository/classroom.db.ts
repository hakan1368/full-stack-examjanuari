import { Classroom } from '../model/classroom';
import { PrismaClient } from '@prisma/client';
import { ClassroomInput } from '../types';

const database = new PrismaClient();

const addClassroom = async ({ name }: Classroom): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: { name },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const getClassroomByName = async ({ name }: { name: string }): Promise<Classroom | null> => {
    try {
        const classroomPrisma = await database.classroom.findFirst({
            where: { name },
        });
        return classroomPrisma ? Classroom.from(classroomPrisma) : null;
    } catch (error) {
        throw new Error('Database error, see server log for details.');
    }
};

export default {
    addClassroom,
    getClassroomByName,
};
