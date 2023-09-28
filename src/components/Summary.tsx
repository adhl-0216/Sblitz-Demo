import { Card } from "react-bootstrap";
import { Member } from "../classes/Member";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Item } from "../classes/Item";

interface Props {
  allMembers: Member[];
  allItems: any[];
}

const Summary = ({ allMembers, allItems }: Props) => {
  //   const [memberBalances, setMemberBalances] = useState<number[]>([]);

  //   useEffect(() => {
  //     let ignore = false;

  //     if (!ignore) {
  //       allMembers.map((member) => {
  //         setMemberBalances((curr) => {
  //           return [...curr, member.balance];
  //         });
  //       });
  //     }

  //     return () => {
  //       ignore = true;
  //     };
  //   }, [allMembers]);

  return (
    <div>
      <h2>Summary</h2>
      {allMembers.map((member) => {
        let balance = 0;
        allItems.forEach((item) => {
          if (item.type == member.id) {
            balance += Number(item.price * item.quantity);
          }
        });

        return (
          <Card key={member.id}>
            <Card.Body className="d-inline-flex align-items-center gap-2">
              <IconContext.Provider value={{ color: member.color }}>
                <BsFillCircleFill />
              </IconContext.Provider>
              <Card.Text>
                {member.name} | &euro; {balance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Summary;
