import React from 'react';
import { Button, Card, CardBody, CardHeader, Container, Row } from 'reactstrap';
import { ReactComponent as ReactLogo } from '../Images/logo.svg';
import { ReactComponent as ReactLogo2 } from '../Images/proud.svg';
import { Link } from 'react-router-dom';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import SecurityIcon from '@material-ui/icons/Security';
import StorageIcon from '@material-ui/icons/Storage';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import '../Style/About.css';

const Home = () => {
    return (
        <div>
            <Container className="main" id="about">
                <div className='col col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <div className="main__content" id="hero">
                        <h2>
                            <h1>Questiva</h1><br />
                            <h4>Have a question that needs to be Answered?</h4>
                            <h4>Wanna connect with amazing people?</h4>
                        </h2>
                        <br />
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/signup">
                            <Button className="redirect">Start Now!</Button>
                        </Link>
                        <h2 style={{ marginTop: '10px' }}>
                            <h4>Scroll down to know more <ArrowDropDownCircleRoundedIcon style={{ color: "#10dad7" }}/> </h4>
                        </h2>
                    </div>
                </div>

                <div className='col col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                    <div className="main-img-container">
                        <ReactLogo className='illustration' />
                    </div>
                </div>

                <div className='col col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className="main__content">
                        <h1 id='brand'>My Quora</h1>
                    </div>
                </div>

                <div className='col col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{ marginTop: '7rem' }}>
                    <div className="main-img-container">
                        <ReactLogo2 className='illustration2' />
                    </div>
                </div>
            </Container>

            <Row>
                <div className='col col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className="main__content">
                        <h1 id="brand" style={{ marginBottom: '40px', marginTop: '20px' }}>Features </h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <h4>Frontend:</h4>
                        <DomainDisabledIcon className="card-icon"/>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <ul>
                                <li> Asking Questions</li>
                                <li> Answering asked Questions</li>
                                <li>read others Answers</li>
                                <li>Up voting Questions and Answers</li>
                            </ul>
                        </p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h4 style={{ fontSize: '25px' }}>Authentication:</h4>
                        <SecurityIcon className="card-icon"/>
                    </CardHeader>

                    <CardBody>
                        <p>
                            <ul>
                                <li>Sign In</li>
                                <li>Sign Up</li>
                                <li>Profile Image uploads</li>
                                <li>Server-Side cookies handling</li>
                            </ul>
                        </p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h4>Backend:</h4>
                        <StorageIcon className="card-icon"/>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <ul>
                                <li>REST API Endpoints architecture</li>
                                <li>No SQL Database Modal</li>
                                <li>Hashing of passwords</li>
                                <li>Storing profile images</li>
                            </ul>
                        </p>

                    </CardBody>
                </Card>
            </Row>

            <Row className='col col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div className='col col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className="main__content">
                        <h1 id="brand" style={{ marginBottom: '40px', marginTop: '0px', fontSize: '2.5rem' }}>Developer</h1>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <h4>Sayan Dey</h4>
                        <a style={{ textDecoration: 'none', color: 'black' }} href="https://github.com/making-newway/" target="_blank" rel="noreferrer">
                            <GitHubIcon className="developer-icon"/>
                        </a>
                        <a style={{ textDecoration: 'none', color: 'black' }} href="www.linkedin.com/in/sayan-dey-950a131a5/" target="_blank" rel="noreferrer">
                            <LinkedInIcon className="developer-icon"/>
                        </a>
                    </CardHeader>
                    <CardBody id="developer">
                        <p>
                            I am a third year student at KGEC, Kalyani, pursuing my B.Tech, in CSE.
                            <br />
                            <br />
                            Full stack web developer
                        </p>

                    </CardBody>
                </Card>
            </Row>
        </div>
    )
}

export default Home
