const chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../src/app.js");
const should = chai.should();
const { TEST_DATABASE_URL, TEST_TOKEN, TEST_TOKEN_UPT } = require("../src/config.js");
const knex = require("knex");

chai.use(chaiHttp);

// setup of DB
describe("Express App", () => {
    let db;

    before("make knex instance", () => {
        db = knex({
            client: "pg",
            connection: TEST_DATABASE_URL
        });
        return app.set("db", db);
    });

    // Tests post for register
    it("should return a 200 status message from POST for creating a new user/", () => {
        let fakeUser = {
            company: "Test Company",
            street: "1234 W. Fourth St.",
            city: "Glendale",
            state: "Az",
            zip: "85308",
            email: "test@email.com",
            phone: "602-881-2412",
            password: "testtest",
            role: "tenant",
            managerName: "Monsters, Inc",
            managerId: 1,
            groupId: 1,
        };

        chai
            .request(app)
            .post("/registration/new")
            .send(fakeUser)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
            });
    });

    // Tests Get manager list
    it("should return a message from GET all managers in a list/", done => {
        chai
            .request(app)
            .get("/registration/new")
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
                done();
            });
    });

    // Tests post for login
    it("should return a 200 status message from POST for login/", () => {
        let fakeUser = {
            email: "Bobs@BobTheBuilder.com",
            password: "test",
        };

        chai
            .request(app)
            .post("/auth/login/")
            .set("authorization", `bearer ${TEST_TOKEN}`)
            .send(fakeUser)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
            });
    });

    // Tests Get for bills
    it("should return a message from GET for all bills/", done => {
        chai
            .request(app)
            .get("/bills/2")
            .set("authorization", `bearer ${TEST_TOKEN}`)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
                done();
            });
    });

    // Tests Get for all messages
    it("should return a message from GET for all messages/", done => {
        chai
            .request(app)
            .get("/messages/2")
            .set("authorization", `bearer ${TEST_TOKEN}`)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
                done();
            });
    });

    // Tests Post for sending a message
    it("should return a 200 status message from POST for sending a message/", () => {
        let fakeMessage = {
            date: "April 2, 2020",
            to: "Bob Builders, Inc",
            toUserId: 2,
            from: "Monsters, Inc",
            fromUserId: 1,
            subject: "test Subject",
            subjectId: 1,
            messageContent: "Test of message body",
            groupId: 1
        };

        chai
            .request(app)
            .post("/messages/2")
            .set("authorization", `bearer ${TEST_TOKEN}`)
            .send(fakeMessage)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
            });
    });

    // Tests Get for contact information
    it("should return a message from GET all contact info/", done => {
        chai
            .request(app)
            .get("/contacts/data/2")
            .set("authorization", `bearer ${TEST_TOKEN}`)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
                done();
            });
    });

    // Tests Post for updating all contact info except password
    it("should return a 200 status message from POST updating user contact info/", () => {
        let fakeUpdate = {
            company: "Test Company, Inc",
            street: "1234 W. Fifth St.",
            city: "Scottsdale",
            state: "Az",
            zip: "85254",
            email: "testUpdate@email.com",
            phone: "602-881-1234",
        };

        chai
            .request(app)
            .post("/contacts/data/2")
            .set("authorization", `bearer ${TEST_TOKEN_UPT}`)
            .send(fakeUpdate)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
            });
    });

    // Tests Post for updating only the password
    it("should return a 200 status message from POST updating password /", () => {
        let fakePassword = {
            password: "testChange",
        };

        chai
            .request(app)
            .post("/contacts/change/2")
            .set("authorization", `bearer ${TEST_TOKEN_UPT}`)
            .send(fakePassword)
            .end((err, res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a("object");
            });
    });

});

