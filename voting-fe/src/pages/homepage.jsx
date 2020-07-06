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
        if (sessionStorage.getItem('AdminData') !== null) {
            this.setState({
                admin: true
            })
        }


    }
    logout = () => {
        this.props.history.push('/');
        sessionStorage.clear()
    }
    render() {
        return (<div>
            <Drawer logout={this.logout} admin={this.state.admin}></Drawer>
        </div>)
    }
}
export default Homepage