const formidable = require("formidable");
const Answer = require("../Model/Answers");
const Question = require("../Model/Question");

class AnswerController {

    AskAnswer (req, res) {
        const form = new formidable.IncomingForm();

        try {
            form.parse(req, async (error, fields) => {
                if (error) {
                    return res.status(500).json({ msg: 'Network Error: Could not ask your answer' });
                }

                const { answer } = fields;

                if (!answer) {
                    return res.status(400).json({ msg: 'A answer has to be asked' });
                }

                const userSession = req.session.user || false;

                if (userSession) {
                    const owner_image = userSession.profileImage;
                    const owner = userSession.username;

                    const newAnswer = new Answer({
                        owner: owner,
                        owner_image: owner_image,
                        answer: answer
                    });

                    await newAnswer.save()
                    .then(() => {
                        return res.status(201).json({ msg: 'Answer Asked' });
                    })
                    .catch(err => {
                        return res.status(500).json({ msg: 'Error Created' });
                    });
                    
                }
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Server currently down please try again later' });
        }
    }

    async GetAllAnswer (req, res) {
        try {
            const data = await Answer.find();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ msg: 'Server currently down please try again later' });
        }
    }

    async getQuestionById (req, res) {
        try {
            const currentQuestionId = await Answer.findById(req.params.id);
            return res.status(200).json(currentQuestionId);
        } catch (error) {
            return res.status(500).json({ msg: 'Server currently down please try again later' });
        }
    }

    Like (req, res) {
        const form = new formidable.IncomingForm();

        try {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    return res.status(500).json({ msg: 'Network Error: Failed to like question' });
                }

                const { id } = fields;

                await Answer.findOne({ _id: id })
                        then(async answer => {
                            answer.upvotes += 1;
                            await answer.save().then(() => {
                                return res.status(200).json({ msg: 'Liked' });
                            })
                        })
                        .catch(err => {
                            return res.status(200).json({ msg: 'Error' });
                        });

                
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Server currently down please try again later' });
        }
    }

    UniqueQuestionID (req, res) {
        const form = new formidable.IncomingForm();
        try {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    return res.status(500).json({ msg: 'Network Error: Failed to like answer' });
                }

                const { id } = fields;

                await question.findOne({ _id: id })
                        .then(question => {
                            return res.status(200).json({ msg: 'question found' });
                        })
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Server currently down please try again later' });
        }
    }
}

export default AnswerController;
