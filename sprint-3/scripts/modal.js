// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    let tbl = document.getElementById('ticket-table');
    let list = document.getElementById('ticket-table').childNodes;

    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].nodeType !== 3) {
            tbl.removeChild(list[i]);
        }
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}