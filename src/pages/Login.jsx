import React from 'react'
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../api/typeDefs";



const Login = () => {

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });

    const [login, { data, loading, error }] = useMutation(LOGIN_USER,{
        onCompleted(data){
  localStorage.setItem("userData", data.user);
 
  document.location.href = "/";
        }
    });


    const handleForm = (e) => {
        setFormData(formData=>({ ...formData, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        login({
          variables: {
            email: formData.email,
            password: formData.password,
          },
        });

        setFormData({})
    }

    if(loading) return <h1>Loading....</h1>
    
  

  return (
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
             
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign in to your account
                      </h1>

                      {(error)?<h1 className='text-red-500'>{error.message}</h1>:null}
                      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method='post'>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input value={formData.email} onChange={ handleForm} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input value={formData.password} onChange={ handleForm} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          
                          <button type="submit" className="w-full text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet? <Link  to="register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Login