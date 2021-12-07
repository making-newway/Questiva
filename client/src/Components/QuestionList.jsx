/* eslint-disable array-callback-return */
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatIcon from '@material-ui/icons/Chat';
import React, { useEffect, useState } from 'react'
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../Style/QuestionList.css';


const QuestionList = () => {

    const [questions, setQuestion] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/all-questions')
            .then(res => {
                console.log(res.data);
                setQuestion(res.data);
            })
    }, []);

    const like = (id) => {
        const form = new FormData();
        form.append('id', id);

        axios.post('/api/likes')
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className='QuestionList'>
                <div id='QuestionSearch' style={{ marginTop: '20px' }}>
                    <div className="QuestionBox_inputField">
                        <input type="text" placeholder="Search for a question" className="QuestionBox_inputfield" id="searchBar" onChange={(e) => setSearch(e.target.value)} value={search} />
                    </div>
                </div>

                {questions && (
                    <div className='Questions'>
                        {questions.filter((val) => {
                            if(search === '') return val;
                            else if (val.question.toLowerCase().includes(search.toLowerCase())) return val
                        }).map((question) => {
                            return (
                                <div className="question">
                                    <div className="question__profile">
                                        <Avatar src={question.owner_image} alt="User Profile" />
                                        <h4>{question.owner}</h4>    
                                    </div>

                                    <div className="question__info">
                                        <div className="question__question">
                                            <h4 style={{ fontWeight: '600' }}>
                                                {question.question}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="question__stats">
                                        <div className="likes" style={{ cursor: 'pointer' }}>
                                            <ThumbUpIcon onClick={() => like(question._id)} />
                                            <h4>{question.upvotes}</h4>
                                        </div>
                                        <Link className="comments" style={{ textDecoration: 'none', color: 'white' }} to={`/questions/${question._id}`}>
                                            <div className="comments" style={{ cursor: 'pointer', textDecoration: 'none' }} >
                                                <ChatIcon />
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            );
                        }).reverse()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default QuestionList;