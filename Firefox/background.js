//Credits to arti
const filter = {urls: ["<all_urls>"]};
browser.webRequest.onHeadersReceived.addListener(main, filter, ['responseHeaders', 'blocking']);

function main(details) {
    let newHeaders = details.responseHeaders.filter(header => header.name != "content-disposition");
    return {responseHeaders: newHeaders};
}