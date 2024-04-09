
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
homeContainer: {
maxWidth: '400px',
margin: '50px auto',
padding: '20px',
border: '1px solid #ddd',
borderRadius: '4px',
backgroundColor: '#fff',
boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
'& h1': {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
},
'& p': {
    textAlign: 'center',
    color: '#666',
    marginBottom: '15px',
},
},
homeButtons: {
display: 'flex',
flexDirection: 'row',
alignItems: 'center',
gap: '10px',
'& button': {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#5c6bc0',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
    backgroundColor: '#3f51b5',
    },
},
},
}));

function HomePage() {
const classes = useStyles();

return (
<Container className={classes.homeContainer}>
    <Typography variant="h1">Welcome Home!</Typography>
    <Typography variant="body1">This is the homepage of our application.</Typography>
    <div className={classes.homeButtons}>
    {/* Replace with your actual links and logic */}
    <Link to = "/signup">
    <Button variant="contained" color="primary">
        Signup
        </Button>
    </Link>

    <Link to = "/login">
    <Button variant="contained" color="secondary">
        Login
    </Button>
    </Link>
    <Link to = "/Analytics">
    <Button variant="contained" color="secondary">
        Analytics
    </Button>
    </Link>

    </div>
</Container>
);
}

export default HomePage;