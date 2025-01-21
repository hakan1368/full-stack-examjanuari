import { Classroom } from '../model/classroom';
import classroomDb from '../repository/classroom.db';
import { ClassroomInput } from '../types';

const getClassroomByName = async ({ name }: { name: string }): Promise<Classroom> => {
    const classroomPrisma = await classroomDb.getClassroomByName({ name });
    return classroomPrisma;
};

const addClassroom = async ({ name }: ClassroomInput): Promise<Classroom> => {
    const existingClassroom = await classroomDb.getClassroomByName({ name });

    if (existingClassroom) {
        throw new Error(`Classroom with name ${name} already exists.`);
    }

    const classroom = new Classroom({ name });
    return await classroomDb.addClassroom(classroom);
};

export default {
    getClassroomByName,
    addClassroom,
};
