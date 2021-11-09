import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../../Hoc/AdminLayout';
import { playersCollection } from '../../../firebase';
import { Link } from 'react-router-dom';

import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { showErrorToast } from '../../utils/tools';

const AdminPlayers = () => {
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      setLoading(true);
      playersCollection
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers(players);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const loadPlayers = () => {
    if (lastVisible) {
      setLoading(true);
      playersCollection
        .startAfter(lastVisible)
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newPlayers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers([...players, ...newPlayers]);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showErrorToast('Nothing To Show');
    }
  };

  return (
    <AdminLayout title='The Players'>
      <div>
        <Button
          disableElevation
          variant='outlined'
          color='secondary'
          component={Link}
          to={'/admin_players/add_player'}
        >
          Add Player
        </Button>
      </div>

      <Paper sx={{ mb: 3, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
      <Button
        color='secondary'
        disabled={loading}
        variant='contained'
        onClick={() => loadPlayers()}
      >
        Load More
      </Button>
      <div className='admin_progress'>
        {loading ? <CircularProgress color='secondary' thickness={7} /> : null}
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
