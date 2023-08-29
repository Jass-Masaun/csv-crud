const router = require("express").Router();

const _controller = require("../controllers/csv");

router.post("/create-record", _controller.createRecord);
router.get("/get-all-records", _controller.getAllRecords);
router.get("/get-record", _controller.getRecordById);
router.put("/update-record", _controller.updateExistingRecord);
router.delete("/delete-record", _controller.deleteRecord);

module.exports = router;
