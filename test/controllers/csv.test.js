process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("CRUD Operations", () => {
  describe("CRUD Record", () => {
    let recordId;

    it("should get all records available in csv", async () => {
      const res = await chai.request(server).get("/api/v1/csv/get-all-records");
      expect(res).to.have.status(200);
      expect(res?.body?.data).to.be.an("array");
    });

    it("should store record in csv", async () => {
      const newRecord = {
        first_name: "Test",
        last_name: "Testing",
        email: "test@example.com",
        age: "23",
        date_of_birth: "2000-08-16",
      };

      const res = await chai
        .request(server)
        .post("/api/v1/csv/create-record")
        .send(newRecord);

      const { id, ...rest } = res?.body?.data;
      recordId = id;

      expect(res).to.have.status(201);
      expect(JSON.stringify(rest)).to.deep.equal(JSON.stringify(newRecord));
    });

    it("should get record", async () => {
      const res = await chai
        .request(server)
        .get(`/api/v1/csv/get-record?id=${recordId}`);

      expect(res).to.have.status(200);
      expect(res.body?.data?.id).to.equal(recordId);
    });

    it("should update record", async () => {
      const res = await chai
        .request(server)
        .put(`/api/v1/csv/update-record?id=${recordId}`)
        .send({
          first_name: "testing",
        });

      expect(res).to.have.status(200);
      expect(res.body?.data?.first_name).to.equal("testing");
    });

    it("should delete record", async () => {
      const res = await chai
        .request(server)
        .delete(`/api/v1/csv/delete-record?id=${recordId}`);

      expect(res).to.have.status(200);
      expect(res.body?.message).to.equal("Record deleted");
    });
  });
});
