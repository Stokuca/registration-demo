import React, { useContext, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {registerValidation, lodInValidation} from "../helpers/Validation";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { API_URL } from "../helpers/constants";

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialLoginValues: LoginValues = {
  email: "",
  password: "",
};

const initialValues: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

interface LoginValues {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [user, setUser] = useLocalStorage("user", null)
  const [first, setfirst] = useState<boolean>(false);
  const navigate = useNavigate();
  //Kako je u pitanju test zadatak, slicna stvar kao sa tokenom, ostavio sam kao drugo resenje za prenos podataka konkretno imena u komponentu home.
  const { setUsername } = useContext(UserContext); 

  const handleRegistration = async (values: RegisterValues) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setUser(data.firstName);
      localStorage.setItem('user', JSON.stringify({ email: "", userName: data.firstName }));
      navigate('/home');

    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (values: LoginValues) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("HTTP error " + response.status);
        return;
      }

      const data = await response.json();
      setUsername(data.firstName);
      localStorage.setItem('user', JSON.stringify({ email: "", userName: data.firstName }))
      navigate('/home');

    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return <Navigate to="/home" />
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {first ? (<Formik
          initialValues={initialValues}
          validationSchema={registerValidation}
          onSubmit={handleRegistration}
        >
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Register</h2>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-medium mb-2">First Name:</label>
              <Field type="text" name="firstName" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
              <ErrorMessage name="firstName" className="text-red-500"/>
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-medium mb-2">Last Name:</label>
              <Field type="text" name="lastName" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
              <ErrorMessage name="lastName" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">Email address:</label>
              <Field type="email" name="email" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
              <ErrorMessage name="email" className="text-red-500"/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">Password:</label>
              <Field type="password" name="password" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
              <ErrorMessage name="password" className="text-red-500"/>
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">Register</button>
            <button onClick={() => setfirst(false)} className="ml-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:underline">Log in</button>
          </Form>
        </Formik>) : (
            <>
              <h2 className="mb-4 text-2xl font-semibold">Login</h2>
              <Formik
                initialValues={initialLoginValues}
                validationSchema={lodInValidation}
                onSubmit={handleLoginSubmit}
              >
                <Form className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">Email address:</label>
                    <Field type="email" name="email" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
                    <ErrorMessage name="email"  className="text-red-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-2">Password:</label>
                    <Field type="password" name="password" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
                    <ErrorMessage name="password" className="text-red-500"/>
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">Login</button>
                
                <button onClick={() => setfirst(true)} className="ml-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:underline">Register</button>
                </Form>
              </Formik>
            </>
          )
        }
      </div>
    </div>
  );
};

export default RegisterForm;