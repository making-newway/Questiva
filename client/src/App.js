import React, { lazy, Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Preloading from './Components/Preloading';
import axios from './axios';
import { Route, Switch } from 'react-router';

const LazyNavBar = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./Components/Navbar')), 4000)
    });
});

const LazyQuestionBox = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./Components/QuestionBox')), 4000)
    });
});

const LazyQuestionList = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./Components/QuestionList')), 4000)
    });
});

const LazySignUp = lazy(() => import('./Components/Signup'));
const LazySignIn = lazy(() => import('./Components/Signin'));
const LazyQuestionScreen = lazy(() => import('./Components/QuestionScreen'));
const LazyAbout = lazy(() => import('./Components/Home'));
const LazyFind = lazy(() => import('./Components/Find'));

function App() {

    const [authStatus, setAuthStatus] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);

    // whenever anything happens in the "App", useEffect is triggered.

    useEffect(() => {
        axios.get('/user/isSigned')
            .then((res) => {
                setAuthStatus(res.data.authStatus);
                setProfileImage(res.data.profileImage);
                setUsername(res.data.username);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <div className="App">
            <Suspense fallback={<Preloading />}>
            <LazyNavBar profileImage={profileImage} />
                <Switch>
                    <Route path="/signin">
                        <LazySignIn />
                    </Route>

                    <Route path="/signup">
                        <LazySignUp />
                    </Route>

                    <Route path="/questions/:id" render={(props) => (
                        <LazyQuestionScreen authStatus={authStatus} profileImage={profileImage} username={username}
                            {...props} />
                    )} exact />

                    <Route path="/find">
                        <LazyFind />
                    </Route>

                    <Route path="/about">
                        <LazyAbout />
                    </Route>

                    <Route path="/">
                        <div style={{ background: 'rgba(25, 28, 31)' }}>
                            <LazyQuestionBox authStatus={authStatus} profileImage={profileImage} username={username}/>
                            <LazyQuestionList />
                        </div>
                    </Route>

                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
