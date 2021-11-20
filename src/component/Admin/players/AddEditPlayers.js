import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../../Hoc/AdminLayout';
import FileUpload from '../../utils/FileUploader';
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
  lastname: '',
  number: '',
  position: '',
  image: '',
};

const AddEditPlayers = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState('');
  const [value, setValue] = useState(initialValues);
  const [defaultImage, setDefaultImage] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: value,
    validationSchema: Yup.object({
      name: Yup.string().required('This input is required'),
      lastname: Yup.string().required('This input is required'),
      number: Yup.number()
        .required('This input is required')
        .min(0, 'Minimum is zero')
        .max(100, 'Maximum is 100'),
      position: Yup.string().required('This input is required'),
      image: Yup.string().required('This input is required'),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    let dataToSubmit = values;
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
      playersCollection
        .doc(props.match.params.playerid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast('Player Added');
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      playersCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            firebase
              .storage()
              .ref(this.props.dir)
              .child(snapshot.data().image)
              .getDownloadURL()
              .then((url) => {
                updateImageName(snapshot.data().image);
                setDefaultImage(url);
              });

            setFormType('edit');
            setValue(snapshot.data());
          } else {
            showErrorToast('Sorry, Nothing was found');
          }
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      setFormType('Add');
      setValue(initialValues);
    }
  }, [props.match.params.playerid]);

  const updateImageName = (filename) => {
    formik.setFieldValue('image', filename);
  };

  const resetImage = () => {
    formik.setFieldValue('image', '');
    setDefaultImage('');
  };

  return (
    <div>
      <AdminLayout title={formType === 'Add' ? 'Add Player' : 'Edit Player'}>
        <div className='editplayers_dialog_wrapper'>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <FormControl error={selectIsError(formik, 'image')}>
                <FileUpload
                  dir={'players'}
                  defaultImage={defaultImage}
                  defaultImageName={formik.values.image}
                  filename={(filename) => updateImageName(filename)}
                  resetImage={() => resetImage()}
                />
                {selectErrorHelper(formik, 'image')}
              </FormControl>
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
                    id='lastname'
                    name='lastname'
                    variant='outlined'
                    placeholder='Enter your lastname'
                    {...formik.getFieldProps('lastname')}
                    {...textErrorHelper(formik, 'lastname')}
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
