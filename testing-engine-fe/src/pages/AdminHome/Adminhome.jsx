import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useEffect } from 'react';
import history from '../../history';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemText from '@material-ui/core/ListItemText';
import './Adminhome.css';
import Axios from 'axios';
import swal from 'sweetalert';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    hide: {
        display: 'none',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));



function AdminHome(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [Button, setButton] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [Subjectid, setSubjectid] = React.useState(0);
    const [Accessarray, setAccessarray] = React.useState([]);
    const [Assignarray, setAssignarray] = React.useState([]);
    const [Subjectarray, setSubjectarray] = React.useState([]);
    const [Accessview, setAccessview] = React.useState(false);
    const [Assignview, setAssignview] = React.useState(false);
    const accessset = () => {
        setAccessview(true);
    }
    const assignset = () => {
        setAssignview(true);
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const provideaccess = (id) => {
        console.log(id);
        Axios.post(`http://localhost:5000/admin/provideaccess`, { studentid: id })
            .then(res => {
                console.log(res.data.success);
                if (res.data.success === true) {
                    swal("user Authorized", "Account Activated", "success");

                }
            })
    }
    const assignsubject = (id, subject) => {
        console.log(id, subject)
        Axios.post(`http://localhost:5000/admin/assignsubject`, { studentid: id, subject: subject })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    swal("Subject Assigned", "user can attend the test now", "success");
                }
            })
    }
    const handleselect = (event) => {
        setSubjectid(event.target.value)
        console.log(event.target.value, Subjectid);

    }
    const logout = () => {
        localStorage.removeItem('admin')
        localStorage.removeItem('user');
        props.history.push('/')
    }
    useEffect(() => {
        Axios.get(`http://localhost:5000/admin/getaccesslist`)
            .then(res => {
                console.log(res.data.data);
                setAccessarray(res.data.data);
                // console.log(Commentarray);
            })
        Axios.get(`http://localhost:5000/admin/getassignlist`)
            .then(res => {
                console.log(res.data.data);
                setAssignarray(res.data.data);
                // console.log(Answerarray);
            })
        Axios.get(`http://localhost:5000/admin/getsubject`)
            .then(res => {
                console.log(res.data.data);
                setSubjectarray(res.data.data);

            })

    }, [])
    return (
        <div>
            <div className='drawersetup'>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Testing Engine
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            < AccountCircleIcon />  Admin
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div className="listset">
                        <button className="buttonlist" onClick={e => accessset()}>< AccountCircleIcon /><span>Student Access</span></button>
                    </div>
                    <div className="listset">
                        <button className="buttonlist" onClick={e => assignset()}>< AssignmentTurnedInIcon /><span>Subject Assignment</span></button>
                    </div>
                    <div className="listset">
                        <button className="buttonlist" onClick={e => logout()}>Logout</button>
                    </div>
                </Drawer>
                <div>
                    {Accessview ?
                        <table id="customers">
                            <thead>
                                <tr class="w3-light-grey">
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Provide Access</th>
                                </tr>
                            </thead>
                            {Accessarray.map((data) => (<tr>
                                <td>{data.student_id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td><button onClick={e => provideaccess(data.student_id)}>Authorize</button></td>
                            </tr>))}
                        </table> : <></>
                    }
                    {Assignview ?
                        <table id="customers">
                            <thead>
                                <tr class="w3-light-grey">
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Assign Subject</th>
                                    <th>Submit</th>
                                </tr>
                            </thead>
                            {Assignarray.map((data) => (<tr>
                                <td>{data.student_id}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td><select id="subject" name="subject" value={Subjectid} onChange={e => handleselect(e)}>
                                    {Subjectarray.map((datas) => (<option value={datas.subject_id}>{datas.subject_name}</option>))}
                                </select>
                                </td>
                                <td><button onClick={e => assignsubject(data.student_id, Subjectid)}>Submit</button></td>
                            </tr>))}
                        </table> : <></>

                    }

                </div >
            </div>
        </div >
    )
}
export default withRouter(AdminHome);