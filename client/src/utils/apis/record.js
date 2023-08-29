const { getData, postData, putData, deleteData } = require("../services");

const getRecords = async () => {
  try {
    const result = await getData("/csv/get-all-records");
    if (result.status) {
      return result.data.data;
    } else {
      alert(result.message);
      return [];
    }
  } catch (error) {
    alert("Unknown Error");
    return [];
  }
};

const storeRecord = async (payload) => {
  try {
    const result = await postData("/csv/create-record", payload);
    if (result.status) {
      return result.data.data;
    } else {
      alert(result.message);
      return false;
    }
  } catch (error) {
    alert("Unknown Error");
    return false;
  }
};

const updateRecord = async (payload) => {
  const { id, ...rest } = payload;
  try {
    const result = await putData(`/csv/update-record?id=${id}`, rest);
    if (result.status) {
      return result.data.data;
    } else {
      alert(result.message);
      return false;
    }
  } catch (error) {
    alert("Unknown Error");
    return false;
  }
};

const deleteRecord = async (id) => {
  try {
    const result = await deleteData(`/csv/delete-record?id=${id}`);
    if (result.status) {
      return true;
    } else {
      alert(result.message);
      return false;
    }
  } catch (error) {
    alert("Unknown Error");
    return false;
  }
};

export { getRecords, storeRecord, updateRecord, deleteRecord };
