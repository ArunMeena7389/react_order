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
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../Redux/SignupLoginAction';
import { useDispatch } from 'react-redux';
import { showCustomLoader } from '../../Common/showCustomLoader';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
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
        console.log("Submitted Data: ", formData);
        await dispatch(LoginAction(formData,(data)=>{
            navigate("/")
        },
        (err)=>{

        }));
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
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
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
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <br />
                    <Button
                        variant="contained"
                        type="button"
                        fullWidth
                        color="primary"
                        onClick={() => { navigate("/sign-up") }}
                    >
                        Sign Up ?
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Login
