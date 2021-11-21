import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CityLogo } from './utils/tools';
import { logoutHandler } from './utils/tools';

const Header = ({ user }) => {
  return (
    <AppBar
      sx={{
        position: 'fixed',
        background: '#98c5e9',
        boxShadow: 'none',
        padding: '10px 0',
        borderBottom: '2px solid #00285e',
      }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <div className='header_logo'>
            <CityLogo link={true} linkTo={'/'} height='70px' width='70px' />
          </div>
        </Box>

        <Link to='/the_matches'>
          <Button color='inherit'>Matches</Button>
        </Link>

        {user ? (
          <>
            <Link to='/dashboard'>
              <Button color='inherit'>Dashboard</Button>
            </Link>

            <Button onClick={() => logoutHandler()} color='inherit'>
              Log Out
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
