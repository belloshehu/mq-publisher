"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const formatter_1 = require("./models/formatter");
const user_1 = __importDefault(require("./models/user"));
const fintechCordinate = {
    lat: 52.493256,
    long: 13.446082,
};
function readUsersText() {
    return __awaiter(this, void 0, void 0, function* () {
        const invited = [""];
        try {
            const data = yield (0, promises_1.readFile)("./data/user.txt", "utf8");
            // parse the user info text
            const f = new formatter_1.TextFormatter(data);
            const lines = f.textToLines();
            lines.forEach(function (user) {
                const { id, lat, long } = f.userStringToObject(user.trim());
                const newUser = new user_1.default(id, lat, long);
                newUser.calculateDistance(fintechCordinate);
                if (isNaN(newUser.distance)) {
                    console.log(`Invalid cordinate`);
                }
                else {
                    if (newUser.isInvited()) {
                        console.log(`${newUser.id} is ${newUser.distance} km and hence invited`);
                        invited.push(newUser.id);
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = readUsersText;
