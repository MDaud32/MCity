import React from 'react';
import Featured from './featured';
import Matches from './featured/matches';
import MeetPlayers from './meet_players';
import Promotion from './promotions';

const Home = () => {
  return (
    <div className='bck_blue'>
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
