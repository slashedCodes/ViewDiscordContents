//Hide error script.

document.getElementById('error-content').classList.add('hidden');


//shitass spam

document.getElementById('setup-form1-continue').onclick = function() {setPage(1)};
document.getElementById('setup-form2-continue').onclick = function() {setPage(2)};
document.getElementById('setup-form4-continue').onclick = function() {setPage(4)};
document.getElementById('setup-form-done').onclick = function() {endSetup()};

document.getElementById('setup-form3-yes').onclick = function() {securitySelect(true)};
document.getElementById('setup-form3-no').onclick = function() {securitySelect(false)};

document.getElementById('method-radio1').onclick = function() {methodSelect(0)};
document.getElementById('method-radio2').onclick = function() {methodSelect(1)};

document.getElementById('logging-radio1').onclick = function() {loggingSelect(2)};
document.getElementById('logging-radio2').onclick = function() {loggingSelect(1)};
document.getElementById('logging-radio3').onclick = function() {loggingSelect(0)};

//a

async function start() {

    
    
    //console.log(json);

    if (json.initialize) {
        try {
            json.initialize = false;
            await writeJson();
            console.log(await browser.storage.local.get("config"));
            log("initialized"); 
        } catch (error) {
            console.error(error);
        }        
    }

    if (json.firsttime === true) {
        unHide("setup-content");
        setPage(0);
    } else {
        unHide("main-content");
    }
}

let json = {
    "initialize": true,
    "firsttime": true,
    "viewingmethod": 0,
    "security": true,
    "logginglevel": 2,
    "viewedsites": 0
};

/* 
A viewing method of 0 is removing the content-disposition header.
A viewing method of 1 is changing the url to media.discordapp.net

A logging level of 0 is no logging.
A logging level of 1 is normal logging.
A logging level of 2 is verbose logging.
*/

let form = document.getElementById("setup-content");

var pages = [];
for(let i = 0; i < form.children.length; i++){
  pages[i] = form.children[i];
  pages[i].classList.add("hidden");
}

function unHide(obj) {
    document.getElementById(obj).classList.remove('hidden');
}

function endSetup() {
    changeJson("firsttime", false);
    writeJson();
    window.close();
}

function setPage(num) {
    verboselog("Changing page to: " + num);
    pages.forEach(page => page.classList.add("hidden"));
    pages[num].classList.remove("hidden");
}

function changeDisable(button, bool) {
    button.disabled = bool;
}

function changeJson(key, value) {
    // i hate this function -- art0007i
    verboselog("Changed json value of " + key + " from " + json[key] + " to " + value + ".")
    json[key] = value;

}

function methodSelect(num) {
    changeDisable(document.getElementById('setup-form2-continue'), false);
    switch(num) {
        case 0:
            verboselog("User chose content-disposition.");
            break;
        case 1:
            verboselog("User chose media.discord.app");
            break;
    }
    changeJson("viewingmethod", num);
}

async function loggingSelect(num) {
    changeDisable(document.getElementById('setup-form4-continue'), false);
    switch(num) {        
        case 0:
            veboselog("No Logging.");
            break;
        case 1:
            verboselog("Normal Logging.");
            break;
        case 2:
            verboselog("Verbose Logging.");
            break;
    }

    changeJson("logginglevel", num);
}

function securitySelect(bool) {
    setPage(3);
    if(bool) {
        verboselog("Security enabled.");
    } else {
        verboselog("Security disabled.");
    }
    changeJson("security", bool);
}

async function writeJson() {
    //write the value of json to the json config file.
    await browser.storage.local.set(json)
        .then(setItem, onError);

    
}

function onError() {
    console.error("error while writing json: " + error);
}

function setItem() {
    verboselog("saved json successfully");
}

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

log("Intialized. Starting main functions.");
//start();

browser.storage.local.get(json)
    .then((item)=>{
        verboselog("Loaded json.");
        console.log(item); // doing this instead of log because it formats the json better.
        json = item;
        start();
    }, onError);

