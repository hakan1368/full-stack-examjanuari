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
 * /classroom:
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
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroomInput = <Classroom>req.body;
        const classroom = await classRoomService.addClassroom(classroomInput);
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /classroom/{name}:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     summary: Get the classroom with the given name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The classroom name
 *     responses:
 *       200:
 *         description: The classroom with the given name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 */
classroomRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
        const classroom = await classRoomService.getClassroomByName({ name });
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
});
export { classroomRouter };
