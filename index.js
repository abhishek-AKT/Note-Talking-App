// if user adds a notes add it to the localstorage
showNotes();

// jyare ek pachi ek notes ne localstorage ma store karavi hoy tyare tene ek array banavi ne tema store karavi levo
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];  // notesObj name no ek array banvyo
    }
    else{
         notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text:  addTxt.value
    }
    notesObj.push(myObj) // notes ni andar ek notes ne push kari  
    // notesObj pela array hato te have object no array bani gayo che

    localStorage.setItem('notes', JSON.stringify(notesObj)); // notes ne localstorage ma set kari notes ne local storage ma store karva mate tene pela string ma convert karvi pade tyar bad te add thai shake 
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj); // notes ek array che 
    showNotes();
})


// function to show element from localstorage
function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj =[];  // notesObj name no ek array banvyo
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element , index){
        html += `<div class="notecard my-2 mx-2 card" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deletNotes(this.id)" class="btn btn-primary">Delet Note</button>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes.`;
    }
}

// Function for deletNotes 
function deletNotes(index) {
    // console.log("I am Deleting" , index);
    let del = confirm("Are you sure want to delet this");
    if(del){
        let notes = localStorage.getItem('notes');
        if(notes == null){
            notesObj =[];  // notesObj name no ek array banvyo
        }
        else{
            notesObj = JSON.parse(notes);
        }
    
        notesObj.splice(index,1); // splice function be input le first start kyathi karvanu che and second ketla element delet karvana che te 
        localStorage.setItem('notes', JSON.stringify(notesObj));  // aapane localstorage ne pan update karvu padshe
        showNotes();
    }
}


//making search functionality
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    // input event etale aapane jem jem type karshu tem te fired thashe and te elelemtn ne search karshe 
    let inputVal = search.value.toLowerCase();
    // console.log("Input Event fired!" , inputVal);  
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let titleTxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal) || titleTxt.includes(inputVal) ){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
        // console.log(cardTxt);
    })
})

/*

// for colorfull background
document.addEventListener('mousemove',function(e){
    // console.log(e.offsetX,e.offsetY);
    let offsetZ = Math.sqrt(e.offsetX + e.offsetY);
    document.body.style.backgroundColor =`rgb(${e.offsetX},${e.offsetY},${offsetZ})`;

    // getElementsByClassName('card').style.backgroundColor = `rgb(${e.offsetX},${e.offsetY},154)`;
    // let card = this.getElementsByClassName('card');
    // card.style.backgroundColor=`rgb(${e.offsetX},${e.offsetY},154)`;
    // console.log('you Move your mouse');
})

*/