import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import axios from '../axios';
import '../Style/Form.css'
import { IconButton } from '@material-ui/core';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [yearPassout, setYearPassout] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [image, setImage] = useState('');

    const ip = useRef(null);

    const history = useHistory();

    const handleUploadClick = e => {
        var file = e.target.files?.[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
    
        reader.onloadend = (event) => {
            setImage([reader.result])
        }
        console.log(url);
        setImage(file);

      };

    const signup = async (e) => {
        
        e.preventDefault();

        const form = new FormData();
        form.append('username', username);
        form.append('password', password);
        form.append('email', email);
        form.append('department', department);
        form.append('yearPassOut', yearPassout);
        form.append('linkedin', linkedin);
        form.append('image', image);

        try {
            const res = await axios.post('/user/signup', form);

            const { data, status } = res;

            if(status === 201) {
                alert(data.msg);
                history.push('/signin');
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="background row">
            <div className="col col-sm-0 col-md-2" />
            <Container className="col col-sm-12 col-md-8">

                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}><h1>Sign Up</h1></div>

                <Form style={{ width: '100%', marginTop: '8px' }} noValidate onSubmit={signup}>
                    <FormGroup style={{alignItems: 'center', margin: '0'}}>
                        <input type='file' name='image' style={{display: 'none'}} ref={ip} accept='image/*' onChange={(e) => handleUploadClick(e)} />
                        <Label htmlFor='image' sm={2}>
                            <IconButton onChange={(e) => ip.current.focus()}>
                                <Avatar src={image} style={{ margin: "10px", width: "60px", height: "60px" }} />
                            </IconButton>
                        </Label>
                    </FormGroup>
                    
                    <Row>
                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='username' sm={2}>Username</Label>
                            <Input type='text' name='username' required autoComplete='username' onChange={(e) => setUsername(e.target.value)} />
                        </FormGroup>
                        
                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='password' sm={2}>Password</Label>
                            <Input type='password' name='password' required autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='email' sm={2}>Email</Label>
                            <Input type='email' name='email' required autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='department' sm={2}>Department</Label>
                            <Input type='text' name='department' required autoComplete='department' onChange={(e) => setDepartment(e.target.value)} />
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='yearPassout' sm={4}>Passout Year</Label>
                            <Input type='number' name='yearPassout' required autoComplete='yearPassout' onChange={(e) => setYearPassout(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="col col-sm-9 col-md-6">
                            <Label htmlFor='linkedin' sm={2}>LinkedIn</Label>
                            <Input type='text' name='linkedin' required autoComplete='linkedin' onChange={(e) => setLinkedin(e.target.value)} />
                        </FormGroup>
                    </Row>

                    

                    <Button type='submit' color='primary'>Sign Up</Button>

                    <div>
                        <Link to='/signin'>Already have an account? Sign In</Link>
                    </div>
                </Form>
            </Container>
            <div className="col col-sm-0 col-md-2" />

        </div>
    )
}

export default Signup
