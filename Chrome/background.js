//Credits to arti
const filter = {urls: ["<all_urls>"]};
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log('wake me up');
});
chrome.webRequest.onHeadersReceived.addListener(logger, filter, ['responseHeaders', 'blocking']);

function logger(details) {
    let newHeaders = details.responseHeaders.filter(header => header.name != "content-disposition");
    return {responseHeaders: newHeaders};
}