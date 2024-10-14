import { useAppDispatch } from '@/store'
import { setPersist } from '@/store/auth/authSlice'
import { Button, Input } from '@material-tailwind/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Label from '@/components/Label'
import useAuth from '@/utils/hooks/useAuth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";

const SignIn = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [passwordInputVisible, setPasswordInputVisible] = useState(true);
  
  const onSignIn = async (values: any, setSubmitting: (isSubmitting: boolean) => void) => {
    const { username, password } = values;
    setSubmitting(true);
    try {
      const result = await signIn({ username, password });
      console.log(result, "Verify Result")
      const status = result?.status;
      toast[status === 'success' ? 'success' : 'error'](result?.message);
    } catch (error) {
      toast.error("An error occurred during sign-in.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .required('Required')
      // .min(5, 'Min length is 5')
      // .matches(/[a-z]/, 'Must have lowercase letter')
      // .matches(/[A-Z]/, 'Must have uppercase letter')
      // .matches(/[0-9]/, 'Must have digit'),
  });

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          {/* Left Section (Welcome Section with Background) */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" 
               style={{ backgroundImage: "url('/images/Register-Background.png')" }}>
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <p className="text-white">
                Shop the latest trends and essentials at unbeatable prices! <br />
            </p>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4">Sign In</h2>
            <p className="mb-4">Access your account</p>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => onSignIn(values, setSubmitting)}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <div className="mb-5 h-12">
                    <Field
                      name="username"
                      as={Input}
                      type="text"
                      placeholder="Username"
                      className="!border !border-gray-300
                      bg-white text-gray-900 shadow-lg 
                      shadow-gray-900/5 ring-4 ring-transparent 
                      placeholder:text-gray-500 placeholder:opacity-100"
                      labelProps={{
                        className: 'hidden',
                      }}
                     containerProps={{ className: 'w-full' }}
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  </div>
                  
                  {/* Password Field */}
                  <div className="mb-5 h-12">
                    <Field
                      name="password"
                      as={Input}
                      type={passwordInputVisible ? 'password' : 'text'}
                      placeholder="Password"
                      values={values?.password}
                      className="!border !border-gray-300
                      bg-white text-gray-900 shadow-lg 
                      shadow-gray-900/5 ring-4 ring-transparent 
                      placeholder:text-gray-500 placeholder:opacity-100"
                      autoComplete
                      labelProps={{
                        className: 'hidden',
                      }}
                     containerProps={{ className: 'w-full' }}
                     icon={passwordInputVisible ? <BsEyeSlash className='cursor-pointer' onClick={() => setPasswordInputVisible(false)} /> 
                     : <BsEyeFill className='cursor-pointer' onClick={() => setPasswordInputVisible(true)} />}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="mt-5">
                    <Button
                      type="submit"
                      color="purple"
                      size="md"
                      loading={isSubmitting}
                      className="w-full bg-purple-500 text-white flex justify-center"
                    >
                      {isSubmitting ? 'Signing...' : 'Sign In'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            {/* <p className="text-gray-500 text-center mt-3">
              Don't have an account?{' '}
              <button onClick={() => navigate('/sign-up')} className="text-purple-500">
                Sign up
              </button>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
