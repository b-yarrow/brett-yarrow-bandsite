var shows = [
    { date: new Date('Mon Dec 17 2018'), venue: 'Ronald Lane', location: 'San Fancisco, CA' },
    { date: new Date('Tue Jul 18 2019'), venue: 'Pier 3 East', location: 'San Fancisco, CA' },
    { date: new Date('Fri Jul 22 2019'), venue: 'View Loungue', location: 'San Fancisco, CA' },
    { date: new Date('Sat Aug 12 2019'), venue: 'Hyatt Agency', location: 'San Fancisco, CA' },
    { date: new Date('Fri Sep 05 2019'), venue: 'Moscow Center', location: 'San Fancisco, CA' },
    { date: new Date('Wed Aug 11 2019'), venue: 'Pres Club', location: 'San Fancisco, CA' }
];

function displayTableMobile(table, shows) {
    // get the keys of the show objects
    let showKeys = Object.keys(shows[0]);
    // grab each individual "show" object from array of shows
    for (let show of shows) {

        // loop for each key 
        for (let i = 0; i < showKeys.length; i++) {

            // add row to table and assign class
            let row = table.insertRow();
            row.setAttribute('class', 'shows__tbl-row');

            // add table heading element, assign class and create text object from key array
            let th = document.createElement('th');
            th.setAttribute('class', 'shows__heading');
            let label = document.createTextNode(showKeys[i]);

            // add table data element, assign classes and data depending on number
            let td = document.createElement('td');
            td.setAttribute('class', 'shows__' + showKeys[i]);
            if (i === 0) {
                td.innerHTML = dayFormatLong(show[showKeys[i]]);
            } else {
                td.innerHTML = show[showKeys[i]];
            }
            // append elements together
            th.appendChild(label);

            row.appendChild(th);
            row.appendChild(td);
        }
        // create button object
        let row = table.insertRow();
        row.setAttribute('class', 'shows__tbl-row');
        let td = document.createElement('td');
        td.setAttribute('class', 'shows__button-box shows__button-box--mobile');
        let button = document.createElement('button');
        button.setAttribute('class', 'shows__button');
        button.innerHTML = 'BUY TICKETS';

        // append everything together
        td.appendChild(button);
        row.appendChild(td);

    }
}

function displayTable(table, shows) {
    let showKeys = Object.keys(shows[0]);
    let tHead = table.createTHead();
    let row = tHead.insertRow();
    for (let key of showKeys) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    // let th = document.createElement('th');
    // row.appendChild(th);

    for (let show of shows) {
        let row = table.insertRow();
        for (let key in show) {
            console.log(key);
            let cell = row.insertCell();
            let text = '';
            if (key === 'date') {
                text = document.createTextNode(dayFormatLong(show[key]));
            } else {
                text = document.createTextNode(show[key]);
            }
            cell.appendChild(text);
        }
        let cell = row.insertCell();

        let button = document.createElement('button');
        button.setAttribute('class', 'shows__button');
        button.innerHTML = 'BUY TICKETS';
        cell.appendChild(button);

    }
}

var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
console.log(viewportWidth);
var table = document.querySelector('table');
if (viewportWidth < 768) {
    displayTableMobile(table, shows);
} else {
    displayTable(table, shows);
}

