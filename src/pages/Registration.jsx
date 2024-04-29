import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
    const initialState = {
        first_name: '',
        last_name: '',
        email_id: '',
        password: '',
        confirm_password: ''
    };
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onClickHandleSubmit = (e) => {
        e.preventDefault();

        const { first_name, last_name, email_id, password, confirm_password } = formData;

        if (!first_name.trim()) {
            toast.error('First name is required!');
            return;
        }
        if (!last_name.trim()) {
            toast.error('Last name is required!');
            return;
        }
        if (!email_id.trim()) {
            toast.error('Email id is required!');
            return;
        }
        if (!password.trim()) {
            toast.error('Password is required!');
            return;
        }
        if (!confirm_password.trim()) {
            toast.error('Confirm password is required!');
            return;
        }
        if (password !== confirm_password) {
            toast.error('Password and Confirm password do not match!');
            return;
        }

        const userDataArr = JSON.parse(localStorage.getItem('userDataArr')) || [];
        const dataObject = { first_name, last_name, email_id, password };
        userDataArr.push(dataObject);
        localStorage.setItem("userDataArr", JSON.stringify(userDataArr));
        toast.success('Successfully Registered!');
        navigate('/login');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-12 offset-md-3 offset-0'>
                    <div className='p-4 mt-5 shadow rounded'>
                        <form onSubmit={onClickHandleSubmit}>
                            <div className='fs-3 mb-3'>Registration</div>

                            <div className='form-floating mb-3'>
                                <input type='text' onChange={onChangeHandle}
                                    className='form-control' name='first_name' value={formData.first_name} placeholder='First Name' />
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='text' onChange={onChangeHandle}
                                    className='form-control' name='last_name' value={formData.last_name} placeholder='Last Name' />
                                <label htmlFor="floatingInput">Last Name</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='email' onChange={onChangeHandle}
                                    className='form-control' name='email_id' value={formData.email_id} placeholder='Email ID' />
                                <label htmlFor="floatingInput">Email ID</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='password' onChange={onChangeHandle}
                                    className='form-control' name='password' value={formData.password} placeholder='Password' />
                                <label htmlFor="floatingInput">Password</label>
                            </div>
                            <div className='form-floating mb-3'>
                                <input type='password' onChange={onChangeHandle}
                                    className='form-control' name='confirm_password' value={formData.confirm_password} placeholder='Confirm Password' />
                                <label htmlFor="floatingInput">Confirm Password</label>
                            </div>
                            <div className='mb-3'>
                                <button type='submit' className='btn btn-secondary px-5 py-2'>Registration</button>
                            </div>
                        </form>
                        <div className=''>
                            <span className='text-primary pointer' onClick={() => navigate('/login', { replace: true })}>Already have an account?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
