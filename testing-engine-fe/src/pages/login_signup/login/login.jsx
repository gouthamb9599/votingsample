import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginDiv from '../../../components/login/logindiv';
// import bg from '../../../images/bg.jpg'
import './login.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}{...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Login() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="base">
            <div>
                <h3 className="title-tag"> Testing Engine</h3>
            </div>
            <div className=" loginmain">
                <div className={classes.root}>
                    <Paper >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Student Login" {...a11yProps(0)} />
                            <Tab label="Teacher Login" {...a11yProps(1)} />
                        </Tabs>
                    </Paper>
                    <TabPanel value={value} index={0}>
                        <LoginDiv role={"student"} ></LoginDiv>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <LoginDiv role={"teacher"} ></LoginDiv>
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                Item Three
      </TabPanel> */}
                </div>
            </div>
        </div >
    );
}
