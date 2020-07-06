import React from 'react';
import axios from 'axios'
import './overall.css';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''

        }
    }
    check = (e) => {
        if (this.state.email === 'admin' && this.state.password === 'admin') {
            sessionStorage.setItem("AdminData", 'Admin');
            this.props.history.push('/home')
        }
        axios.post('http://localhost:5000/login', { email: this.state.email, password: this.state.password })
            .then((result) => {
                sessionStorage.setItem("userData", JSON.stringify(result));
                this.props.history.push('/home')
            });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (

            <div id="login">
                {/* <div className="col-25">
    <label htmlFor="fname">Email</label>
</div> */}
                <div className="col-75">
                    <input type="email" className="form-alignment" name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} /><br /></div>
                {/* <div className="col-25">
    <label htmlFor="fname">Password</label>
</div> */}

                <div className="col-75">
                    <input type="password" className="form-alignment" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} /><br />
                </div>

                <button id="send" className="buttonstyle" onClick={e => this.check(e)}>Login</button>
                <p className="para">New user?</p>
                <button className="buttonstyle"><a className="line" href="/signup">Signup</a></button>
            </div>
        )
    }

}
export default Login;