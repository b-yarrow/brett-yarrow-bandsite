// GLOBAL VARIABLES & ARRAYS

//array containting all event data
var shows = [];

var viewportWidth;  // var storing width of browser window
var table;           // var for HTML table element
var sizedMobile;    // var for tracking if window is in mobile size range (< 768px )

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
 * displayTableMobile Builds an HTML table using the provided shows array, mobile version.
 * @param {*} table the HTML table element
 * @param {*} shows Array containing all event data, each element is one show on the schedule
 */
function displayTableMobile(table, shows) {
    // get the keys of the show objects
    let showKeys = Object.keys(shows[0]);
    // grab each individual "show" object from array of shows
    for (let show of shows) {

        // loop for each key 


        // add row to table and assign class
        let row = table.insertRow();
        row.setAttribute('class', 'shows__tbl-row');

        // add table heading element, assign class and create text object from key array
        let th = document.createElement('th');
        th.setAttribute('class', 'shows__heading');
        let label = document.createTextNode('date');

        // add table data element, assign classes and data depending on number
        let td = document.createElement('td');
        td.setAttribute('class', 'shows__date');
        td.innerHTML = dayFormatLong(show.date);

        // append elements together
        th.appendChild(label);

        row.appendChild(th);
        row.appendChild(td);

        // add row to table and assign class
        row = table.insertRow();
        row.setAttribute('class', 'shows__tbl-row');

        // add table heading element, assign class and create text object from key array
        th = document.createElement('th');
        th.setAttribute('class', 'shows__heading');
        label = document.createTextNode('venue');

        // add table data element, assign classes and data depending on number
        td = document.createElement('td');
        td.setAttribute('class', 'shows__venue');

        td.innerHTML = show.place;
        // append elements together
        th.appendChild(label);

        row.appendChild(th);
        row.appendChild(td);

        // add row to table and assign class
        row = table.insertRow();
        row.setAttribute('class', 'shows__tbl-row');

        // add table heading element, assign class and create text object from key array
        th = document.createElement('th');
        th.setAttribute('class', 'shows__heading');
        label = document.createTextNode('location');

        // add table data element, assign classes and data depending on number
        td = document.createElement('td');
        td.setAttribute('class', 'shows__location');

        td.innerHTML = show.location;
        // append elements together
        th.appendChild(label);

        row.appendChild(th);
        row.appendChild(td);


        // create button object
        row = table.insertRow();
        row.setAttribute('class', 'shows__tbl-row');
        td = document.createElement('td');
        td.setAttribute('class', 'shows__button-box shows__button-box--mobile');
        let button = document.createElement('button');
        button.setAttribute('class', 'shows__button');
        button.innerHTML = 'BUY TICKETS';

        // append everything together
        td.appendChild(button);
        row.appendChild(td);

    }
}
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
    th.setAttribute('class', 'shows__heading');
    let text = document.createTextNode('dates');

    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement('th');
    th.setAttribute('class', 'shows__heading');
    text = document.createTextNode('venue');

    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement('th');
    th.setAttribute('class', 'shows__heading');
    text = document.createTextNode('location');

    th.appendChild(text);
    row.appendChild(th);


    // create individual shows with the show object data
    let tBody = table.createTBody();
    for (let show of shows) {

        row = tBody.insertRow();
        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');

        let cell = row.insertCell();
        cell.setAttribute('class', 'shows__date');

        text = document.createTextNode(show.date);
        cell.appendChild(text);


        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');

        cell = row.insertCell();
        cell.setAttribute('class', 'shows__venue');

        text = document.createTextNode(show.place);
        cell.appendChild(text);


        row.setAttribute('class', 'shows__tbl-row shows__tbl-row--desk');

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
table = document.querySelector('table');

//fetch data from API

axios.get('https://project-1-api.herokuapp.com/showdates' + apiString)
    .then(response => {
        shows = response.data;

        // CHeck browser window size and build appropriate table
        if (viewportWidth < 768) {
            sizedMobile = true;
            displayTableMobile(table, shows);
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

