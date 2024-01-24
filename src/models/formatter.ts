export class TextFormatter {
  data = "";
  textLines: [string] = [""];

  // converts text to lines of string
  constructor(textData: string) {
    this.data = textData;
  }

  textToLines() {
    try {
      return this.data.split("\n");
    } catch (error) {
      console.log(error);
    }
  }

  // extract a user property value from string of key and value separated by colon (":")
  stringToProperty(propertyString: string) {
    return propertyString.split(":")[1].trim();
  }

  // converts string of user with id, lat long from to object with the same properties
  userStringToObject(userString: string) {
    const [id, lat, long] = userString.split(",");
    return {
      id: this.stringToProperty(id),
      lat: parseFloat(this.stringToProperty(lat)),
      long: parseFloat(this.stringToProperty(long)),
    };
  }
}
