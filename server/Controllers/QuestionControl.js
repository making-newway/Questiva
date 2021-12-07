const formidable = require('formidable');
const Question = require('../Model/Question');
const jwt = require('jsonwebtoken');
const User = require('../Model/User');

exports.askQuestion = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (error, fields, files) => {
            if(error) return res.status(500).json({ msg: 'Error Happening' })

            const { question } = fields;
            if(!question) return res.status(400).json({ msg: 'Please Ask Your Question' });

            const authToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

            await User.findOne({ _id: authToken._id, 'tokens.token': req.cookies.token })
                    .then(async user => {
                        if(!user) return res.status(201).json({ msg: 'Register or Login first' });

                        const image = user.profileImage;
                        const owner = user.username;

                        const newQuestion = new Question({
                            owner: owner,
                            owner_image: image,
                            question: question
                        });

                        await newQuestion.save()
                                .then(() => res.status(201).json({ msg: 'Question asked' }))
                                .catch(err => res.status(500).json({ msg: err }))
                    })
        })
    } catch (error) {
        return res.status(500).json({msg: 'Error Happening...'})
    }
}

exports.getAllQuestion = async (req, res) => {
    try {
        const data = await Question.find();
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(501).json({ msg: 'Server currently down please try again later' });
    }
}

exports.getQuestionById = async (req, res) => {
    try {
        const currentQuestionId = await Question.findById(req.params.id);
        return res.status(200).json(currentQuestionId);
    } catch (error) {
        return res.status(500).json({ msg: 'Server currently down please try again later' });
    }
}

exports.likeQuestion = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields, files) => {
            if(err) return res.status(500).json({ msg: 'Network Error: Failed to like question' })

            const { id } = fields;
            await Question.findOne({ _id: id })
                    .then(async question => {
                        question.upvotes += 1;
                        await question.save().then(() => {
                            return res.status(200).json({ msg: 'Question Liked' });
                        });
                    })
                    .catch(error => console.log(error));
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Server currently down please try again later' })
    }
}

exports.sendAnswer = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (err, fields) => {
            if(err) return res.status(500).json({ msg: 'Network Error: Could not ask your question' });

            const { id } = req.params;
            const authToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

            await User.findOne({ _id: authToken._id, 'tokens.token': req.cookies.token })
                    .then(async user => {
                        if(!user) return res.status(201).json({ msg: 'Register or Login first' });

                        const image = user.profileImage;
                        const owner = user.owner;

                        const { comments } = fields;
                        if(!comments) return res.status(400).json({ msg: 'A answer has be to be send' });

                        await Question.findOne({ _id: id })
                                .then(async question => {
                                    const comment = {
                                        owner: owner,
                                        owner_image: image,
                                        text: comments
                                    }

                                    question.comments.push(comment);
                                    await question.save().then(() => {
                                        return res.status(200).json({ msg: 'Answer Send' })
                                    })
                                })
                    })
        })
    } catch (error) {
        return res.status(500).json({ msg: 'Error Happening' });
    }
}

exports.getAllAnswer = async (req, res) => {
    const { id } = req.params;

    await Question.findOne({ _id: id})
            .then(ans => {
                const comment = ans.comment;
                return res.status(200).json(comment);
            })
            .catch(err => res.status(500).json({ msg: 'Error Happening' }));
}

exports.likeAnswer = (req, res) => {
    const form = new formidable.IncomingForm();

    try {
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.status(500).json({ msg: 'Network Error: Failed to like question' });
            }

            const { id } = fields;

            const id_q = request.params.id;

            await Question.findOneAndUpdate(
                {
                    _id: id_q,
                    'comments._id': id
                },
                {
                    $inc: {
                        'comments.$.upvotes': 1
                    }
                },
                function (err) {
                    console.log(err);
                });

            return res.status(200).json({ msg: 'Liked' });
        });
    } catch (error) {
        return res.status(500).json({ msg: 'Server currently down please try again later' });
    }
}