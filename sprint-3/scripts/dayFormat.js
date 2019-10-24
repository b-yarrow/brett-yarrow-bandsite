var daysInMonths = [
    31, //jan
    28, //feb
    31, //mar
    30, //apr
    31, //may
    30, //jun
    31, //jul
    31, //aug
    30, //sep
    31, //oct
    30, //nov
    31 //dec
];

function dayFormat(dayMilli) {
    let dayArray = [];
    let day = new Date(dayMilli);

    // dayArray.push((day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1));
    dayArray.push((day.getMonth() + 1));
    dayArray.push(day.getDate());
    dayArray.push(day.getFullYear());

    return dayArray.join('/');
}

function dayFormatLong(dayMilli) {
    let dayArray = [];
    let day = new Date(dayMilli);

    let dowArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    dayArray.push(dowArray[day.getDay()]);

    dayArray.push(monthArray[day.getMonth()]);
    dayArray.push(day.getDate());
    dayArray.push(day.getFullYear());

    return dayArray.join(' ');
}

function dynamicTimestamp(time) {
    let timeDay = new Date(time).getDate();
    let timeMonth = new Date(time).getMonth();
    let timeYear = new Date(time).getFullYear();

    let now = new Date();
    let nowDay = new Date().getDate();
    let nowMonth = new Date().getMonth();
    let nowYear = new Date().getFullYear();

    let nowMillisec = new Date().getTime();

    let yearDiff = nowYear - timeYear;
    let monthDiff = nowMonth - timeMonth + 12 * yearDiff;

    let hourMsec = 3600000;
    let minMsec = 60000;

    // let moreThanOneYear = new Date(`${nowMonth + 1} ${nowDay} ${nowYear - 1}`)
    let moreThanOneYear = new Date();
    moreThanOneYear.setFullYear(nowYear - 1);
    let moreThanOneMonth = new Date();
    moreThanOneMonth.setMonth(nowMonth - 1);
    let moreThanOneWeek = new Date();
    moreThanOneWeek.setDate(nowDay - 7);
    let moreThanOneDay = new Date();
    moreThanOneDay.setDate(nowDay - 1);
    // console.log(moreThanOneDay);

    let dayDiff = nowDay - timeDay + daysInMonths[timeMonth] * monthDiff;

    // console.log(dayDiff);


    // console.log(timeDay, timeMonth, timeYear);
    // console.log(nowDay, nowMonth, nowYear);

    if (time < moreThanOneYear) {
        return `${yearDiff} ${yearDiff > 1 ? 'years' : 'year'} ago.`;
    } else if (time < moreThanOneMonth) {
        return `${monthDiff} ${monthDiff > 1 ? 'months' : 'month'} ago.`;
    } else if (time < moreThanOneWeek) {
        return `${Math.floor(dayDiff / 7)} ${dayDiff > 13 ? 'weeks' : 'week'} ago.`;
    } else if (time < moreThanOneDay) {
        return `${dayDiff} ${dayDiff > 1 ? 'days' : 'day'} ago.`;
    } else if (now - time > hourMsec) {
        return `${Math.floor((now - time) / hourMsec)} ${Math.floor((now - time) / hourMsec) > 1 ? 'hours' : 'hour'} ago.`;
    } else if (now - time > minMsec) {
        return `${Math.floor((now - time) / minMsec)} ${Math.floor((now - time) / minMsec) > 1 ? 'minutes' : 'minute'} ago.`;
    } else {
        return 'Just now.';
    }

}
