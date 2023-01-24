import React from 'react';
import InputField from './form/InputField';
import SubmitButton from './form/SubmitButton';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withRouter from './utils/withRouter';
	


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false
        };
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
            email: '',
            password: '',
            buttonDisabled: false
        });
    }

    async doLogin() {

        if (!this.state.email || !this.state.password) {
            return;
        }

        this.setState({
            buttonDisabled: true
        });

        try {

            let res = await axios.get('https://register-login-api.vercel.app/users/' + this.state.email, {
                email: this.state.email,
                password : this.state.password
            });

            let result = await res.data;

            if (result && result.status == 1) {
                alert('User blocked');
                this.resetForm();
            }
            else if (result && res.status == 200) {
                res = await axios.get('https://register-login-api.vercel.app/users/' + this.state.email);
                UserStore.id = res.data.id;
                UserStore.isLoggedIn = true; 
                UserStore.name = res.data.name;

                this.goToPage();
            }
            else {
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
            <div className='loginForm'>
                Log In
                <InputField
                    type='text'
                    placeholder='email'
                    value={this.state.email ? this.state.email : ''}
                    onChange={ (value) => this.setInputValue('email', value) }
                />

                <InputField
                    type='password'
                    placeholder='password'
                    value={this.state.password ? this.state.password : ''}
                    onChange={(value) => this.setInputValue('password', value)}
                />

                <SubmitButton text={'Log In'} disabled={this.state.buttonDisabled} onClick={ () => this.doLogin() } />

                <h3> or <Link to="/register">Sing Up</Link></h3>

            </div>
        );
    }
}
 
export default withRouter(Login);