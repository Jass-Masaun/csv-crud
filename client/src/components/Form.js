import React, { useState, useEffect } from "react";
import { storeRecord, updateRecord } from "../utils/apis/record";

const Form = ({ closeForm, addUserData, editedUserData, updateUserData }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (editedUserData) {
      setFormData(editedUserData);
    }
  }, [editedUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitResponse = async () => {
      if (!editedUserData) {
        const { id, ...rest } = formData;
        const result = await storeRecord(rest);
        if (result) {
          addUserData(result);
          closeForm();
        }
      } else {
        const result = await updateRecord(formData);
        if (result) {
          updateUserData(result);
          closeForm();
        }
      }
    };

    submitResponse();
    // if (editedUserData) {
    //   // Logic to edit existing user data
    //   // You can find the index of the user data in the array and update it
    //   // Then call a function to update the parent component's user data
    // } else {
    //   // Logic to add new user data
    //
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">
          {editedUserData ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {editedUserData ? "Save Changes" : "Submit"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="w-full mt-2 text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
