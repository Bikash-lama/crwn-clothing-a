import { useState } from 'react';

import { 
    signInWithGooglePopup ,
    signInAuthWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../../components/button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(email, password);
            resetFormFields();

        } catch(error) {
            switch(error.code) {
                case 'auth/wrong_password':
                    alert('Incorrect password')
                    break;
                case 'auth/user-not-found': 
                    alert("Email does not Exist")
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span> Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label="email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                />

                <FormInput 
                    label="password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />
                <div className="buttons-container">
                    <Button type="submit"> Sign In</Button>   
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}> Google Sign in</Button> 
                </div>    
            </form>
        </div>
    )
}
export default SignInForm