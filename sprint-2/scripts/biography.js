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

function displayComment(comment) {
    var head = document.getElementsByClassName('conversation__post-container');
    var post = document.createElement('div');
    post.className = "conversation__image-box";
    console.log(post);
    head.item
    // head.appendChild(post);
    for (element in comment) {
        // console.log(comment[element]); 
    }
}

for (let i = 0; i < commentAry.length; i++) {
    // const element = commentAry[i];
    displayComment(commentAry[i]);

}



// console.log(commentAry);
