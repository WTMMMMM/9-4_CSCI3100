// LoginPage.tsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, postRequestOptions } from "../../common/cookie";
import axios from "axios";
// Add this import at the top of your LoginPage.tsx
const LoginContainer = styled(Box)(({ theme }) => ({
  maxWidth: "400px",
  margin: "50px auto",
  padding: theme.spacing(2.5),
  border: "1px solid #ddd",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const LoginButton = styled(Button)({
  padding: "10px",
  marginTop: "8px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#5c6bc0",
  color: "white",
  "&:hover": {
    backgroundColor: "#3f51b5",
  },
});

const SuccessMessage = styled(Typography)({
  color: "#28a745",
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault()
    let formData = document.getElementById("login")
    try {
      let auth = await axios.post(baseUrl + "login", formData, postRequestOptions);
    
      if (auth.data.status == 200) {
        window.location.href = "/";
      } else {
      }
    } catch (error) {}
  }

  const handleSignUpClick = () => {
    navigate("/signup"); // Implement navigation to the signup page or logic for opening the signup form/modal
  };

  return (
    <LoginContainer>
      <Typography variant="h4" textAlign="center" color="#333" mb={2}>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} id="login"noValidate>
        <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={username} onChange={handleUsernameChange} />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={handlePasswordChange} />
        <LoginButton type="submit" fullWidth variant="contained">
          Login
        </LoginButton>
        <Box textAlign="center" mt={2}>
          <Button component={Link} to="/signup" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </LoginContainer>
  );
}

export default LoginPage;
