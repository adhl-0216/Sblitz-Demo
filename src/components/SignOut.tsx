import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";

interface Props {
  className?: string;
}

const SignOut = ({ className }: Props) => {
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className={className}>
      <button onClick={handleSignOut} className="btn btn-primary">
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
