import React from 'react';
import logo from '../Images/logo.svg';

const Preloading = () => {
    return (
        <div className="loading col align-self-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h4>Questiva</h4>
        </div>
    )
}

export default Preloading
