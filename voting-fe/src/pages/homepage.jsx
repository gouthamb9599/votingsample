import React from 'react';
import Axios from 'axios';
import Drawer from '../components/drawer';
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        }

    }
    componentWillMount() {
        if (localStorage.getItem('AdminData') !== null) {
            this.setState({
                admin: true
            })
        }

    }
    render() {
        return (<div>
            <Drawer admin={this.state.admin}></Drawer>
        </div>)
    }
}
