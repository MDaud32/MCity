import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ListItem } from '@mui/material';
import { logoutHandler } from '../../utils/tools';

const AdminNav = (props) => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches',
    },
    {
      title: 'Players',
      linkTo: '/admin_players',
    },
  ];

  const renderItems = () =>
    links.map((link) => (
      <Link key={link.title} to={link.linkTo}>
        <ListItem button className='admin_nav_link'>
          {link.title}
        </ListItem>
      </Link>
    ));

  return (
    <div>
      {renderItems()}
      <ListItem
        button
        className='admin_nav_link'
        onClick={() => logoutHandler()}
      >
        logout
      </ListItem>
    </div>
  );
};

export default withRouter(AdminNav);
