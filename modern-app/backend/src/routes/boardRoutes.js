import { Router } from 'express';
import { createBoard, getBoardWithColumns, listBoards, reorderColumn } from '../repositories/boardRepository.js';
import { listTasks } from '../repositories/taskRepository.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const boards = await listBoards();
    res.json(boards);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const board = await createBoard(req.body);
    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await getBoardWithColumns(req.params.id);
    if (!board) {
      res.sendStatus(404);
      return;
    }

    board.tasks = await listTasks(req.params.id);
    res.json(board);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/columns/:columnId/reorder', async (req, res, next) => {
  const { id, columnId } = req.params;
  const { newPosition } = req.body;

  try {
    await reorderColumn(id, columnId, Number(newPosition));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
