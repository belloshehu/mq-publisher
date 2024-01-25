import express, { Request, Response } from "express";
import Producer from "./mq/publish";
import { PublishMessage } from "./types";
import UserFileHandler from "./fileHandler";

// create producer instance
const producer = new Producer();
const customerFileHandler = new UserFileHandler("./src/data/customers.txt");

const app = express();

app.get("/invited-customers", async (req: Request, res: Response) => {
  // get array of invited users ID
  const invitedCustomers = await customerFileHandler.getInvitedUsers();

  // publish message to rabbitmq server
  producer.publishMessage(
    "invitedCustomers",
    invitedCustomers as PublishMessage
  );

  res.send(`Sent invitation to ${invitedCustomers?.length} customers`);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
