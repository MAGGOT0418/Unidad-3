const request = require("supertest");
const app = require("../app"); // Adjust the path to your Express app
const User = require("../models/users"); // Assuming you have a User model

describe("User API", () => {
  // Clear the database before each test
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  // Create a new user
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    };

    const res = await request(app)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toBe(201); // Created
  });

  // Try to create another user with the same email
  it("should return an error if the email is already in use", async () => {
    const existingUser = {
      name: "Jane Doe",
      email: "janedoe@example.com",
      password: "password",
    };

    await request(app)
      .post("/api/users")
      .send(existingUser)
      .set("Accept", "application/json");

    const response = await request(app)
      .post("/api/users")
      .send(existingUser)
      .set("Accept", "application/json");

    expect(response.status).toBe(400); // Bad request
  });

  // Get all users
  it("should return an array of users", async () => {
    const response = await request(app)
      .get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

});
