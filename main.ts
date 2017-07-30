#!/usr/bin/env electron

/**
 * Script to prepare email for peer review. Pulls PBI name from TFS and pre-populates
 * email in default mail client.
 * TFS API:
 * curl -u username:password
 * https://<project>.visualstudio.com/DefaultCollection/_apis/wit/workitems?api-version=1.0&ids=200&fields=System.Title
 */
import { app as App, clipboard as Clipboard } from "electron";
import * as FS from "fs";
import * as MarkdownIt from "markdown-it";
import * as Opn from "opn";
import * as Request from "request";

interface Options {
    item: number;
    user: string;
    pw: string;
    project: string;
    to: string;
    template: string;
}

/** Generate peer review email from markdown template. */
export const generate = (opts: Options): void => {
    const FIELD_TITLE = "System.Title";
    const options = {
        auth: {
            pass: opts.pw,
            user: opts.user,
        },
        method: "GET",
        qs: { "api-version": "1.0" },
        url: `https://${opts.project}.visualstudio.com/DefaultCollection/`
            + `_apis/wit/workitems?api-version=1.0&ids=${opts.item}&fields=${FIELD_TITLE}`,
    };

    Request(options, (_error: {}, _response: {}, body: string): void => {
        const json = JSON.parse(body).value[0];
        const id = json.id;
        const title = json.fields[FIELD_TITLE];
        const subject = `Peer Review Item #${id} - ${title}`;
        const msg = `<I've copied the markdown template to your clipboard!>`;

        const md = new MarkdownIt();
        // NOTE: can't put html in mailto body
        const template: string = FS.readFileSync(opts.template, "utf-8");
        const populatedTemplate: string = template.replace("#?", `#${id} - ${title}`);
        const templateMd: string = md.render(populatedTemplate);
        Clipboard.writeHTML(templateMd);
        Opn(`mailto:?to=${opts.to || ""}&subject=${subject}&body=${msg}`, { wait: false });
        App.quit();
    });
};
