/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *      ClassroomInput:
 *            type: object
 *            properties:
 *               name:
 *                 type: string
 *                 description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express';
import classRoomService from '../service/classroom.service';
import { Classroom } from '@prisma/client';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classroom/add:
 *   post:
 *     security:
 *     - bearerAuth: []
 *     summary: Add a classroom
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       200:
 *         description: Added classroom
 *         content:
 *           application/json:
 *              $ref: '#/components/schemas/Classroom'
 */
classroomRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroomInput = <Classroom>req.body;
        const classroom = await classRoomService.addClassroom(classroomInput);
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
});
export { classroomRouter };
