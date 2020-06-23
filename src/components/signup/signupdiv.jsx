import React from "react";
import "./signupdiv.css";

// import { Redirect } from 'react0-router-dom';
// import history from './history';
// import axios from "axios";

// const { pool, Client } = require('pg');

class SignupDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "",
            stname: "",
            password: "",
            cpassword: "",
            isteacher: true,
            namearray: [],
            image: null,
            imge: false,
            file: null
        };
    }

    render() {
        return (
            <form className="signup">
                Name
                <br />
                <input
                    className="form-alignment"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={e => this.handleChange(e)}
                />
                <br />
            Email
                <br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <div className="col-25">
                    <label htmlFor="fname">Create an account as ?</label>
                </div>
                <div className="col-75">
                    <select id="role" className="selectstyle" name="role">
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>

                    </select>
                </div>
                <br />
            Password
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
            Confirm Password
                <br />
                <input
                    type="password"
                    id="confirm"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <button
                    className="buttonstyle"
                    id="send"
                    onClick={e => {
                        this.signup(e);
                    }}
                >
                    Signup
            </button>
                <br />
                <div className="buttins">
                    <p className="para">Have an account?</p>
                    <button className="buttonstyle">
                        <a className="line" href="/">
                            Login
                </a>
                    </button>
                </div>
            </form>)
    }
}
export default SignupDiv;