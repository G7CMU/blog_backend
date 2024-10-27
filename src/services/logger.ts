import env from "@root/env";
import chalk from "chalk";

type LogLevel = "info" | "warn" | "error";

const prefix = {
  info: chalk.bgBlue.bold.green(" INFO "),
  warn: chalk.bgYellow.bold.black(" WARN "),
  error: chalk.bgRed.bold.blue(" ERROR "),
};

const log = {
  info(...data: any[]) {
    console.log(prefix['info'], ...data);
  },

  warn(...data: any[]) {
    console.log(prefix['warn'], ...data);
  },

  error(...data: any[]) {
    console.log(prefix['error'], ...data);
  }
}

export default log; 