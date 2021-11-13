import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../../Hoc/AdminLayout';
import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from '../../utils/tools';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
} from '@mui/material';
import { playersCollection, firebase } from '../../../firebase';

const initialValues = {
  name: '',
  lastName: '',
  number: '',
  position: '',
};

const AddEditPlayers = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('');
  const [value, setValue] = useState(initialValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: value,
    validationSchema: Yup.object({
      name: Yup.string().required('This input is required'),
      lastName: Yup.string().required('This input is required'),
      number: Yup.number()
        .required('This input is required')
        .min(0, 'Minimum is zero')
        .max(100, 'Maximum is 100'),
      position: Yup.string().required('This input is required'),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    const dataToSubmit = values;
    setLoading(true);

    if (formType === 'Add') {
      playersCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast('Player Added');
          formik.resetForm();
          props.history.push('/admin_players');
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
    }
  };

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      
      playersCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data) {
          } else {
            showErrorToast('Sorry, Nothing was found');
          }
        }).catch(error => {
          showErrorToast(error)
        })

      setFormType('edit');
      setValue({ name: '' });
    } else {
      setFormType('Add');
      setValue(initialValues);
    }
  }, [props.match.params.playerid]);

  return (
    <div>
      <AdminLayout title={formType === 'Add' ? 'Add Player' : 'Edit Player'}>
        <div className='editplayers_dialog_wrapper'>
          <div>
            <form onSubmit={formik.handleSubmit}>
              image
              <hr />
              <h4>Player Info</h4>
              <div className='mb-5'>
                <FormControl>
                  <TextField
                    id='name'
                    name='name'
                    variant='outlined'
                    placeholder='Enter your FirstName'
                    {...formik.getFieldProps('name')}
                    {...textErrorHelper(formik, 'name')}
                  />
                </FormControl>
              </div>
              <div className='mb-5'>
                <FormControl>
                  <TextField
                    id='lastName'
                    name='lastName'
                    variant='outlined'
                    placeholder='Enter your LastName'
                    {...formik.getFieldProps('lastName')}
                    {...textErrorHelper(formik, 'lastName')}
                  />
                </FormControl>
              </div>
              <div className='mb-5'>
                <FormControl>
                  <TextField
                    type='number'
                    id='number'
                    name='number'
                    variant='outlined'
                    placeholder='Enter your number'
                    {...formik.getFieldProps('number')}
                    {...textErrorHelper(formik, 'number')}
                  />
                </FormControl>
              </div>
              <div className='mb-5'>
                <FormControl error={selectIsError(formik, 'position')}>
                  <Select
                    id='position'
                    name='position'
                    variant='outlined'
                    displayEmpty
                    {...formik.getFieldProps('position')}
                  >
                    <MenuItem value='' disabled>
                      Select A Position
                    </MenuItem>
                    <MenuItem value='Keeper'>Keeper</MenuItem>
                    <MenuItem value='Defence'>Defence</MenuItem>
                    <MenuItem value='Midfield'>Midfield</MenuItem>
                    <MenuItem value='Sticker'>Sticker</MenuItem>
                  </Select>
                  {selectErrorHelper(formik, 'position')}
                </FormControl>
              </div>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
                disabled={loading}
              >
                {formType === 'Add' ? 'Add Player' : 'Edit Player'}
              </Button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AddEditPlayers;
