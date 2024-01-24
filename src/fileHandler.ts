import { readFile } from "fs/promises";
import { TextFormatter } from "./models/formatter";
import User from "./models/user";

const fintechCordinate = {
  lat: 52.493256,
  long: 13.446082,
};

async function readUsersText() {
  const invited: [string] = [""];
  try {
    const data = await readFile("./src/data/users.txt", "utf8");

    // parse the user info text
    const formatter = new TextFormatter(data);
    const lines = formatter.textToLines() as [string];

    lines.forEach(function (user) {
      const { id, lat, long } = formatter.userStringToObject(user.trim());
      const newUser = new User(id, lat, long);
      newUser.calculateDistance(fintechCordinate);

      if (isNaN(newUser.distance)) {
        console.log(`User with ID ${newUser.id} has invalid cordinate`);
      } else {
        if (newUser.isInvited()) {
          invited.push(newUser.id);
        }
      }
    });
    return invited;
  } catch (error) {
    console.log(error);
  }
}

export default readUsersText;
