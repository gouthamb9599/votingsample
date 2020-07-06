import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';
import Axios from 'axios';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawer(props) {
    const classes = useStyles();
    const [camp, setCamp] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [date, setDate] = React.useState('');
    const [start, setStart] = React.useState('07:30');
    const [end, setEnd] = React.useState('07:30');
    const [selectedfile, setSelectedfile] = React.useState(null);
    const [campname, setCampname] = React.useState('');
    const [newname, setNewname] = React.useState('');
    const [newemail, setNewemail] = React.useState('');
    const [refmail, setRefmail] = React.useState('');
    const [image, setImage] = React.useState('');
    const [user, setUser] = React.useState(0);
    const [apply, setApply] = React.useState([]);
    const [candidatelist, setCandidatelist] = React.useState([]);
    const [polldata, setPollData] = React.useState([]);
    const [openpoll, setOpenpoll] = React.useState(false);
    const [opencandidatelist, setOpencandidatelist] = React.useState(false);
    const [viewcamps, setViewcamps] = React.useState(false);
    const [choosecamp, setChoosecamp] = React.useState(0);
    const [verify, setVerify] = React.useState(false);
    const [vote, setVote] = React.useState(false);
    const handlerefemail = (event) => {
        setRefmail(event.target.value);
    }
    const getcandidates = () => {
        Axios.get(`http://localhost:5000/getcandidates`).then(res => {
            console.log(res);
            if (res.data.success === true) {
                setCandidatelist(res.data.data);
                setOpencandidatelist(!opencandidatelist);
            }

        })
    }
    const applies = () => {
        Axios.get(`http://localhost:5000/getcamp`)
            .then(res => {
                if (res.data.success === true) {
                    setApply(res.data.data);
                    setViewcamps(!viewcamps);
                }
            })
    }
    const verifier = () => {
        setVerify(false);
        Axios.get(`http://localhost:5000/getimage?email=${refmail}`)
            .then(res => {
                if (res.data.success === true) {
                    console.log(res.data.data);
                    setUser(res.data.data.id);
                    setImage(res.data.data.image);
                    Axios.get(`http://localhost:5000/getcamp`)
                        .then(res => {
                            if (res.data.success === true) {
                                setApply(res.data.data);
                            }
                        })

                }
            })
        setVote(!vote);
    }
    const openverify = () => {
        setVerify(!verify);
    }
    const opencamp = () => {
        setCamp(!camp);
    }
    const openreg = () => {
        setRegister(!register);
    }
    const fileChangedHandler = event => {
        getBase64(event.target.files[0], (result) => {
            setSelectedfile(result);
        });
    }
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const registers = () => {
        console.log(selectedfile, newemail, newname);
        Axios.post(`http://localhost:5000/user`, { image: selectedfile, name: newemail, email: newemail })
            .then(res => {
                if (res.data.success === true) {
                    swal('voter registered successfully', 'report an hour early to vote', 'success');
                    setNewemail('')
                    setNewname('')
                    setSelectedfile('')

                }
            })
    }

    const createcamp = () => {
        console.log(campname, date, start, end);
        Axios.post('http://localhost:5000/createcamp', { name: campname, date: date, start: start, end: end })
            .then(res => {
                if (res.data.success === true) {
                    swal('Campaign created successfully', 'register and validate voters', 'success');
                    setCampname('');
                    setDate('');
                    setStart('');
                    setEnd('');

                }
            })

    }
    const setcampforcandidate = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'))
        console.log(data.data.data);
        console.log(choosecamp);
        Axios.post(`http://localhost:5000/setcampuser`, { id: data.data.data.id, camp: choosecamp })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    const value = res.data.data
                    console.log(value);
                    swal('Campaign choosen successfully', `campaign starts on ${value[0].date} time ${value[0].startingtime}`, 'success');
                }
            })
    }
    const givevote = (id) => {
        Axios.post(`http://localhost:5000/givevote`, { candidateid: id, userid: user, campid: choosecamp })
            .then(res => {
                if (res.data.success === true) {
                    swal('user voted successfully', 'verify the next user', 'success');
                }
            })
    }
    const setcampforuser = () => {
        Axios.post(`http://localhost:5000/setcampca`, { id: user, camp: choosecamp })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    const value = res.data.data
                    console.log(value);
                    setPollData(res.data.data)
                    setVote(false);
                    setOpenpoll(true);
                }
            })
    }
    const handlecamp = (event) => {
        console.log(event.target.value);
        setChoosecamp(event.target.value);
    }
    const handleChange = (event) => {
        setCampname(event.target.value);
    }
    const handledatechange = (event) => {
        console.log(event.target.value);
        setDate(event.target.value)
    }
    const handlestartchange = (event) => {
        console.log(event.target.value);
        setStart(event.target.value)
    }
    const handleendchange = (event) => {
        console.log(event.target.value);
        setEnd(event.target.value)
    }
    const handlesetemail = (event) => {
        setNewemail(event.target.value)
    }
    const handlesetname = (event) => {
        setNewname(event.target.value)
    }

    return (
        <div>{props.admin ? <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        VOTE TODAY
  </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button onClick={() => openreg()} key='register candidate'>
                        <ListItemText primary='register candidate' />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => opencamp()} key='create campaign'>
                        <ListItemText primary='create campaign' />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => openverify()} key='Verify and vote'>
                        <ListItemText primary='Verify and vote' />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => getcandidates()} key='Candidates List'>
                        <ListItemText primary='Candidates List' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={props.logout} key='Logout'>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </List>


            </Drawer>

        </div> : <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            VOTE TODAY
  </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button onClick={applies} key='apply for election'>
                            <ListItemText primary='apply for election' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={viewresult} key='view results'>
                            <ListItemText primary='view results' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={props.logout} key='Logout'>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </List>
                </Drawer>
            </div>}
            <div>
                {viewcamps ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <InputLabel id="demo-simple-select-label">Select Campaign</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={choosecamp}
                        onChange={handlecamp}
                    >
                        {apply.map(data => (<MenuItem value={data.id}>{data.name}</MenuItem>))}

                    </Select>
                    <button
                        className="buttonstyle"
                        id="send"
                        onClick={setcampforcandidate}>
                        Select Election
            </button>

                </div> : <></>}
            </div>
            <div>
                {camp ? <div>
                    <div className="signupmain">
                        <p className="page-tag">Campaign Creation</p>
                        <div className="signupset" align="center">

                            <input
                                className="form-alignments"
                                type="text"
                                id="name"
                                name="campaignname"
                                placeholder="Campaign Name"
                                className="form-alignments"
                                onChange={handleChange}
                            />
                            <TextField
                                id="date"
                                label="Campaign Date"
                                type="date"
                                defaultValue="05-02-2020"
                                format="dd/mm/yyyy"
                                className={classes.textField}
                                onChange={handledatechange}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                            <TextField
                                id="time"
                                label="Campaign Starting Time"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handlestartchange}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                id="time"
                                label="Campaign Ending Time"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleendchange}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <button
                                className="buttonstyle"
                                id="send"
                                onClick={createcamp}>
                                Create Campaign
            </button>
                        </div>
                    </div>


                </div> : <></>}
            </div>
            <div>
                {register ?
                    <div id="login" style={{ marginTop: '100px', marginLeft: '250px' }}>
                        <div className="col-75">
                            <input
                                className="form-alignment"
                                type="text"
                                id="name"
                                name="votername"
                                placeholder="Voter Name"
                                onChange={handlesetname}
                            />
                        </div>
                        <div className="col-75">
                            <input
                                className="form-alignment"
                                type="email"
                                id="email"
                                name="voteremail"
                                placeholder="Voter emails"
                                onChange={handlesetemail}
                            />
                        </div>
                        <input type="file" onChange={fileChangedHandler} /><br />
                        <button
                            className="buttonstyle"
                            id="register"
                            onClick={registers}
                        >
                            Register User
            </button>

                    </div> : <></>}
            </div>
            <div>
                {verify ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <input
                        className="form-alignment"
                        type="email"
                        id="email"
                        name="voteremail"
                        placeholder="Voter emails"
                        onChange={handlerefemail}
                    />
                    <button
                        className="buttonstyle"
                        id="register"
                        onClick={verifier}
                    >
                        Verify
            </button>
                </div> : <></>}

            </div>
            <div>
                {vote ? <div style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <img src={image} alt="user image"></img>
                    <InputLabel id="demo-simple-select-label">Select Campaign</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={choosecamp}
                        onChange={handlecamp}
                    >
                        {apply.map(data => (<MenuItem value={data.id}>{data.name}</MenuItem>))}

                    </Select>
                    <button
                        className="buttonstyle"
                        id="register"
                        onClick={setcampforuser}
                    >
                        Vote
            </button>

                </div> : <></>}
            </div>
            <div>
                {opencandidatelist ? <table style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>

                    {candidatelist.map(data => (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                        </tr>
                    ))}


                </table> : <></>}
            </div>
            <div>
                {openpoll ? <table style={{ marginTop: '100px', marginLeft: '250px' }}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Vote</th>
                    </tr>
                    {polldata.map(data => (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td><button className="buttonstyle"
                                id="vote"
                                onClick={() => givevote(data.id)}>Vote the candidate</button></td>
                        </tr>
                    ))}
                </table> : <></>}
            </div>
        </div>
    );

}
