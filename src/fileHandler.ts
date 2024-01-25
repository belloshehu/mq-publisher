import { readFile } from "fs/promises";
import { TextFormatter } from "./models/formatter";
import Customer from "./models/customer";

const fintechCordinate = {
  lat: 52.493256,
  long: 13.446082,
};

class CustomerFileHandler {
  private filePath = "";
  private data = "";
  private formatter: TextFormatter;
  private invitedCustomers: string[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.formatter = new TextFormatter();
    this.invitedCustomers = [];
  }

  async readFile() {
    try {
      this.data = await readFile(this.filePath, "utf8");
    } catch (error) {
      console.log("error reading file...", error);
    }
  }

  async getUsersStringArray() {
    try {
      await this.readFile();
      return this.formatter.textToLines(this.data);
    } catch (error) {
      console.log("error converting users text to array...", error);
    }
  }

  async getInvitedUsers() {
    try {
      const lines = (await this.getUsersStringArray()) as string[];
      lines.forEach((customer) => {
        const { id, lat, long } = this.formatter.userStringToObject(
          customer.trim()
        );
        const newCustomer = new Customer(id, lat, long);
        newCustomer.calculateDistance(fintechCordinate);

        if (isNaN(newCustomer.distance)) {
          console.log(
            `Customer with ID ${newCustomer.id} has invalid cordinate`
          );
        } else {
          if (newCustomer.isInvited()) {
            this.invitedCustomers.push(newCustomer.id);
          }
        }
      });
      return this.invitedCustomers;
    } catch (error) {
      console.log("Failed to get invited customers ...", error);
    }
  }
}

export default CustomerFileHandler;
