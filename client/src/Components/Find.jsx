import React, { useEffect, useState } from 'react'
import axios from '../axios';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Card, CardBody, CardHeader, CardImg, CardTitle, Form, Input, Row } from 'reactstrap';
import '../Style/QuestionList.css';
import '../Style/QuestionBox.css';
import '../Style/About.css';

const Find = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('/user/users')
            .then(res => setUsers(res.data))
    }, []);

    return (
        <div style={{ background: 'rgb(12, 17, 24)', paddingTop: '20px' }}>
            <div className="main__content">
                <h1 id="brand2" style={{ marginBottom: '40px', marginTop: '50px', color: '#4a73b5 !important' }}>
            people
                </h1>
            </div>

            <Row>
                <Form style={{ minWidth: '200px', marginTop: '-10px', borderBottom: '2px solid #395177', marginBottom: '20px', background: '#19191c' }}>
                    <Input type='select' value={filter} style={{ color: '#395177' }} onClick={(e) => setFilter(e.target.value)}>
                        <option value=''>Filter Search</option>
                        <option value={1}>Search Username</option>
                        <option value={2}>Search Departmanet</option>
                    </Input>
                </Form>
            </Row>

            <div id="QuestionSearch" style={{ marginTop: '20px', marginBottom: '30px' }}>
                <div className="QuestionBox_inputField" style={{ border: '2px solid #395177 !important' }}>
                    <Input type='text' placeholder='Search after choosing a filter' className='QuestionBox_inputfield' id='searchBar' style={{ border: '2px solid #395177 !important' }} onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
            </div>

            <Row>
                <div className='col col-xs-12 col-sm-12 col-md-12 col-lg-12'></div>

                {filter === 2 ? users.filter((val) => {
                    if(search === '') return val;
                    else if (val.department.toLowerCase().includes(search.toLowerCase())) return val;

                    return null;
                    }).map((user) => {
                        return (
                            <Card>
                                <CardHeader>
                                    <CardImg top width="100" height='100' src={user.profileImage} alt='User Image' style={{ borderRadius: '50%' }} />
                                    <CardTitle style={{ fontWeight: 700, fontSize: '18px', margin: '10px 0px 0px 0px' }}>{user.username}</CardTitle>
                                    <a style={{ textDecoration: 'none', color: 'black' }} href={`mailto:${user.gmail}`} target="_blank" rel='noreferrer'>
                                        <MailIcon className="developer-icon" />
                                    </a>
                                    <a style={{ textDecoration: 'none', color: 'black' }} href={user.linkedin} target="_blank"  rel='noreferrer'>
                                        <LinkedInIcon className="developer-icon" />
                                    </a>
                                </CardHeader>
                                <CardBody id='developer'>
                                    <p style={{ fontSize: '17px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>{user.department} | {user.yearPassout}</div>                                        <br />
                                    </p>
                                </CardBody>
                            </Card>
                        )
                    }) : 
                users.filter((val) => {
                    if (search === '') return val;
                    else if (val.username.toLowerCase().includes(search.toLowerCase())) return val;

                    return null;
                }).map((user) => {
                    return (
                        <Card>
                            <CardHeader>
                                <CardImg top width="100" height='100' src={user.profileImage} alt='User Image' style={{ borderRadius: '50%' }} />
                                <CardTitle style={{ fontWeight: 700, fontSize: '18px', margin: '10px 0px 0px 0px' }}>{user.username}</CardTitle>
                                <a style={{ textDecoration: 'none', color: 'black' }} href={`mailto:${user.gmail}`} target="_blank"  rel='noreferrer'>
                                    <MailIcon className="developer-icon" />
                                </a>
                                <a style={{ textDecoration: 'none', color: 'black' }} href={user.linkedin} target="_blank"  rel='noreferrer'>
                                    <LinkedInIcon className="developer-icon" />
                                </a>
                            </CardHeader>
                            <CardBody id='developer'>
                                <p style={{ fontSize: '17px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>{user.department} | {user.yearPassout}</div>                                        <br />
                                </p>
                            </CardBody>
                        </Card>
                    )
                })}
            </Row>
        </div>
    )
}

export default Find
