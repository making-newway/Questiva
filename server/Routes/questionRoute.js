const router = require('express').Router();
const { askQuestion, getAllQuestion, getQuestionById, sendAnswer, getAllAnswer, likeQuestion, likeAnswer } = require('../Controllers/QuestionControl');

router.post('/ask-question', askQuestion);
router.get('/all-questions', getAllQuestion);
router.get('/questions/:id', getQuestionById);
router.post('/send-answer/:id', sendAnswer);
router.get('/all-answer/:id', getAllAnswer);
router.post('/likes', likeQuestion);
router.post('/answers/likes/:id', likeAnswer);

module.exports = router;