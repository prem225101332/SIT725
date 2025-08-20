const expect = require("chai").expect;
const request = require("request");
const app = require("../server");

describe("Week6", function () {
    const baseUrl = "http://localhost:3004";

    // Checking if the API server is running
    it("returns status 200 to check if API server works", function(done) {
        request(baseUrl, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    // GET all projects
    it("should return all projects with status 200", function (done) {
        request.get(`${baseUrl}/api/projects`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            
            const responseData = JSON.parse(body);
            expect(responseData).to.have.property("statusCode");
            expect(responseData).to.have.property("data");
            expect(responseData).to.have.property("message");
            expect(responseData.statusCode).to.equal(200);
            expect(responseData.message).to.equal("Success");
            done();
        });
    });

    //creating new project
    it("should create a new project with valid data", function (done) {
        const newProject = {
            title: "Test Project",
            image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?cs=srgb&dl=pexels-pixabay-104827.jpg&fm=jpg",
            link: "About kitten 4",
            description: "Test project created during unit testing for kitten 4"
        };

        const options = {
            url: `${baseUrl}/api/projects`,
            method: 'POST',
            json: true,
            body: newProject
        };

        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.have.property("statusCode");
            expect(body.statusCode).to.equal(201);
            expect(body.message).to.equal("Project created successfully");
            expect(body.data).to.have.property("title", newProject.title);
            done();
        });
    });

    // Getting a project with wrong id to see whether it return 404 error 
    it("should return 404 error for non-existent project ID", function (done) {
        const invalidId = "507f1f77bcf86cd799439011"; 
        request.get(`${baseUrl}/api/projects/${invalidId}`, function (error, response, body) {
            expect(response.statusCode).to.equal(200); 
            
            const responseData = JSON.parse(body);
            expect(responseData).to.have.property("statusCode");
            expect(responseData.statusCode).to.equal(404);
            expect(responseData.message).to.equal("Project not found");
            expect(responseData.data).to.be.null;
            done();
        });
    });
});