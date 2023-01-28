"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neovim_1 = require("@chemzqm/neovim");
const logger = require("../util/logger")("attach");
let app;
function default_1(options) {
    const nvim = (0, neovim_1.attach)(options);
    nvim.on("notification", async (method, args) => {
        const opts = args[0] || args;
        const bufnr = opts.bufnr;
        const buffers = await nvim.buffers;
        const buffer = buffers.find((b) => b.id === bufnr);
        if (method === "refresh_content") {
            const winline = await nvim.call("winline");
            const currentWindow = await nvim.window;
            const winheight = await nvim.call("winheight", currentWindow.id);
            const cursor = await nvim.call("getpos", ".");
            const renderOpts = await nvim.getVar("mkdp_preview_options");
            const pageTitle = await nvim.getVar("mkdp_page_title");
            const theme = await nvim.getVar("mkdp_theme");
            const name = await buffer.name;
            const content = await buffer.getLines();
            const currentBuffer = await nvim.buffer;
            app.refreshPage({
                bufnr,
                data: {
                    options: renderOpts,
                    isActive: currentBuffer.id === buffer.id,
                    winline,
                    winheight,
                    cursor,
                    pageTitle,
                    theme,
                    name,
                    content,
                },
            });
        }
        else if (method === "close_page") {
            app.closePage({
                bufnr,
            });
        }
        else if (method === "open_browser") {
            app.openBrowser({
                bufnr,
            });
        }
    });
    nvim.on("request", (method, args, resp) => {
        if (method === "close_all_pages") {
            app.closeAllPages();
        }
        resp.send();
    });
    nvim.channelId
        .then(async (channelId) => {
        await nvim.setVar("mkdp_node_channel_id", channelId);
    })
        .catch((e) => {
        logger.error("channelId: ", e);
    });
    return {
        nvim,
        init: (param) => {
            app = param;
        },
    };
}
exports.default = default_1;
