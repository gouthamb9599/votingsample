import React from "react";
import "./signupdiv.css";
import InputLabel from '@material-ui/core/InputLabel';
// import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
// import { Redirect } from 'react0-router-dom';
// import history from './history';
import axios from "axios";
import swal from 'sweetalert';
// import history from '../../history';

// const { pool, Client } = require('pg');

class SignupDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "",
            password: "",
            cpassword: "",
        };
    }
    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        swal("warning", "You have entered an invalid email address!", "warning")
        return (false)
    }
    signup = (e) => {
        e.preventDefault();
        if (this.state.name === "") {
            swal("warning", "Enter your name", "warning");
        } else if (this.state.email === "") {
            swal('warning', "Enter your Email ID", "warning");
        } else if (this.state.password !== this.state.cpassword) {
            swal("warning", "passwords does not match", "warning");
        } else {
            if (this.state.role === "teacher") {
                const test = this.ValidateEmail(this.state.email);
                axios.post("http://localhost:5000/teacher/signup", { name: this.state.name, email: this.state.email, password: this.state.password }).then(res => {
                    console.log(res);
                    if (res.data.success === true) {
                        console.log('data entered successfully')
                        swal("you have registered successfully", "login into your account", "success")
                        // localStorage.setItem('user', JSON.stringify({ token: res.data.token }));
                        debugger;
                        console.log(res);
                    }
                });

            }
            if (this.state.role === "student") {
                const test = this.ValidateEmail(this.state.email);
                axios.post("http://localhost:5000/student/signup", { name: this.state.name, email: this.state.email, password: this.state.password }).then(res => {
                    if (res.data.success === true) {
                        console.log('data entered successfully')
                        swal("you have registered successfully", "Wait until your access is approved", "success")
                        // localStorage.setItem('user', JSON.stringify({ token: res.data.token }));
                        debugger;
                        console.log(res);

                    }
                    else {
                        console.log(res);
                    }
                });

            }
        }

    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handlechange = (event) => {
        console.log(event.target.value)
        this.setState({ role: (event.target.value) })
    }
    render() {
        return (
            <div>
                <p className="page-tag">SIGNUP</p>
                <div className="signupset" align="center">
                    <form className="signup">
                        <input
                            className="form-alignments"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="form-alignments"
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="form-alignments"
                            onChange={e => this.handleChange(e)}
                        />
                        {/* <div className="col-25">
                        <label htmlFor="fname">Create an account as ?</label>
                    </div>
                    <div className="col-75">
                        <select id="role" className="selectstyle" name="role">
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>

                        </select>
                    </div> */}
                        {/* <div align="center" className="selectset"> */}
                        <InputLabel id="demo-customized-select-label">Create an account as </InputLabel>
                        <Select
                            id="demo-customized-select-native"
                            value={this.state.role}
                            onChange={this.handlechange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"teacher"}>Teacher</MenuItem>
                            <MenuItem value={"student"}>Student</MenuItem>
                        </Select>
                        {/* </div> */}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="form-alignments"
                            onChange={e => this.handleChange(e)}
                        />
                        <input
                            type="password"
                            id="confirm"
                            name="cpassword"
                            placeholder="Confirm Password"
                            className="form-alignments"
                            onChange={e => this.handleChange(e)}
                        />
                        <button
                            className="buttonstyle"
                            id="send"
                            onClick={e => {
                                this.signup(e);
                            }}>
                            Signup
            </button>
                        <div className="buttins">
                            <p className="para">Have an account?</p>
                            <button className="buttonstyle">
                                <a className="line" href="/">
                                    Login</a>
                            </button>
                        </div>
                    </form>
                </div>
            </div>)
    }
}
export default SignupDiv;