const { v4: uuidv4 } = require("uuid");

const { HttpSuccess, HttpError } = require("../handlers/apiResponse");
const { errors } = require("../handlers/errors");

const { readCSV, writeCSV } = require("../utils/csv");
const { handleValidationResult } = require("../utils/validator");

const { createRecordCsv } = require("../validators/csv");

const createRecord = async (req, res, next) => {
  try {
    handleValidationResult(createRecordCsv, req.body);
    const newData = req.body;
    newData.id = uuidv4();

    const data = readCSV();
    data.push(newData);

    writeCSV(data);

    const response = new HttpSuccess("Record stored", newData, 201);
    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllRecords = async (req, res, next) => {
  try {
    const data = readCSV();

    const response = new HttpSuccess("All records", data, 200);
    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const data = readCSV();
    const record = data.find((entry) => entry.id === id);

    if (!record) {
      const { name, code } = errors[404];
      throw new HttpError("Record not found", name, [], code);
    }

    const response = new HttpSuccess("User record", record, 200);
    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateExistingRecord = async (req, res, next) => {
  try {
    const { id } = req.query;
    const updatedData = req.body;

    const data = readCSV();
    const index = data.findIndex((entry) => entry.id === id);

    if (index === -1) {
      const { name, code } = errors[404];
      throw new HttpError("Record not found", name, [], code);
    }

    data[index] = { ...data[index], ...updatedData };
    writeCSV(data);

    const response = new HttpSuccess(
      "Record updated",
      {
        id,
        ...updatedData,
      },
      200
    );
    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.query;

    const data = readCSV();
    const index = data.findIndex((entry) => entry.id === id);

    if (index === -1) {
      const { name, code } = errors[404];
      throw new HttpError("Record not found", name, [], code);
    }

    data.splice(index, 1)[0];
    writeCSV(data);

    const response = new HttpSuccess("Record daleted", null, 200);
    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateExistingRecord,
  deleteRecord,
};
