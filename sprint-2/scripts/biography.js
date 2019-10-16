commentObj = {
    name: '',
    timestamp: 0,
    comment: ''
}

commentAry = [{
    name: 'Theodore Duncan',
    date: new Date('11/15/2018'),
    comment: 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s deﬁnitely my favorite ever!'
},
{
    name: 'Gary Wong',
    date: new Date('12/12/2018'),
    comment: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
},
{
    name: 'Michael Lyons',
    date: new Date('12/18/2018'),
    comment: 'They BLEW the ROOF off at their last show, once everyone started ﬁguring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
}

];

function dayFormat(day) {
    var dayArray = [];

    dayArray.push((day.getMonth() + 1) < 10 ? '0' + (day.getMonth() + 1) : (day.getMonth() + 1));
    dayArray.push(day.getDate());
    dayArray.push(day.getFullYear());

    return dayArray.join('/');
}

function displayComment(entry) {
    //create comment structure
    var head = document.getElementsByClassName('conversation__post-container')[0];
    var newPost = document.createElement('div');
    var imgBox = document.createElement('div');
    var img = document.createElement('img');
    var textBox = document.createElement('div');
    var header = document.createElement('header');
    var name = document.createElement('h2');
    var date = document.createElement('h5');
    var comment = document.createElement('p');


    //assign classes
    newPost.setAttribute('class', 'conversation__post');
    imgBox.setAttribute('class', 'conversation__image-box');
    img.setAttribute('class', 'conversation__image');
    img.setAttribute('src', './assets/images/blank.jpg');
    textBox.setAttribute('class', 'conversation__text-box');
    header.setAttribute('class', 'conversation__header');
    name.setAttribute('class', 'conversation__name');
    date.setAttribute('class', 'conversation__date');
    comment.setAttribute('class', 'conversation__comment');

    //add content
    name.innerHTML = entry['name'];
    date.innerHTML = dayFormat(entry['date']);
    comment.innerHTML = entry['comment'];


    //append together
    imgBox.appendChild(img);
    newPost.appendChild(imgBox);

    header.appendChild(name);
    header.appendChild(date);

    textBox.appendChild(header);
    textBox.appendChild(comment);

    newPost.appendChild(textBox);

    head.appendChild(newPost);
}

for (let i = 0; i < commentAry.length; i++) {
    displayComment(commentAry[i]);

}

// displayComment(commentAry[0]);

// console.log(commentAry);
