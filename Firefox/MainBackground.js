console.log('niggers');

let json = {
} //json variable



browser.storage.local.get("config")
    .then((item)=>{
        verboselog("Loaded json.");
        console.log(item); // doing this instead of log because it formats the json better.
        json = item;
        initialize();
    }, onError);


function verboselog(msg) {
    if (json.logginglevel >= 2) {
        console.log("[DiscordContentViewer/VerboseLog] " + msg);
    }
}

function log(msg) {
    if (json.logginglevel >= 1) {
        console.log("[DiscordContentViewer/Log] " + msg);
    }
}

function initialize() {
    const filter = {urls: ["<all_urls>"]};
    browser.webRequest.onHeadersReceived.addListener(main, filter, ['responseHeaders', 'blocking']);
}

function main(details) {
    json.viewedsites = json.viewedsites + 1;
    verboselog(details);

    if (json.viewingmethod === 0) {
        verboselog("Content-disposition method is removing the header.");
        let newHeaders = details.responseHeaders.filter(header => header.name != "content-disposition");
        return {responseHeaders: newHeaders};
    }
    if (json.viewingmethod === 1) {
        verboselog("Media.discord.app method is changing the url.");
        window.location.host = "media.discordapp.net";
    }

    writeJson();
}


async function writeJson() {
    await browser.storage.local.set({viewedsites: json.viewedsites})
        .then(log("Changed json."), onError);
}

function onError(err) {
    console.error(err);
}