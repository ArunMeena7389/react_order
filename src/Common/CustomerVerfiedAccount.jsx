import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import React, { Fragment, useState } from 'react';

const CustomerVerfiedAccount = ({
    onClick,
    onClose,
    open,
    title = '',
    selectedItem = '',
    ...props
}) => {
    const [stateValue, setStateValue] = useState({
        name: '',
        mobile: '',
        otp: ''
    });

    const [error, setError] = useState({
        name: false,
        mobile: false,
        otp: false
    });

    const [helperText, setHelperText] = useState({
        name: '',
        mobile: '',
        otp: ''
    });

    const [isOtpField, setIsOtpField] = useState(false);

    const handleOnChange = (val, type) => {
        setStateValue((prev) => ({
            ...prev,
            [type]: val
        }));

        setError((prev) => ({ ...prev, [type]: false }));
        setHelperText((prev) => ({ ...prev, [type]: '' }));
    };

    const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
    const validateOtp = (otp) => /^\d{6}$/.test(otp);

    const handleSubmit = () => {
        if (!isOtpField) {
            let hasError = false;
            const newError = { name: false, mobile: false, otp: false };
            const newHelperText = { name: '', mobile: '', otp: '' };

            if (!stateValue.name.trim()) {
                newError.name = true;
                newHelperText.name = 'Full name is required';
                hasError = true;
            }

            if (!validateMobile(stateValue.mobile)) {
                newError.mobile = true;
                newHelperText.mobile = 'Enter a valid 10-digit mobile number';
                hasError = true;
            }

            setError(newError);
            setHelperText(newHelperText);

            if (!hasError) {
                console.log('Sending OTP to:', stateValue.mobile);
                setIsOtpField(true);
            }
        } else {
            // Step 2: Validate OTP
            const isValidOtp = validateOtp(stateValue.otp);
            if (!isValidOtp) {
                setError((prev) => ({ ...prev, otp: true }));
                setHelperText((prev) => ({ ...prev, otp: 'Enter a valid 6-digit OTP' }));
                return;
            }

            // Submit all values to parent
            console.log('Verified & Submitted:', stateValue);
            onClick?.(stateValue);
        }
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {!isOtpField ? (
                            <>
                                <TextField
                                    placeholder="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    error={error.name}
                                    helperText={helperText.name}
                                    value={stateValue.name}
                                    onChange={(e) => handleOnChange(e.target.value, 'name')}
                                    style={{ borderRadius: '5px' }}
                                />
                                <br />
                                <br />
                                <TextField
                                    placeholder="Mobile Number"
                                    variant="outlined"
                                    fullWidth
                                    error={error.mobile}
                                    helperText={helperText.mobile}
                                    value={stateValue.mobile}
                                    onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/\D/g, '');
                                        handleOnChange(onlyNums, 'mobile');
                                    }}
                                    inputProps={{ maxLength: 10 }}
                                />
                            </>
                        ) : (
                            <>
                                <p>OTP hasbeen sent to your mobile number {stateValue.mobile}</p>
                                <TextField
                                    placeholder="Enter OTP"
                                    variant="outlined"
                                    fullWidth
                                    error={error.otp}
                                    helperText={helperText.otp}
                                    value={stateValue.otp}
                                    onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/\D/g, '');
                                        handleOnChange(onlyNums, 'otp');
                                    }}
                                    inputProps={{ maxLength: 6 }}
                                />
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="success" variant="contained">
                        {isOtpField ? 'Verify OTP' : 'Send OTP'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default CustomerVerfiedAccount;
