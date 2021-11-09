import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Raheem from '../../../Resources/images/players/Raheem_Sterling.png';
import Vincent from '../../../Resources/images/players/Vincent_Kompany.png';
import PlayerCard from '../../utils/PlayerCard';

let cards = [
  {
    bottom: 90,
    left: 300,
    player: Vincent,
  },
  {
    bottom: 60,
    left: 200,
    player: Raheem,
  },
  {
    bottom: 30,
    left: 100,
    player: Otamendi,
  },
  {
    bottom: 0,
    left: 0,
    player: Vincent,
  },
];

const HomeCards = (props) => {
  const showAnimateCards = () =>
    cards.map((card, i) => {
      return (
        <Animate
          show={props.show}
          key={i}
          start={{
            left: 0,
            bottom: 0,
          }}
          enter={{
            left: [card.left],
            bottom: [card.bottom],
            timing: {
              duration: 500,
              ease: easePolyOut,
            },
          }}
        >
          {({ left, bottom }) => {
            return (
              <div
                style={{
                  position: 'absolute',
                  left,
                  bottom,
                }}
              >
                <PlayerCard
                  number='30'
                  name='shahid'
                  lastName='afridi'
                  bck={card.player}
                />
              </div>
            );
          }}
        </Animate>
      );
    });

  return <div>{showAnimateCards()}</div>;
};

export default HomeCards;
