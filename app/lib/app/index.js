"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = __importDefault(require("./load"));
const PATH = "--path";
const VERSION = "--version";
const { argv = [] } = process;
const param = argv[2];
if (param === PATH) {
    (0, load_1.default)(argv[3]).run();
}
else if (param === VERSION) {
    console.log("0.0.10");
}
