import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { HiUserAdd } from "react-icons/hi";

interface Props {
  selectedList: string;
}

class Member {
  name: string;
  email: string;
  balance: number;
  constructor(name: string, email: string, balance: number) {
    this.name = name;
    this.email = email;
    this.balance = balance;
  }
}

const ListMembers = ({ selectedList }: Props) => {
  if (selectedList == "") return;

  const [user] = useAuthState(auth);
  const membersColRef = collection(db, user!.uid, selectedList, "Members");
  const [allMembers, setAllMembers] = useState<any[]>([]);

  useEffect(() => {
    let ignore = false;
    const fetchMembers = async () => {
      const qSnap = await getDocs(query(membersColRef));
      setAllMembers([]);

      if (!ignore) {
        qSnap.forEach((doc) => {
          const newMember = doc.data() as Member;
          setAllMembers((curr) => [...curr, { id: doc.id, info: newMember }]);
        });
      }
    };

    fetchMembers();

    return () => {
      ignore = true;
    };
  }, [selectedList]);

  return (
    <div>
      <div className="d-flex">
        {allMembers.length > 0 &&
          allMembers.map((member) => {
            return (
              <div
                className="badge rounded-pill text-bg-primary px-4 py-2 mx-1 align-items-center"
                key={member.id}
              >
                <span className="align-middle"> {member.info.name}</span>
              </div>
            );
          })}
        <div className="text-end">
          <Button variant="primary" className="mx-auto text-center">
            <HiUserAdd></HiUserAdd>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListMembers;
