
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDka3jh-bt4HnyS8Vsrw37_5Yv0LKOCZrw",
    authDomain: "testowytest54321.firebaseapp.com",
    databaseURL: "https://testowytest54321.firebaseio.com",
    projectId: "testowytest54321",
    storageBucket: "",
    messagingSenderId: "263916415273"
  };
  firebase.initializeApp(config);

var database = firebase.database(); /* realtime - database */
const outputHeader= document.querySelector('#header-app');
const inputTextFIeld = document.querySelector('#choice-app');
const inputMailFIeld = document.querySelector('#mail-app');
const saveButton = document.querySelector('#save-button');
const loadButton = document.querySelector('#load-button');
var listingBox = document.querySelector('#lead-listing');

var ref = database.ref('dane');
ref.on('value', gotData, errData);

function gotData (data){
  listingBox.innerHTML = "";
  var dane = data.val();  //odnosnik do tablicy z dodanymi rekordami
  var keys = Object.keys(dane);  
  
  for (var i = 0; i < keys.length; i++){
      var k = keys[i];
      var name = dane[k].username;
      var mail  = dane[k].email;
      listingBox.innerHTML += `<p>${name} ${mail} <button class="delBtn ${i}">Del</button></p>`
  }
  console.log(dane)
   var deleteButton = document.querySelectorAll('.delBtn');
   
   [].forEach.call(deleteButton, function(value){
        value.addEventListener('click', function(e){
              var thisObj = e.target.classList[1];
              var firebaseRef = firebase.database().ref('dane/' +  keys[thisObj] );
                firebaseRef.remove().then(function(){
                    console.log("remove succeeded");
                }).catch(function(error){
                    console.log("remove failed: " + error);
                })
        })
   })
}

function errData (err) {
    console.log('Error!');
    console.log(err);
}




// Dodawanie do bazy danych kolejnych rekordów + update 

saveButton.addEventListener('click', function(){
  writeNewPost();
});

function writeNewPost(name, email ) {
  // A post entry.
    const textToSave = inputTextFIeld.value;
    const mailToSave = inputMailFIeld.value;
    var postData = {
    username: textToSave,
    email: mailToSave,
    };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('dane').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/dane/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}


    


