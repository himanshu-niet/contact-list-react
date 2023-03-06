import React, { useState,useEffect } from 'react'
import Tr from '../componets/Tr';
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_CONATCT, GET_CONTACTS } from "../api/typeDefs";

const Home = () => {

  const [open, SetOpen] = useState(false);
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    lastName: "",
  });

  const [register, addContact] = useMutation(CREATE_CONATCT,{
    onCompleted(data){

    document.location.href="/"
    }
  });


  const {data, loading, error} = useQuery(GET_CONTACTS);


 const isLoggedIn = localStorage.getItem("userData");

if (!isLoggedIn) {
  return <Navigate to="/login" replace={true} />;
}

  const handleLogout=()=>{
  localStorage.removeItem("userData")
 navigate("/login");
  }
  
 

if (error) return (
  <h1>
    {error.message}
  </h1>
);

  const handleForm = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("okk")
    e.preventDefault();
    SetOpen(false);

    register({
      variables: {
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        lastName: formData.lastName,
      },
    });
  
  };

  return (
    <div className="px-[5%] pb-10">
      {addContact.loading ? (
        <h1 className="text-right text-blue-600">Please Wait....</h1>
      ) : null}
      {addContact.error ? (
        <h1 className="text-right text-red-600">Failed....</h1>
      ) : null}
      {addContact.data ? (
        <h1 className="text-right text-green-600">Contact Succussfully Added.</h1>
      ) : null}
      <h1 className="text-3xl font-bold text-center mt-5">
        <i className="fa fa-address-book mr-2 text-[#FF8B13]"></i> Contact List
      </h1>

      <button
        onClick={() => SetOpen(true)}
        className="py-2 px-3 bg-[#FF8B13] shadow-lg text-white font-semibold rounded"
      >
        <i className="fa fa-plus mr-2"></i>Contact
      </button>
      <h1 className="text-right">
        <button
          onClick={handleLogout}
          className="py-1 px-2  bg-red-400 shadow-lg text-white font-semibold rounded"
        >
          Logout
        </button>
        <br></br>
        <span className="font-bold text-lg ">User</span>
        <br></br>
        <span>Click on Record for Delete and Update Operation</span>
      </h1>

      {open ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 bg-[#FF8B13] rounded-t">
                  <h3 className="text-2xl font-semibold text-white">
                    Contact Details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-2" >
                    <div className="grid md:grid-cols-2 gap-5  mt-3">
                      <div>
                        <label>First Name</label>
                        <input
                          value={formData.firstName}
                          onChange={handleForm}
                          name="firstName"
                          className="w-full py-2 px-2 mt-2 text-lg  border-gray-300 border-2 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <input
                          value={formData.lastName}
                          onChange={handleForm}
                          name="lastName"
                          className="w-full py-2 px-2 mt-2 text-lg  border-gray-300 border-2 rounded focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5  mt-3">
                      <div>
                        <label>Email </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={handleForm}
                          name="email"
                          className="w-full py-2 px-2 mt-2 text-lg  border-gray-300 border-2 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label>Phone Number</label>
                        <input
                          value={formData.phone}
                          onChange={handleForm}
                          name="phone"
                          className="w-full py-2 px-2 mt-2 text-lg  border-gray-300 border-2 rounded focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <span
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetOpen(false)}
                  >
                    Close
                  </span>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      <div className="my-4  w-full bg-white  h-full">
        <table className="table-auto w-full  ">
          <thead className="bg-gray-800 ">
            <tr className=" font-bold">
              <th className="p-3 text-white ">First Name</th>
              <th className="p-3 text-white">Last Name</th>
              <th className="p-3 text-white">Phone</th>
              <th className="p-3 text-white">Email</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.contacts.map((item) => {
                  return (
                    <Tr
                      _key={item._id}
                      firstName={item.firstName}
                      lastName={item.lastName}
                      email={item.email}
                      phone={item.phone}
                      _id={item._id}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home