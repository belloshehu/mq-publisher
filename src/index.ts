import express, { Request, Response } from "express";
import readUsersText from "./fileHandler";

const app = express();

app.get("/invited-users", async (req: Request, res: Response) => {
  const sent = await readUsersText();
  res.send(`Sent invitation to ${sent?.length} users`);
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
