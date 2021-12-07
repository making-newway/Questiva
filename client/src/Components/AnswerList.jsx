import React, { useEffect, useState } from 'react'
import axios from '../axios';
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const AnswerList = (props) => {

    const [answers, setAnswers] = useState([]);

    const questionID = props.questionID;

    useEffect(() => {
        axios.get(`/api/all-answer/${questionID}/`)
            .then(res => {
                console.log(res.data);
                setAnswers(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const like = (id) => {
        const data = new FormData();
        data.append('id', id);

        axios.post(`/api/answers/likes/${questionID}/`, data, {
                withCredentials: true
            })
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="QuestionList">
            {answers && (
                <div className="Questions">
                    {answers
                        .map((answer) => {
                            return (
                                <div className="question" key={answer._id}>
                                    <div className="question__profile">
                                        <Avatar src={answer.owner_image} alt="User Profile" />
                                        <h4>{answer.owner}</h4>
                                    </div>
                                    <div className="question__info">
                                        <div className="question__question">
                                            <h4>{answer.text}</h4>
                                        </div>
                                        <div className="question__stats">
                                            <div className="likes" style={{ cursor: 'pointer' }}>
                                                <ThumbUpIcon onClick={() => like(answer._id)} />
                                                <h4>{answer.upvotes}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        .reverse()}
                </div>
            )}
        </div>
    )
}

export default AnswerList;