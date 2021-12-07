import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from '../axios';
import '../Style/Form.css';

const Signin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const signin = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);

        try {
            const response = await axios.post('/user/signin', form);
            
            const { status } = response;

            if (status === 200) {
                history.push('/');
            }
        } catch (err) {
            alert(err.res.data.msg);
        }
    }

    return (
        <div className="background row">
            <div className="col col-sm-0 col-md-6" />
            <Container className="col col-sm-12 col-md-4">
                <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar style={{ margin: '8px', backgroundColor: '#dc004e' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </div>

                <div><h1>Sign In</h1></div>

                <Form style={{ width: '100%', marginTop: '8px' }} noValidate onSubmit={signin}>
                    <FormGroup row>
                        <Label htmlFor='username' sm={2}>Username</Label>
                        <Input type='text' name='username' required autoComplete='username' onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    
                    <FormGroup row>
                        <Label htmlFor='password' sm={2}>Password</Label>
                        <Input type='password' name='password' required autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>

                    <Button type='submit' color='light' style={{ marginTop: '12px' }}>Sign in</Button>

                    <div style={{ marginTop: '12px' }}>
                        <Link to='/signup'>Don't have an account ? Sign Up</Link>
                    </div>
                </Form>
            </Container>
            <div className="col col-sm-0 col-md-2" />
        </div>
    )
}

export default Signin
