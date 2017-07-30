import * as Yargs from "yargs";

/** Parse cli arguments. */
export const parse = (): Yargs.Arguments => {
    const argv: Yargs.Arguments = Yargs
        .usage("Usage: peer-review <item-number> [options]\n"
            + "Opens and populates default mail client with peer review email. "
            + "Copies generated email body to clipboard.")
        .help("h")
        .alias("h", "help")
        .version()
        .env("PEER_REVIEW")
        .alias("proj", "project")
        .describe("proj", `Project name to your Visual Studio Team Services project `
            + `(https://<project>.visualstudio.com).`)
        .alias("u", "user")
        .describe("u", "Username for Visual Studio Team Services project.")
        .alias("p", "password")
        .describe("p", "Password for Visual Studio Team Services project.")
        .alias("t", "template")
        .describe("t", "Email markdown template to use.")
        .describe("to", "Recipient of peer review email.")
        .demandCommand(1) // require the work item number
        .demandOption(["template", "project", "user", "password"])
        .example("peer-review 135", "Generates email for work item 135, assuming "
            + "all other options are defined by environment variables.")
        .epilog(`All options can be defined via environment variables prefixed `
            + `with "PEER_REVIEW" (e.g, PEER_REVIEW_PASSWORD).`)
        .argv;
    return argv;
};
