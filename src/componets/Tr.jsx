import React,{useState} from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CONATCT, DELETE_CONATCT } from "../api/typeDefs";

const Tr = (props) => {

    const [open,SetOpen]=useState(false);


const [formData, setFormData] = useState({
  firstName: props.firstName,
  email: props.email,
  phone: props.phone,
  lastName: props.lastName,
});

const [update, addContact] = useMutation(UPDATE_CONATCT, {
  onCompleted(data) {
          alert("Conatct Updated.");
    document.location.href = "/";
  },
});

const [del, deleteContact] = useMutation(DELETE_CONATCT, {
  onCompleted(data) {
          alert("Conatct Deleted.");
    document.location.href = "/";
  },
});


  const handleForm = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = (e) => {
 
    e.preventDefault();
    SetOpen(false);

    update({
      variables: {
        _id:props._id,
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        lastName: formData.lastName,
      },
    });
  };
const handleDelete = (e) => {
  e.preventDefault();
  SetOpen(false);

  del({
    variables: {
      _id: props._id
    },
  });
};
  return (
    <>
      <tr
        onClick={() => SetOpen(true)}
        className="text-center hover:bg-[#FF8B13] hover:text-white font-semibold duration-300 cursor-pointer"
      >
        <td className="p-3">{props.firstName}</td>
        <td className="p-3">{props.lastName}</td>
        <td className="p-3">{props.phone}</td>
        <td className="p-3">{props.email}</td>
      </tr>

      {open ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 bg-[#FF8B13] rounded-t">
                  <h3 className="text-2xl font-semibold text-white">
                    Contact Details
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-2">
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
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-5">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}

export default Tr