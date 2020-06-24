import React from 'react';
import SignupDiv from '../../../components/signup/signupdiv'
import './signup.css'



export default function Signup() {

    return (
        <div className="base">
            <div>
                <h3 className="title-tag"> Testing Engine</h3>
            </div>
            <div className="loginmain" >
                <p className="page-tag">SIGNUP</p>
                <div>
                    <SignupDiv></SignupDiv>
                </div>
            </div>
        </div>
    );
}
