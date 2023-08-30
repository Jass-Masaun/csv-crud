import React, { useState, useEffect } from "react";

import Form from "../components/Form";

import { deleteRecord, getRecords } from "../utils/apis/record";

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [editedUserData, setEditedUserData] = useState(null);

  const openForm = (setNull = true) => {
    setIsFormOpen(true);
    if (setNull) {
      setEditedUserData(null);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const addUserData = (data) => {
    setUserData([...userData, data]);
    closeForm();
  };

  const editUserData = (index) => {
    setEditedUserData(userData[index]);
    openForm(false);
  };

  const updateUserData = (updatedData) => {
    const newData = userData.map((data) => {
      if (data.id === updatedData.id) {
        return updatedData;
      }
      return data;
    });
    setUserData(newData);
  };

  const removeUserData = async (id) => {
    const result = await deleteRecord(id);
    if (result) {
      const newData = userData.filter((data) => data.id !== id);
      setUserData(newData);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      const records = await getRecords();
      setUserData(records);
    };

    fetchRecords();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">User Data</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        onClick={openForm}
      >
        Add Data
      </button>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{data.first_name}</td>
              <td className="border p-2 text-center">{data.last_name}</td>
              <td className="border p-2 text-center">{data.email}</td>
              <td className="border p-2 text-center">{data.age}</td>
              <td className="border p-2 text-center">{data.date_of_birth}</td>
              <td className="border p-2 text-center">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => editUserData(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeUserData(data.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <Form
          closeForm={closeForm}
          addUserData={addUserData}
          editedUserData={editedUserData}
          updateUserData={updateUserData}
        />
      )}
    </div>
  );
};

export default Home;
