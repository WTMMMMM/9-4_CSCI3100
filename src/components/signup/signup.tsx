import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpRequest, SignUpResponse } from '../../models/models';
import { baseUrl, postRequestOptions } from '../../common/cookie';
import axios from 'axios';

const SignUpContainer = styled(Box)(({ theme }) => ({
maxWidth: '400px',
margin: '50px auto',
padding: theme.spacing(2.5),
border: `1px solid ${theme.palette.divider}`,
borderRadius: theme.shape.borderRadius,
backgroundColor: theme.palette.background.paper,
boxShadow: theme.shadows[2],
}));

const FormButton = styled(Button)(({ theme }) => ({
margin: theme.spacing(1, 0),
}));

function SignUpPage() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [address, setAddress] = useState('');
const [accountType, setAccountType] = useState<'admin' | 'normal'>('normal');
const [profileImageLink, setProfileImageLink] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const [success, setSuccess] = useState(false);

const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setUsername(event.target.value);
};

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setPassword(event.target.value);
};

const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setAddress(event.target.value);
};

const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
setAccountType(event.target.value as 'admin' | 'normal');
};

const handleProfileImageLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setProfileImageLink(event.target.value);
};

async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      let auth: any = await axios.post(baseUrl + "signup", formData, postRequestOptions);
      console.log(auth);
      if (auth.data.status == 200) {
        localStorage.setItem("token", auth.data.token);
        window.location.href = "/login";
      } else {
        console.log(auth.data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }

return (
<SignUpContainer>
    <Typography variant="h5" textAlign="center" color="textPrimary" gutterBottom>
    Sign Up
    </Typography>
    {error && <Typography color="error">{error}</Typography>}
    {success && <Typography color="primary">Signup successful!</Typography>}
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={handleUsernameChange}
    />
    <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={handlePasswordChange}
    />
    <TextField
        margin="normal"
        fullWidth
        id="address"
        label="Address"
        name="address"
        autoComplete="address"
        value={address}
        onChange={handleAddressChange}
    />
    <FormControl fullWidth margin="normal">
        <InputLabel id="accountType-label">Account Type</InputLabel>
        <Select
        labelId="accountType-label"
        name="account_type"
        // value={accountType}
        label="Account Type"
        >
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        </Select>
    </FormControl>
    <TextField
        margin="normal"
        fullWidth
        id="profileImageLink"
        label="Profile Image Link"
        name="profile_image_link"
        autoComplete="url"
        value={profileImageLink}
        onChange={handleProfileImageLinkChange}
    />
    <FormButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
    >
        Sign Up
    </FormButton>
   
    </Box>
</SignUpContainer>
);
};

export default SignUpPage;