import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { AuthContext } from '../Login_Signup/AuthContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return (
    <AppBar position="fixed" color="default" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' , marginRight :'100%'}}>Bee 76.</Link>
        </Typography>
        {location.pathname !== '/trap' && location.pathname !== '/maptrap' && (
          <>
            <Button color="inherit">
              <Link to="/sign-in" style={{ color: 'inherit', textDecoration: 'none' }}>
                Connexion
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/sign-up" style={{ color: 'inherit', textDecoration: 'none' }}>
                Inscription
              </Link>
            </Button>
          </>
        )}
        {location.pathname === '/trap' && (
          <Button color="inherit">
            <Link to="/maptrap" style={{ color: 'inherit', textDecoration: 'none' }}>
              Carte
            </Link>
          </Button>
        )}
        {location.pathname === '/maptrap' && (
          <Button color="inherit">
            <Link to="/trap" style={{ color: 'inherit', textDecoration: 'none' }}>
              Pièges
            </Link>
          </Button>
        )}
        {isLoggedIn && (
          <Button color="inherit" onClick={logOut}>
            Déconnexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default CustomNavbar;
