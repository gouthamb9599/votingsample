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
                    <ListItem button key='register candidate'>
                        <ListItemText primary='register candidate' />
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem button key='Verify and vote'>
                        <ListItemText primary='Verify and vote' />
                    </ListItem>

                </List>
                <List>
                    <ListItem button key='Logout'>
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
                        <ListItem button key='apply for election'>
                            <ListItemText primary='apply for election' />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key='view results'>
                            <ListItemText primary='view results' />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button key='Logout'>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </List>
                </Drawer>

            </div>}
        </div>
    );

}
