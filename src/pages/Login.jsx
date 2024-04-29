import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const initialState = {
        email_id: '',
        password: ''
    };
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (formData) => {
        const storedUser = JSON.parse(localStorage.getItem('userDataArr')) || [];
        const user = storedUser.find(u => u.email_id === formData.email_id && u.password === formData.password);

        if (!user) {
            toast.error('Invalid email or password!');
            return;
        }

        localStorage.setItem('loginUser', JSON.stringify(user));
        toast.success('Login successful!');
        navigate('/', { replace: true });
    };

    const onClickHandleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email_id.trim()) {
            toast.error('Email id is required!');
            return;
        }
        if (!formData.password.trim()) {
            toast.error('Password is required!');
            return;
        }

        handleLogin(formData);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-12 offset-md-3 offset-0'>
                    <div className='p-4 mt-5 shadow rounded'>
                        <form onSubmit={onClickHandleSubmit}>
                            <div className='fs-3 mb-3'>Login</div>

                            <div className='form-floating mb-3'>
                                <input type='text' onChange={onChangeHandle}
                                    className='form-control' name='email_id' value={formData.email_id} placeholder='Email ID' />
                                <label htmlFor="floatingInput">Email ID</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='password' onChange={onChangeHandle}
                                    className='form-control' name='password' value={formData.password} placeholder='Password' />
                                <label htmlFor="floatingInput">Password</label>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-secondary px-5 py-2'>Login</button>
                            </div>
                        </form>
                        <span className='text-primary pointer' onClick={() => navigate('/registration', { replace: true })}>Create a new account?</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
