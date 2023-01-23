import React from 'react';
import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router-dom';
import withRouter from './utils/withRouter';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            buttonDisabled: false
        };
        this.goToPage = this.goToPage.bind(this);
    }

    goToPage() { 
        
        this.props.navigate('/userlist');
    }

    setInputValue(key, value) {
        value = value.trim();

        this.setState({
            [key]: value
        });
    }

    resetForm() {
        this.setState({
            username: '',
            email: '',
            password: '',
            buttonDisabled: false
        });
    }

    async doRegister() {

        if (!this.state.email || !this.state.password || !this.state.username) {
            return;
        }

        this.setState({
            buttonDisabled: true
        });

        try {

            let res = await axios.post('https://register-login-api.vercel.app/api/users', {
                name : this.state.username,
                email: this.state.email,
                password : this.state.password
            });

            let result = await res.config.data;

            if (result && res.status == 201) {
                res = await axios.get('https://register-login-api.vercel.app/api/users/' + this.state.email);
                UserStore.id = res.data.id;
                UserStore.isLoggedIn = true; 
                UserStore.name = this.state.username;

                this.goToPage();
            }
            else if (result) {
                alert(result.msg);
                this.resetForm();
            }

        }

        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <div className='registerForm'>
                Register
                <InputField
                    type='text'
                    placeholder='username'
                    value={this.state.username ? this.state.username : ''}
                    onChange={(value) => this.setInputValue('username', value)}
                />
                <InputField
                    type='text'
                    placeholder='email'
                    value={this.state.email ? this.state.email : ''}
                    onChange={(value) => this.setInputValue('email', value)}
                />

                <InputField
                    type='password'
                    placeholder='password'
                    value={this.state.password ? this.state.password : ''}
                    onChange={(value) => this.setInputValue('password', value)}
                />

                <SubmitButton text={'Sing Up'} disabled={this.state.buttonDisabled} onClick={() => this.doRegister()} />

                <h3> or <Link to="/">Log In</Link></h3>
            </div>
        );
    }
}

export default withRouter(Register);