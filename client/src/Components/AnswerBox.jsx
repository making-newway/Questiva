import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../Style/QuestionBox.css';
import axios from '../axios';
import { Button, Input } from 'reactstrap';

const AnswerBox = ({ questionID, profileImage, authStatus, username }) => {

    const [answer, setAnswer] = useState('');

    const askAnswer = async () => {
        const form = new FormData();
        form.append('comments', answer);

        try {
            const res = await axios.post(`/api/send-answer/${questionID}/`,form);
            alert(res.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div className="questionBackground">
            <div className="QuestionBox">
                <div className="questionBox_user">
                    <Avatar src={profileImage} alt="user profile" />
                    {authStatus === true
                        ? (
                            <h4 className="user_username">{username}</h4>
                        )
                        : (
                            <h4 className="user_username">
                                No username yet. (Login or Signup)
                            </h4>
                        )}
                </div>

                <div className="QuestionBox_inputField">
                    <Input type='textarea' placeholder="What is your answer ?" className="QuestionBox_inputfield" onChange={(e) => setAnswer(e.target.value)} value={answer} />
                </div>

                <Button type='submit' disabled={authStatus !== true} className="QuestionBox__btn" onClick={askAnswer} >Answer It</Button>
            </div>
        </div>
    );
};

export default AnswerBox;