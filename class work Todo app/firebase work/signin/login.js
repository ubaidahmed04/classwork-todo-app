
import{auth,signInWithEmailAndPassword,onAuthStateChanged, doc,
    signInWithPopup, GoogleAuthProvider,
  } from "../firebase.js"
  
  let loginbtn = document.getElementById("loginbtn")
  loginbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
  //   let username = document.getElementById('username').value
  
  // Signed in
    signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  
    })
    // ...
    .then(()=>{
        // alert("Register SuccessFully")
    swal({
      title: "Good job!",
      text: "login successful!",
      icon: "success",
  }).then(() => {
      location.replace("../dashboard/dashboard.html");
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
  onAuthStateChanged(auth, (user) => {
      if (user) {
        location.replace("../dashboard/dashboard.html")
        
          const uid = user.uid;
          console.log("userid",user.uid)
        console.log(user)
        console.log(user.displayName)
  
          // location.replace("../dashboard/dashboard.html");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
      } else {
        // User is signed out
        // location.replace("../index.html")
        // ...
      }
    });
    let loginWithGoogle = document.getElementById("loginWithGoogle")
  
    let signInWithGoogle = (e)=>{
      e.preventDefault()
  const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
        // ...
      });
    }
  
    loginWithGoogle.addEventListener('click' ,signInWithGoogle)