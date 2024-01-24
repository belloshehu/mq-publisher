"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatter = void 0;
class TextFormatter {
    // converts text to lines of string
    constructor(textData) {
        this.data = "";
        this.textLines = [""];
        this.data = textData;
    }
    textToLines() {
        try {
            return this.data.split("\n");
        }
        catch (error) {
            console.log(error);
        }
    }
    // extract a user property value from string of key and value separated by colon (":")
    stringToProperty(propertyString) {
        return propertyString.split(":")[1].trim();
    }
    // converts string of user with id, lat long from to object with the same properties
    userStringToObject(userString) {
        const [id, lat, long] = userString.split(",");
        return {
            id: this.stringToProperty(id),
            lat: parseFloat(this.stringToProperty(lat)),
            long: parseFloat(this.stringToProperty(long)),
        };
    }
}
exports.TextFormatter = TextFormatter;
