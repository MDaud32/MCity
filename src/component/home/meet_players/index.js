import React, { useState } from 'react';
import { Tag } from '../../utils/tools';
import { Fade } from 'react-awesome-reveal';
import HomeCards from './Cards';

let tagDefault = {
  bck: '#0e1731',
  color: '#ffffff',
  size: '100px',
};

const MeetPlayers = () => {
  const [show, setShow] = useState(false);
  const showTextTag = (text) => {
    return (
      <Tag
        {...tagDefault}
        add={{
          display: 'inline-block',
          marginBottom: '20px',
        }}
      >
        {text}
      </Tag>
    );
  };
  return (
    <div>
      <Fade
        onVisibilityChange={(inView) => {
          if (inView) {
            setShow(true);
          }
        }}
        triggerOnce
      >
        <div className='home_meetplayers'>
          <div className='container'>
            <div className='home_meetplayers_wrapper'>
              <div className='home_card_wrapper'>
                <HomeCards show={show} />
              </div>
              <div className='home_text_wrapper'>
                <div>{showTextTag('meet')}</div>
                <div>{showTextTag('the')}</div>
                <div>{showTextTag('players')}</div>
                <div>
                  <Tag
                    bck='#ffffff'
                    size='27px'
                    color='#0e1731'
                    link={true}
                    linkTo='/the_team'
                    add={{
                      display: 'inline-block',
                      marginBottom: '27px',
                      border: '3px solid #0e1731',
                    }}
                  >
                    Meet Them Here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default MeetPlayers;
