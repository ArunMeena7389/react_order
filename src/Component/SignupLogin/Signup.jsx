import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { OtpAction, SignpuAction } from '../../Redux/SignupLoginAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showCustomLoader } from '../../Common/showCustomLoader';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp:""
    });
    const [isShowOtpPage,setIsShowOtpPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async(e) => {
        showCustomLoader(true);
        e.preventDefault();
        if(!isShowOtpPage){
            await dispatch(OtpAction({email:formData.email},
                (data)=>{
                    setIsShowOtpPage(true);
                },
                (err)=>{

                }
            ));
        }else{
            await dispatch(SignpuAction(formData));
            navigate("/")
        }
        showCustomLoader(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}
        >
            <Card sx={{ width: 400, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" mb={2}>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {!isShowOtpPage?<Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                >
                                    Create Account
                                </Button>
                            </Grid>
                        </Grid>:<Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    name="otp"
                                    type="otp"
                                    label="OTP"
                                    fullWidth
                                    required
                                    value={formData.otp}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </Grid>
                            </Grid>}
                    </form>
                    <br />
                    <Button
                        variant="contained"
                        type="button"
                        fullWidth
                        color="primary"
                        onClick={() => { navigate("/sign-in") }}
                    >
                        Sign In ?
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
