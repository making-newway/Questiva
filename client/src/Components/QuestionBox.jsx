import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';
import axios from '../axios';
import '../Style/QuestionBox.css'

const QuestionBox = ({ profileImage, authStatus, username }) => {

    const [question, setQuestion] = useState('');

    const askQuestion = async () => {
        const form = new FormData();
        form.append('question', question);

        try {
            const response = await axios.post('/api/ask-question', form);

            alert(response.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
    return (
        <div className='questionBackground'>
            <div className='questionBox'>
                <div className="questionBox_user">
                    <Avatar src={profileImage}
                        alt="user profile" />
                    { authStatus === true
                        ? <h4 className="user_username">{username}</h4>
                        : <h4 className="user_username">No username yet! (login or Signup)</h4>
                    }
                </div>

                <div className='QuestionBox_inputField'>
                    <Input type='textarea'className='QuestionBox_inputfield' placeholder='Ask Your Question' onChange={e => setQuestion(e.target.value)} value={question} />
                </div>

                <Button type='button'  disabled={authStatus !== true} className='QuestionBox__btn' onClick={askQuestion}>Ask Now</Button>
            </div>
        </div>
    )
}

export default QuestionBox;