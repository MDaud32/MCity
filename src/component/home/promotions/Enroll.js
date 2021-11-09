import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showErrorToast, showSuccessToast } from '../../utils/tools';
import { promotionsCollection } from '../../../firebase';

const Enroll = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email')
        .required('The Email is Required'),
    }),
    onSubmit: (values, { resetFrom }) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    try {
      const onTheList = await promotionsCollection
        .where('email', '==', values.email)
        .get();

      if (onTheList.docs.length >= 1) {
        showErrorToast('sorry user already exist');
        formik.resetForm();
        setLoading(false);
        return false;
      }

      await promotionsCollection.add({ email: values.email });
      formik.resetForm();
      setLoading(false);
      showSuccessToast('congratulation you are in');
    } catch (error) {
      showErrorToast(error);
    }
  };
  return (
    <Fade>
      <div className='enroll_wrapper'>
        <form onSubmit={formik.handleSubmit}>
          <div className='enroll_title'>Enter Your Email</div>
          <div className='enroll_input'>
            <input
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Enter Your Email'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error_label'>{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color='secondary' className='progress' />
            ) : (
              <button type='submit'>ENROLL</button>
            )}
            <div className='enroll_discl'>
              Subcribe to our News Letter for weekly updates and monthly
              giveaways
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
