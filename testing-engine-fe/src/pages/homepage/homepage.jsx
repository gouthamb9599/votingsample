// import React from 'react';
import { BrowserRouter as withRouter, useHistory } from 'react-router-dom'
import Test from '../../components/createtest/test';
// import Draw from '../../components/Draw/Draw';

import React, { useEffect } from 'react';
// import { useHistory } from "react-router-dom";
import history from '../../history';
// import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './homepage.css';
import Axios from 'axios';
import swal from 'sweetalert';
import Login from '../login_signup/login/login';
// import React from 'react';
import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


function HomeButton() {
    let history = useHistory();
    history.push("/");
}
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            test: false
        }
    }
    handleDrawerOpen = () => {
        this.setState({
            open: !this.state.open
        })
    };
    createtest = (e) => {
        this.setState({
            test: !this.state.test
        })
        console.log(this.state.test);
    }
    render() {
        return (
            <div>
                <div>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer" onClick={e => this.handleDrawerOpen()} edge="start">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" >Testing Engine</Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="persistent" anchor="left" open={this.state.open}>
                        <IconButton onClick={e => this.handleDrawerOpen()}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Divider />
                        <List>
                            <ListItem button onClick={e => this.createtest(e)} key='Create Test'>
                                <ListItemText primary='Create Test' />
                            </ListItem>
                            <ListItem button key='View Test Result'>
                                <ListItemText primary='View Test Result' />
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
                <div>
                    {this.state.test ? <div style={{ marginTop: "100px", marginLeft: "100px", marginRight: "100px", backgroundColor: "white" }} >
                        <Test></Test>
                    </div> : <></>}
                </div>
            </div>
        );
    }
}

export default (Homepage);