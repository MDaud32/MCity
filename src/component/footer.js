import React from 'react';
import { CityLogo } from './utils/tools';

const Footer = () => {
  return (
    <footer className='bck_blue'>
      <div className='footer_logo'>
        <CityLogo link={true} linkTo={'/'} width='70px' height='70px' />
      </div>

      <div className='footer_descl'>2021 all rights reserved</div>
    </footer>
  );
};

export default Footer;
