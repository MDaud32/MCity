import React, { useState, useEffect } from 'react';
import PlayerCard from '../utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';

import { Promise } from 'core.js';
import { showErrorToast } from '../utils/tools';
import { firebase, playersCollection } from '../../firebase';

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState('');

  useEffect(() => {
    if (!players) {
      playersCollection
        .get()
        .then((snapshot) => {
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let promises = [];
          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                firebase
                  .storage()
                  .ref('players')
                  .child(player.image)
                  .getDownloadURL()
                  .then((url) => {
                    players[index].url = url;
                    resolve();
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
            );
          });
          Promise.all(promises).then(() => {
            setPlayers(players);
          });
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);
  return <div>the team</div>;
};

export default TheTeam;
