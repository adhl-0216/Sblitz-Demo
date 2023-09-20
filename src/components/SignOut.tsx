import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";

const SignOut = () => {
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button onClick={handleSignOut} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
