import { Router } from 'express';
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../repositories/taskRepository.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { boardId } = req.query;
    if (!boardId) {
      res.status(400).json({ message: 'boardId query parameter is required' });
      return;
    }

    const tasks = await listTasks(boardId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await getTask(req.params.id);
    if (!task) {
      res.sendStatus(404);
      return;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteTask(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
