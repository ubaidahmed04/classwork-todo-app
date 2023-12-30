import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {auth,doc,onAuthStateChanged,signOut,collection, addDoc,getDoc,db ,query,where , updateDoc ,deleteDoc ,deleteField ,onSnapshot ,getDocs} from "../firebase.js"
let name = document.getElementById("name")
// let main = document.getElementById("main")
// let loader = document.getElementById("loader")
let DeleteAllbtn = document.getElementById("DeleteAllbtn")
let todoArray = []
const firebaseConfig = {
        apiKey: "AIzaSyCLcTooIOuWhV3zVoicJlm82bX711BmqE8",
        authDomain: "new-login-project-b5de9.firebaseapp.com",
        projectId: "new-login-project-b5de9",
        storageBucket: "new-login-project-b5de9.appspot.com",
        messagingSenderId: "440992145032",
        appId: "1:440992145032:web:e49b4812c8996e994b493d"
    };
    const app = initializeApp(firebaseConfig);
    var uid ;
onAuthStateChanged(auth, async(user) => {
    if(!user){
    location.replace("../index2.html")
  } 
   else if (user) {
        // main.style.display ="block"
        // loader.style.display ="none"
         uid = user.uid;
        console.log("userid",uid)
        console.log("username",user.displayName)
        // name.innerHTML = user.displayName
        console.log(user)
filterTodo(uid)

const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  // console.log(user.uid)
  name.innerHTML = docSnap.data().username;

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
        // name.innerHTML = user.email.slice(0,user.emial.indexOf("@"))

    } 
})
// console.log(username)
let signoutbtn  = document.getElementById("signoutbtn");
function signout(){
// const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  location.replace("../signin/login2.html")
}).catch((error) => {
  // An error happened.
  console.log(error)
});
}
signoutbtn.addEventListener('click',signout)

// new code 

let list = document.getElementById("list")
// console.log(delbtn)
let todoFunc = async() =>{
    let todo = document.getElementById("todo")
    let addTodo = document.getElementById("addTodo")
    // console.log(todo.value)
    // todo.value = ""
    const docRef = await addDoc(collection(db, "generateTodo"), {
        newtodo:todo.value,
        uid ,

      });
      
      console.log("Document written with ID: ",docRef.id);
        
    }
    let getAlltodo = () =>{
      const q = collection(db, "generateTodo");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const generateTodo = [];
        list.innerHTML = ""
        querySnapshot.forEach((doc) => {
          generateTodo.push(doc.data().newtodo);
          // list.innerHTML += ` <li class="list-group-item">${doc.data().newtodo} <button class="delbtn btn btn-primary">delete</button> <button class="editbtn btn btn-success">edit</button></li>`
          
        });
      
      });
}
getAlltodo();

addTodo.addEventListener('click' ,todoFunc)

async function deletebtn (){
  let delbtn = document.querySelectorAll(".delbtn")
  // console.log(delbtn)
  
  const q = collection(db, "generateTodo");
  const querySnapshot = await getDocs(q);
// console.log(querySnapshot.docs)
  delbtn.forEach((delElem,i) => {
    delElem.addEventListener("click",()=>delBtnFunc(querySnapshot.docs[i].id))
    // console.log(querySnapshot.docs[i].id,"doc")
   
  });
}
// npm install -g create-react-app
// create-react-app "project name"
// cd   project name
// npm start 

async function delBtnFunc (id){
  // console.log(id)
  await deleteDoc(doc(db, "generateTodo", id));
}
let deleteAllbtn = document.getElementById("deleteAllbtn")
async function deleteAllTodoFunc(){
  const q = collection(db, "generateTodo");
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs)
  querySnapshot.docs.forEach((doc) => {
    // console.log(doc.id)
    deleteAllTodo(doc.id)
  });

}
async function deleteAllTodo(id){
  await deleteDoc(doc(db, "generateTodo", id));
}
deleteAllbtn.addEventListener('click' ,deleteAllTodoFunc)


async function editTodo (){
  let editbtn = document.querySelectorAll(".editbtn")
  // console.log(editbtn)
  
  const q = collection(db, "generateTodo");
  const querySnapshot = await getDocs(q);
// console.log(querySnapshot.docs)
editbtn.forEach((editElem,i) => {
    editElem.addEventListener("click",()=>editBtnFunc(querySnapshot.docs[i].id))
    // console.log(querySnapshot.docs,"doc")
  });
}

async function editBtnFunc (id){
  console.log(id)
const docRef = doc(db, "generateTodo", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  let edit = prompt("Enter Your update Todo",docSnap.data().newtodo)
  
  
  console.log("Document data:", docSnap.data().newtodo);
  const washingtonRef = doc(db, "generateTodo", id);
  if (!edit.trim() ){
    edit = prompt("Enter Your update Todo",docSnap.data().newtodo)

   }
   else if(!edit){
    edit = docSnap.data().newtodo
   }
   
  await updateDoc(washingtonRef, {
    newtodo: edit

  });

} else {
  console.log("No such document!");
}
}


// todos filter 
// const q = query(collection(db, "users"), where("userId", "==", uid));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const generateTodo = [];
//       querySnapshot.forEach((doc) => {
//           console.log(doc.data(),"data");
//       }); 
//     })

// async function filterTodo (){

  // const docRef = await addDoc(collection(db, "generateTodo"), {
  //   newtodo:todo.value,
  //   uid ,
  // });
  
  // console.log("Document written with ID: ",docRef.id);
    function filterTodo (uid){
      const q = query(collection(db, "generateTodo"), where("uid", "==",uid ));
      console.log(uid,"uid");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const generateTodo = [];
        querySnapshot.forEach((doc) => {
          generateTodo.push(doc.data());

          console.log(generateTodo,"generateTodo",doc.data(),"data")
          list.innerHTML += ` <li class="list-group-item">${doc.data().newtodo} <button class="delbtn btn btn-primary">delete</button> <button class="editbtn btn btn-success">edit</button></li>`
        });
        deletebtn()
        editTodo()
        console.log("Current todo in CA: ", generateTodo.join(", "));
      });
}
