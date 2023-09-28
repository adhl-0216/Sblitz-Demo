import { useEffect, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { Member } from "../../classes/Member";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../FirebaseConfig";

interface Props {
  selectedList?: string;
  allMembers: any[];
  setAllMembers: (membersList: any) => void;
}

const ListMembers = ({ selectedList, allMembers, setAllMembers }: Props) => {
  const [user] = useAuthState(auth);
  const uid = user!.uid;
  const [membersList, setMembersList] = useState<Member[]>([]);
  if (selectedList == "") return;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      setMembersList(() => [...allMembers]);
    }

    return () => {
      ignore = true;
      setMembersList([]);
    };
  }, [allMembers]);

  const removeMember = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    const idToRemove = button.value;
    console.log("remove: " + idToRemove);
    setAllMembers(() => {
      return allMembers.filter((member) => member.id != idToRemove);
    });
    if (selectedList != null)
      Member.deleteMember(uid, selectedList, idToRemove);
  };

  return (
    membersList.length > 0 && (
      <div className="d-flex">
        {membersList.map((member) => {
          return (
            <div
              className="badge rounded-pill text-bg-primary mx-1"
              key={member.key}
            >
              <div className="d-flex p-1 align-items-center gap-1">
                <IconContext.Provider value={{ color: member.color }}>
                  <BsFillCircleFill />
                </IconContext.Provider>
                <div className="align-middle"> {member.name}</div>
                <CloseButton
                  variant="white"
                  onClick={removeMember}
                  value={member.id}
                ></CloseButton>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ListMembers;
