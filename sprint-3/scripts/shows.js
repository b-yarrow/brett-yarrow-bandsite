// GLOBAL VARIABLES & ARRAYS


var shows = [];         //array containing all event data
var viewportWidth;      // var storing width of browser window
var table;              // var for HTML table element
var sizedMobile;        // var for tracking if window is in mobile size range (< 768px )

// FUNCTION DECLARATIONS //

/**
 * addEvent adds an Event Listener to an object or element.  It is bad practice to simply override 
 * the window.onresize function.
 * source: https://stackoverflow.com/a/3150139
 * 
 * @param {*} object the eelement or window object
 * @param {*} type resize, scroll (event type)
 * @param {*} callback the function reference
 */
var addEvent = function (object, type, callback) {
    if (object == null || typeof (object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on" + type] = callback;
    }
};

/**
 * displayTable Builds an HTML table using the provided shows array, tablet & desktop version.
 * @param {*} table the HTML table element
 * @param {*} shows Array containing all event data, each element is one show on the schedule
 */
function displayTable(table, shows) {
    // get keys from show object and print as a table header
    let showKeys = Object.keys(shows[0]);
    let tHead = table.createTHead();
    let row = tHead.insertRow();
    row.setAttribute('class', 'shows__tbl-row');

    let th = document.createElement('th');
    th.setAttribute('class', 'shows__heading shows__heading--desk');
    let text = document.createTextNode('dates');

    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement('th');
    th.setAttribute('class', 'shows__heading shows__heading--desk');
    text = document.createTextNode('venue');

    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement('th');
    th.setAttribute('class', 'shows__heading shows__heading--desk');
    text = document.createTextNode('location');

    th.appendChild(text);
    row.appendChild(th);

    let cell;
    // create individual shows with the show object data
    let tBody = table.createTBody();
    for (let show of shows) {

        row = tBody.insertRow();
        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');
        row.setAttribute('id', show.id);

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__heading shows__heading--mobile');
        text = document.createTextNode('date');
        cell.appendChild(text);

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__date');
        text = document.createTextNode(show.date);
        cell.appendChild(text);


        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__heading shows__heading--mobile');
        text = document.createTextNode('venue');
        cell.appendChild(text);

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__venue');
        text = document.createTextNode(show.place);
        cell.appendChild(text);


        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__heading shows__heading--mobile');
        text = document.createTextNode('location');
        cell.appendChild(text);

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__location');
        text = document.createTextNode(show.location);
        cell.appendChild(text);

        // create button object
        cell = row.insertCell();
        cell.setAttribute('class', 'shows__button-box');
        let button = document.createElement('button');
        button.setAttribute('class', 'shows__button');
        button.innerHTML = 'BUY TICKETS';
        cell.appendChild(button);
    }
}

// START OF PROGRAM //

viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// table = document.querySelector('table');
table = document.querySelector('#shows-table');

//fetch data from API
axios.get('https://project-1-api.herokuapp.com/showdates' + apiString)
    .then(response => {
        shows = response.data;

        // CHeck browser window size and build appropriate table
        if (viewportWidth < 768) {
            sizedMobile = true;
            // displayTableMobile(table, shows);
            displayTable(table, shows);
        } else {
            displayTable(table, shows);
            sizedMobile = false;
        }
    });



/**
 * addEvent will reload the page and build a new table if the window has been resized below
 * or above 768 px width.  sizedMobile will prevent unneccessary refreshes and rebuilds if 
 * window ins resized but does not cross the 768px threshold.
 */
addEvent(window, "resize", function (event) {
    viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('resized');
    if (!sizedMobile && viewportWidth < 768) {
        location.reload();
        displayTableMobile(table, shows);
        sizedMobile = true;
    } else if (sizedMobile && viewportWidth >= 768) {
        location.reload();
        displayTable(table, shows);
        sizedMobile = false;
    }
});


