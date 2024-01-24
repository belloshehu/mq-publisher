"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileHandler_1 = __importDefault(require("./fileHandler"));
const app = (0, express_1.default)();
app.get("/invited-users", (req, res) => {
    (0, fileHandler_1.default)();
    res.send("Sent invitation to users");
});
app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
