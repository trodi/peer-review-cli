#!/usr/bin/env electron

import { app as App } from "electron";
import * as Yargs from "yargs";
import * as Args from "./arg-parsing";
import * as Main from "./main";

const argv: Yargs.Arguments = Args.parse();
Main.generate({
    item: Number(argv._[0]),
    project: argv.url,
    pw: argv.p,
    template: argv.t,
    to: argv.to,
    user: argv.u,
});
