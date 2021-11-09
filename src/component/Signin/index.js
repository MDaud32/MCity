import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { firebase } from '../../firebase';
import { showErrorToast, showSuccessToast } from '../utils/tools';
import { Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'professor@gmail.com',
      password: 'professor123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('invalid email address')
        .required('the email is required'),
      password: Yup.string().required('password required'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      formSubmit(values);
    },
  });

  const formSubmit = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        //success toast
        showSuccessToast('you are logged in');
        props.history.push('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        showErrorToast(error.message);
      });
  };

  return (
    <>
      {!props.user ? (
        <div className='container'>
          <div className='signin_wrapper' style={{ margin: '100px' }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>Please SignIn</h2>

              <input
                name='email'
                placeholder='Enter Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='error_label'>{formik.errors.email}</div>
              ) : null}

              <input
                name='password'
                placeholder='Enter Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='error_label'>{formik.errors.password}</div>
              ) : null}

              {loading ? (
                <CircularProgress className='progress' color='secondary' />
              ) : (
                <button type='submit'>log in</button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )}
    </>
  );
};

export default SignIn;
