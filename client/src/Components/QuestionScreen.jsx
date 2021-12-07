import React from 'react';
import QuestionById from './QuestionById';
import AnswerBox from './AnswerBox';
import AnswerList from './AnswerList';

const QuestionScreen = (props) => {

    const questionID = props.match.params.id;
    const authStatus = props.authStatus;
    const profileImage = props.profileImage;
    const username = props.username;

    return (
        <div style={{ background: 'rgba(25, 28, 31)' }}>
            <div />
            <QuestionById style={{ padding: 'rem' }} questionID={questionID} profileImage={profileImage} authStatus={authStatus}/>
            <AnswerBox questionID={questionID} profileImage={profileImage} authStatus={authStatus} username={username}/>
            <AnswerList questionID={questionID} profileImage={profileImage} authStatus={authStatus} />
            <div style={{ padding: '2rem' }} />
        </div>
    )
}

export default QuestionScreen
