'use client';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useState } from 'react';

export default function EmailForm() {
  const [resultView, setResultView] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const result = await response.json();

        setResultView(true);

        if (result.success) {
          resetForm();
          setSubmitted(true);
        }

        setTimeout(() => {
          setResultView(false);
        }, 3000);
      } catch (error) {
        alert('Something went wrong');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-1/2 m-auto">
      {resultView && submitted ? (
        <div className="text-center w-60 m-auto bg-green-400 rounded-lg">
          success
        </div>
      ) : null}

      {resultView && !submitted ? (
        <div className="text-center w-60 m-auto bg-red-400 rounded-lg">
          <AiOutlineCloseCircle className="inline mr-1" />
          fail
        </div>
      ) : null}
      <div className="flex flex-col">
        <label className="mt-2">
          Your Email
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500 ml-2 text-sm">
              <AiOutlineCloseCircle className="inline" /> {formik.errors.email}
            </span>
          ) : null}
        </label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          className="mt-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="mt-2">
          Subject
          {formik.touched.subject && formik.errors.subject ? (
            <span className="text-red-500 ml-2 text-sm">
              <AiOutlineCloseCircle className="inline" />
              {formik.errors.subject}
            </span>
          ) : null}
        </label>
        <input
          type="text"
          name="subject"
          value={formik.values.subject}
          className="mt-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="mt-2">
          Message
          {formik.touched.message && formik.errors.message ? (
            <span className="text-red-500 ml-2 text-sm">
              <AiOutlineCloseCircle className="inline" />
              {formik.errors.message}
            </span>
          ) : null}
        </label>
        <textarea
          name="message"
          value={formik.values.message}
          className="mt-2 w-full h-52 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          className="bg-yellow-300 text-black hover:bg-yellow-400 rounded-lg mt-2"
        >
          submit
        </button>
      </div>
    </form>
  );
}
