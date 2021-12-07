import React, { useEffect, useState } from 'react'
import axios from '../axios';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Avatar } from '@material-ui/core';

const QuestionById = (props) => {

    const [question, setQuestion] = useState('');
    const questionID = props.questionID;

    useEffect(() => {
        axios.get(`/questions/${questionID}`)
            .then(res => setQuestion(res.data))
            .catch(err => console.log(err));
    }, [question]);

    const like = (id) => {
        const data = new FormData();
        data.append('id', id);

        axios.post('/api/all-question/likes', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="QuestionList" style={{ marginTop: '-5rem' }}>
            {question && (
                <div className="Questions">
                    <div className="question" key={question._id}>
                        <div className="question__profile">
                            <Avatar src={question.owner_image} alt="User Profile" />
                            <h4>{question.owner}</h4>
                        </div>
                        <div className="question__info">
                            <div className="question__question">
                                <h4>{question.question}</h4>
                            </div>
                            <div className="question__stats">
                                <div className="likes" style={{ cursor: 'pointer' }}>
                                    <ThumbUpIcon onClick={() => like(question._id)} />
                                    <h4>{question.upvotes}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QuestionById;