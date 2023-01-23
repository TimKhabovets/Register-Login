import React from 'react';
import axios from 'axios';
import UserStore from '../stores/UserStore';
import withRouter from './utils/withRouter';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isCheckAll: false,
            isCheck: [],
            buttonDisabled: false
        };
        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    goToPage() { 
        
        this.props.navigate('/');
    }

    handleSelectAll = (e) => {
        this.setState({isCheckAll : !this.state.isCheckAll});
        this.setState({isCheck: this.state.users.map(user => `${user.id}`)});
        if(this.state.isCheckAll) {
            this.setState({isCheck : []});
        }
    }

    handleClick  = (e) => {       
        const { id, checked } = e.target;
        this.setState({ isCheck: [...this.state.isCheck, id] });
        if(!checked) {
            this.setState({isCheck : this.state.isCheck.filter((item) => (item !== id))})
        }
    }

    getUsers = async () => {

        const response = await axios.get('http://127.0.0.1:5000/users');
        this.setState({ users: response.data });
    }
    
    deleteUser = async () => {

        try {
            this.state.isCheck.forEach(async id => {await  axios.delete('http://127.0.0.1:5000/users/'+ id)});

            if (this.state.isCheck.includes(`${UserStore.id}`)) {
                this.goToPage();
            }
            this.getUsers();
        }
        catch (error) {
            console.log(error);
        }
    }

    blockUser = async () => {
        try {
            this.state.isCheck.forEach(async id => {await  axios.patch('http://127.0.0.1:5000/users/'+ id, {status: true})});

            if (this.state.isCheck.includes(`${UserStore.id}`)) {
                this.goToPage();
            }
            this.getUsers();
        }
        
        catch (error) {
            console.log(error);
        }
    }

    unblockUser = async () => {
        try {
            this.state.isCheck.forEach(async id => {await  axios.patch('http://127.0.0.1:5000/users/'+ id, {status: false})});
            
            this.getUsers();
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="columns mt-5 is-centered">
                <div className="container columns is-half">
                    <h2 >Hello, {UserStore.name}</h2>
                    <div className="navbar">
                        <button className='button is-primary' onClick={this.unblockUser}>Unblock</button>
                        <button className='button is-info' onClick={this.blockUser}>Block</button>
                        <button className='button is-danger' onClick={this.deleteUser}>Delete</button>
                    </div>
                    <table className='table is-stripes is-fullwidth'>
                        <thead>
                            <tr>
                                <th><input id='selectAll' type="checkbox" name="All" onChange={this.handleSelectAll} checked={this.state.isCheckAll} /></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Register</th>
                                <th>Last log in</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => (
                                <tr key={user.id}>
                                    <td><input type="checkbox" id={`${user.id}`} onChange={(e) => this.handleClick(e)} checked={this.state.isCheck.includes(`${user.id}`)} /></td>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.status}</td>
                                    <td>{user.createdAt.slice(0, -8)}</td>
                                    <td>{user.updatedAt.slice(0, -8)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(UserList);