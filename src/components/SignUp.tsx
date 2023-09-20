import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../FirebaseConfig";

const SignUp = () => {
  const handleClick = async () => {
    // Initialize the FirebaseUI Widget using Firebase.

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="container text-center mx-auto p-3">
      <button onClick={handleClick} className="btn btn-primary">
        Sign In
      </button>
    </div>
  );
};

export default SignUp;
