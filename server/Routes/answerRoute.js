import express from 'express';
import AnswersController from '../Controller/AnswerController';

const router = express.Router();
const AnswerController = new AnswersController();

router.post('/send-answer/', (req, res) => {
    AnswerController.AskAnswer(req, res);
});

router.get('/all-answer', (req, res) => {
    AnswerController.GetAllAnswer(req, res);
});

//= =========== get question by ID ================

router.post('/all-answer/likes', (req, res) => {
    AnswerController.Like(req, res);
});

export default router;