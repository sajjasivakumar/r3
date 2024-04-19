const report = require("multiple-cucumber-html-reporter");
const dayjs = require("dayjs");
const fs = require("fs");
const https = require("https");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

const BASE_URL = "https://open.er-api.com/v6";
const FILE_NAME = "cucumber-json-formatter";

let url = "";
let fileName = FILE_NAME;

switch (os.platform().toLowerCase()) {
  case "win32":
    url = `${BASE_URL}/${FILE_NAME}-windows-amd64`;
    fileName += ".exe";
    break;
  case "darwin":
    url = `${BASE_URL}/${FILE_NAME}-darwin-amd64`;
    break;
  case "linux":
    url = `${BASE_URL}/${FILE_NAME}-linux-amd64`;
    break;
  default:
    console.log("Unsupported platform");
    process.exit(1);
}

const filePath = path.join("./.bin", fileName);
fs.mkdirSync("./.bin", { recursive: true });
const file = fs.createWriteStream(filePath);

https
  .get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("File downloaded and renamed successfully");

      if (
        os.platform().toLowerCase() === "darwin" ||
        os.platform().toLowerCase() === "linux"
      ) {
        exec(`chmod +x ${filePath}`, (error) => {
          if (error) {
            console.log(`Error changing file permission: ${error}`);
          } else {
            console.log("File permission changed successfully");
          }
        });
      }
    });
  })
  .on("error", (err) => {
    fs.unlinkSync(filePath);
    console.log("Error: ", err.message);
  });

const runInfo = JSON.parse(
  fs.readFileSync("cypress/reports/results.json", "utf8"),
);

const getOSName = () => {
  const osNames = {
    darwin: "osx",
    win32: "windows",
    ubuntu: "ubuntu",
    linux: "linux",
  };
  return osNames[runInfo["osName"]] || console.log("Undefined browser");
};

const generateReport = () => {
  report.generate({
    jsonDir: "cypress/reports/json",
    reportPath: "reports",
    metadata: {
      browser: {
        name: runInfo["browserName"],
        version: runInfo["browserVersion"],
      },
      device: "Local Test Machine",
      platform: {
        name: getOSName(),
        version: runInfo["osVersion"],
      },
    },
    customData: {
      title: "Run Info",
      data: [
        { label: "Author", value: "Siva.Sajja" },
        { label: "Project", value: "API Automation Project" },
        { label: "Release", value: "1.0.0" },
        { label: "Cypress Version", value: runInfo["cypressVersion"] },
        { label: "Node Version", value: runInfo["nodeVersion"] },
        {
          label: "Execution Start Time",
          value: dayjs(runInfo["startedTestsAt"]).format(
            "YYYY-MM-DD HH:mm:ss.SSS",
          ),
        },
        {
          label: "Execution End Time",
          value: dayjs(runInfo["endedTestsAt"]).format(
            "YYYY-MM-DD HH:mm:ss.SSS",
          ),
        },
      ],
    },
    disableLog: true,
    pageTitle: "API Execution Cucumber Html Report",
    openReportInBrowser: true,
    displayDuration: true,
  });
};

generateReport();
