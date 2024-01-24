import express, { Request, Response } from "express";

const app = express();

app.get("/invited-users", (req: Request, res: Response) => {
  res.send("Sent invitation to users");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});