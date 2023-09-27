import SignUp from "./components/SignUp";
import MainUI from "./components/MainUI";

import { auth } from "./FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user] = useAuthState(auth);

  return <>{user == null ? <SignUp></SignUp> : <MainUI></MainUI>}</>;
};

export default App;
