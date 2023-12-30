
  
import{getAuth,auth ,db,createUserWithEmailAndPassword ,signInWithEmailAndPassword,
    onAuthStateChanged,signOut ,sendEmailVerification, getFirestore,setDoc ,doc} from "./firebase.js"
  
    let signupbtn = document.getElementById("register")
    signupbtn.addEventListener('click',(e)=>{
      e.preventDefault()
      let email = document.getElementById('email').value
      let password = document.getElementById('password').value
      let username = document.getElementById('username').value
      
      createUserWithEmailAndPassword(auth, email, password)
     
  
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      return setDoc(doc(db,"users",`${user.uid}`),{
         username:username, 
        email:email,
          password:password,
      })
      // ...
  })
  .then(()=>{
      // alert("Register SuccessFully")
      swal({
        title: "Good job!",
        text: "Registration successful!",
        icon: "success",
     }).then(() => {
        location.replace("./dashboard/dashboard.html");
     })
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      swal({
        title: "OHH Error!",
      text: errorMessage,
        icon: "error",
        button: "OK",
      });
      // ..
    });
    })
  