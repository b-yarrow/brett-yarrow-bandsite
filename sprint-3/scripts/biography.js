// Comment Object prototype, to make adding new objects easier
function commentObj(name, comment, id, likes, timestamp) {
    this.name = name;
    this.comment = comment;
    this.id = id;
    this.likes = likes;
    this.timestamp = timestamp;
}

//Array of comments, will be populated with api server data
commentAry = [];

/**
 * displayComment builds a new comment block, creates all needed html element, assigns classes
 * and appends them together.
 * @param {*} entry - a comment object
 */
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
    // img.setAttribute('src', './assets/images/' + entry.avatar);
    img.setAttribute('src', './assets/images/blank.jpg');
    textBox.setAttribute('class', 'conversation__text-box');
    header.setAttribute('class', 'conversation__header');
    name.setAttribute('class', 'conversation__name');
    date.setAttribute('class', 'conversation__date');
    comment.setAttribute('class', 'conversation__comment');

    //add content
    name.innerHTML = entry.name;
    date.innerHTML = dynamicTimestamp(entry.timestamp);
    // date.innerHTML = dayFormat(entry.timestamp);
    comment.innerHTML = entry.comment;


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

/**
 * form event listener, gets data from forms, adds new entry to comment array, deletes the 
 * html comments from the page, then rebuilds the entire list of comments.  Finally clears
 * the form fields
 */
const form = document.getElementById('commentForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let userName = e.target.commentName.value;
    // let userImage = document.getElementsByClassName('conversation__image--create')[0].getAttribute('src');
    // let imgStr = userImage.slice(userImage.lastIndexOf('/') + 1, userImage.length);
    let commentText = e.target.commentText.value;
    // let postComment = new commentObj(userName, commentText, apiKey, 0, new Date().getTime());

    axios.post('https://project-1-api.herokuapp.com/comments' + apiString, { name: userName, comment: commentText })
        .then(response => {


            commentAry.push(response.data);

            flushComments();
            buildComments();

            e.target.commentName.value = '';
            e.target.commentText.value = '';

        });

});


/**
 * Builds the stored comments posted in the comments array
 */
function buildComments() {

    for (let i = 0; i < commentAry.length; i++) {
        displayComment(commentAry[i]);
    }
}

//clears all comments from the page
function flushComments() {
    let postContainer = document.getElementsByClassName('conversation__post-container')[0];
    let list = document.getElementsByClassName('conversation__post-container')[0].childNodes;
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].nodeType !== 3) {
            postContainer.removeChild(list[i]);
        }
    }
}



// Builds comments on initial page load
axios.get('https://project-1-api.herokuapp.com/comments' + apiString).then(response => {
    commentAry = response.data;

    for (let i = 0; i < commentAry.length; i++) {
        displayComment(commentAry[i]);
    }
});


// console.log(dynamicTimestamp(new Date('Sept 26 2019')));
// console.log(dynamicTimestamp(new Date('Sept 27 2019')));
// console.log(dynamicTimestamp(new Date('Sept 28 2019')));
// console.log(dynamicTimestamp(new Date('Sept 29 2019')));
// console.log(dynamicTimestamp(new Date('Sept 30 2019')));
// console.log(dynamicTimestamp(new Date('Oct 1 2019')));
// console.log(dynamicTimestamp(new Date('Oct 2 2019')));
// console.log(dynamicTimestamp(new Date('Oct 3 2019')));
// console.log(dynamicTimestamp(new Date('Oct 4 2019')));
// console.log(dynamicTimestamp(new Date('Oct 5 2019')));
// console.log(dynamicTimestamp(new Date('Oct 6 2019')));
// console.log(dynamicTimestamp(new Date('Oct 7 2019')));
// console.log(dynamicTimestamp(new Date('Oct 8 2019')));
// console.log(dynamicTimestamp(new Date('Oct 9 2019')));
// console.log(dynamicTimestamp(new Date('Oct 10 2019')));
// console.log(dynamicTimestamp(new Date('Oct 11 2019')));
// console.log(dynamicTimestamp(new Date('Oct 12 2019')));
// console.log(dynamicTimestamp(new Date('Oct 13 2019')));
// console.log(dynamicTimestamp(new Date('Oct 14 2019')));
// console.log(dynamicTimestamp(new Date('Oct 15 2019')));
// console.log(dynamicTimestamp(new Date('Oct 16 2019')));
// console.log(dynamicTimestamp(new Date('Oct 17 2019')));
// console.log(dynamicTimestamp(new Date('Oct 18 2019')));
// console.log(dynamicTimestamp(new Date('Oct 19 2019')));
// console.log(dynamicTimestamp(new Date('Oct 20 2019')));
// console.log(dynamicTimestamp(new Date('Oct 21 2019')));
// console.log(dynamicTimestamp(new Date('Oct 22 2019')));
// console.log(dynamicTimestamp(new Date('Oct 23 2019')));
// console.log(dynamicTimestamp(new Date('Oct 24 2019')));

// YYYY - MM - DDTHH: MM: SSZ

// console.log(dynamicTimestamp(new Date('2019-10-24T00:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T01:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T02:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T03:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T04:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T05:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T06:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T07:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T08:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T09:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T10:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T11:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T12:00:00Z')));

// console.log(dynamicTimestamp(new Date('2019-10-24T13:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T14:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T15:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T16:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T17:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T18:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T19:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T20:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T21:00:00Z')));
// console.log(dynamicTimestamp(new Date('2019-10-24T22:00:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:00:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:01:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:02:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:03:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:04:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:05:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:06:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:07:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:08:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:09:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:10:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:11:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:12:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:13:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:14:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:15:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:16:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:17:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:18:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:19:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:20:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:21:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:22:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:23:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:24:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:25:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:26:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:27:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:28:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:29:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:30:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));
console.log(dynamicTimestamp(new Date('2019-10-24T23:31:00Z')));







// console.log(dynamicTimestamp(new Date('Aug 24 2019')));
// console.log(dynamicTimestamp(new Date('Jul 24 2019')));
// console.log(dynamicTimestamp(new Date('Jun 24 2019')));
// console.log(dynamicTimestamp(new Date('May 24 2019')));
// console.log(dynamicTimestamp(new Date('Apr 24 2019')));
// console.log(dynamicTimestamp(new Date('Mar 24 2019')));
// console.log(dynamicTimestamp(new Date('Feb 24 2019')));
// console.log(dynamicTimestamp(new Date('Jan 24 2019')));
// console.log(dynamicTimestamp(new Date('Dec 24 2018')));
// console.log(dynamicTimestamp(new Date('Nov 24 2018')));
// console.log(dynamicTimestamp(new Date('Oct 24 2018')));
// console.log(dynamicTimestamp(new Date('Aug 24 2019')));



// console.log(dynamicTimestamp(new Date('Sept 25 2019')));
// console.log(dynamicTimestamp(new Date('Sept 26 2019')));










