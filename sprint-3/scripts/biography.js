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
    var footer = document.createElement('footer');
    var likeBox = document.createElement('div');
    var likeBtn = document.createElement('button');
    var likeValue = document.createElement('span');
    var deleteBtn = document.createElement('button');


    //assign classes
    newPost.setAttribute('class', 'conversation__post');
    newPost.setAttribute('id', `${entry.id}`);
    imgBox.setAttribute('class', 'conversation__image-box');
    img.setAttribute('class', 'conversation__image');
    // img.setAttribute('src', './assets/images/' + entry.avatar);
    img.setAttribute('src', './assets/images/blank.jpg');
    textBox.setAttribute('class', 'conversation__text-box');
    header.setAttribute('class', 'conversation__header');
    name.setAttribute('class', 'conversation__name');
    date.setAttribute('class', 'conversation__date');
    comment.setAttribute('class', 'conversation__comment');

    footer.setAttribute('class', 'conversation__footer');
    likeBox.setAttribute('class', 'conversation__like-container');
    likeBtn.setAttribute('class', 'conversation__like');
    likeValue.setAttribute('class', 'conversation__like-value');
    deleteBtn.setAttribute('class', 'conversation__delete');

    //add content
    name.innerHTML = entry.name;
    date.innerHTML = dynamicTimestamp(entry.timestamp);
    // date.innerHTML = dayFormat(entry.timestamp);
    comment.innerHTML = entry.comment;

    likeBtn.innerHTML = 'like';
    likeValue.innerHTML = entry.likes;
    deleteBtn.innerHTML = 'delete';


    //append together
    imgBox.appendChild(img);
    newPost.appendChild(imgBox);

    header.appendChild(name);
    header.appendChild(date);

    likeBox.appendChild(likeValue);
    likeBox.innerHTML += '&nbsp;&#8226;&nbsp';
    likeBox.appendChild(likeBtn);

    footer.appendChild(likeBox);
    footer.appendChild(deleteBtn);


    textBox.appendChild(header);
    textBox.appendChild(comment);
    textBox.appendChild(footer);

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

    likeButtonListeners();
    deleteButtonListeners();




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


function likeButtonListeners() {
    var likeButtons = document.getElementsByClassName('conversation__like');


    for (button of likeButtons) {
        button.addEventListener("click", function (e) {
            //this function does stuff
            // console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'));
            // console.log(e.target.closest(".conversation__post").getAttribute('id'));
            let id = e.target.closest(".conversation__post").getAttribute('id');
            axios.put(`https://project-1-api.herokuapp.com/comments/${id}/like${apiString}`).then(response => {
                commentAry.find(o => o.id === id).likes = response.data.likes;
                flushComments();
                buildComments();

            });
        });
    };
}

function deleteButtonListeners() {
    var deleteButtons = document.getElementsByClassName('conversation__delete');


    for (button of deleteButtons) {
        button.addEventListener("click", function (e) {
            //this function does stuff
            // console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'));
            // console.log(e.target.closest(".conversation__post").getAttribute('id'));
            let id = e.target.closest(".conversation__post").getAttribute('id');
            axios.delete(`https://project-1-api.herokuapp.com/comments/${id}${apiString}`).then(response => {
                commentAry.splice(commentAry.indexOf(commentAry.find(o => o.id === id)), 1);
                flushComments();
                buildComments();

            });
        });
    };
}


// Builds comments on initial page load
axios.get('https://project-1-api.herokuapp.com/comments' + apiString).then(response => {
    commentAry = response.data;

    for (let i = 0; i < commentAry.length; i++) {
        displayComment(commentAry[i]);
    }

    likeButtonListeners();
    deleteButtonListeners();

});





