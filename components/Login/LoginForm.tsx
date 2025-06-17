"use client";

import Image from 'next/image';
import google from '../../public/images/form/google.svg';
import fav from '../../public/images/logo/fav.png';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (data: FieldValues) => {
        try {
            const response = await axios.post('/api/login', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if(response.status === 200) {
                window.localStorage.setItem("userInfo", JSON.stringify({
                    ...response.data
                }));
                window.location.reload();
            }
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              setErrorMessage(error.response?.data?.message || "Something went wrong!");
            } else {
              setErrorMessage("Unexpected error occurred!");
            }
        }
    };

    return (
        <div className="rts-register-area rts-section-gap bg_light-1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="registration-wrapper-1">
                            <div className="logo-area mb--0">
                                <Image width={57} height={57} className="mb--10" src={fav} alt="logo" priority />
                            </div>
                            <h3 className="title">Login Into Your Account</h3>
                            {errorMessage && (
                                <div className="error-bg">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <form className="registration-form" onSubmit={handleSubmit(handleLogin)}>
                                <div className="input-wrapper">
                                    <label htmlFor="email">Email*</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        {...register("email", { 
                                            required: 'Email is required!', 
                                            pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                message: "Invalid email address!",
                                            }, 
                                        })}
                                        name="email"
                                    />
                                    {errors['email'] && (
                                        <p className='error'>{errors['email'].message as string}</p>
                                    )}
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Password*</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        {...register("password", {
                                            required: 'Password isrequired!',
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 caracters!",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "Password can not longer than 20 caracters!",
                                            },
                                        })}
                                        name="password"
                                    />
                                    {errors['password'] && (
                                        <p className='error'>{errors['password'].message as string}</p>
                                    )}
                                </div>
                                <button className="rts-btn btn-primary">Login Account</button>
                                <div className="another-way-to-registration">
                                    <div className="registradion-top-text">
                                        <span>Or Register With</span>
                                    </div>
                                    <div className="login-with-brand">
                                        <Link href="/" className="single">
                                            <Image width={30} height={30} src={google} alt="login" priority />
                                        </Link>
                                    </div>
                                    <p>{`You Don't Have An Account?`} <Link href="/register">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;