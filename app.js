console.log('this is the magic notes website');
showNotes();

// if user adds some note, add it to the localStorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");  // this step states that if there is any notes in the local storage fetch it.
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value); // if someone clicks on add notes button then this step will update the notes.
    localStorage.setItem("notes", JSON.stringify(notesObj)); // this step will update the localStorage.
    addTxt.value = ""; // this step will keep the textarea  blank after updation bcoz if i dont do it, the area will remain filled with text.
    // console.log(notesObj);
    showNotes();

});

// Function to show elements from localStorage.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Notes ${index + 1}</h5>
                            <p class="card-text">${element}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
                        </div>
                </div>`;
        // the above html += `..noteCard..` is used because after saving the notes in the localStorage you have to show that notes on the website in the same card format.
        // this.id is used to send the id of a given element to a desired place.

    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show use "Add note" to write your notes.`
    }
}


// Function to delete a note.
function deleteNote(index) {
    // console.log("i m deleting", index);

    // the below text, i took it from showNotes() function because if i wanna delete a note i have to have all that notes so that i can delete it.
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);  // notesObj here is a variable which have of the my notes.
    }

    notesObj.splice(index, 1); // The splice() method adds and/or removes array elements.
    localStorage.setItem("notes", JSON.stringify(notesObj)); // this line is used here to again update the localStorage
    showNotes();

}


// Enabling filter text in search bar

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    // when we added an eventListener to input area it started to fire the input event when there are any changes in that area.
    let inputVal = search.value.toLowerCase(); // this statement enables us to see the changes in the input area/ input values when it gets fired and then store it into inputVal variable.
    // console.log('input event fired!', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText; // this line is used to get the paragraph content(our notes) and save it in the cardTxt variable.   // .innerText is used to get careTxt as string bcoz without using .innerText cardTxt is an element.
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})

/* Additional features

1. Add title
2. Mark a note as important
3. Separate notes by user
4. Sync and host to a web server

*/