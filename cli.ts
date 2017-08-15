#!/usr/bin/env node

/**
 * Entry point for CLI.
 * Validate args and kick off electron process so user doesn't have to invoke
 * electron directly.
 */

import * as Child from "child_process";
import * as Path from "path";
import * as Yargs from "yargs";
import * as Args from "./arg-parsing";

// Parse cli args before requiring running electron.
const argv: Yargs.Arguments = Args.parse();

Child.exec(`./node_modules/.bin/electron ${Path.join(__dirname, "cli-electron.js")} ` + process.argv.slice(2),
    (err: Error, stdout: string, errout: string) => {
    console.log("Error:", errout);
});
