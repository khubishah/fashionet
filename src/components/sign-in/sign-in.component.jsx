import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: ''});
    const { email, password } = userCredentials;
    const handleSubmit = event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({...userCredentials, [name]: value});
    }


        return(
            <div className="sign-in">
                <h2>If you already have a Fashionet account:</h2>
                <span>Sign in with your e-mail and password!</span>
                <form onSubmit={handleSubmit}>
                    <FormInput name="email" value={email} type="email" handleChange={handleChange} label='email' required/>
                    <FormInput name="password" value={password} type="password" handleChange={handleChange} label='password' required/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div>

                </form>
            </div>
        );
}

const mapDispatchToProps = dispatch =>({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);