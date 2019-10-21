function dayFormat(day) {
    let dayArray = [];

    dayArray.push((day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1));
    dayArray.push(day.getDate());
    dayArray.push(day.getFullYear());

    return dayArray.join('/');
}

function dayFormatLong(day) {
    let dayArray = [];

    let dowArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    dayArray.push(dowArray[day.getDay()]);

    dayArray.push(monthArray[day.getMonth()]);
    dayArray.push(day.getDate());
    dayArray.push(day.getFullYear());

    return dayArray.join(' ');
}