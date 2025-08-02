import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function signInWithGoogle() {
        await signInWithGooglePopup();
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetFormFields();
        }
        catch (error) {
            if(error.code === 'auth/invalid-credential') {
                alert('Invalid credentials');
            } else {
                console.log(error);
            }
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value});
    }

    return (
        <div>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form className='sign-in-container' onSubmit={handleSubmit}>
                <FormInput
                    label='email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;