import { Card } from "react-bootstrap";
import { Member } from "../classes/Member";
import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";

interface Props {
  allMembers: Member[];
  allItems: any[];
  typeChanged: any;
  setItemUpdated: (params?: any) => void;
}

const Summary = ({
  allMembers,
  allItems,
  typeChanged,
  setItemUpdated: setTypeChanged,
}: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    let ignore = false;
    let total = 0;
    if (!ignore) {
      allItems.map((item) => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    }

    return () => {
      ignore = true;
      setTypeChanged(false);
    };
  }, [allItems, typeChanged]);

  return (
    <div>
      <h2>Summary</h2>

      <h3>Total: &euro; {totalPrice.toFixed(2)}</h3>
      {allMembers.map((member) => {
        let balance = 0;
        allItems.forEach((item) => {
          if (item.type == "Equal")
            balance += Number((item.price * item.quantity) / allMembers.length);
          else if (item.type.id == member.id) {
            balance += Number(item.price * item.quantity);
          }
        });

        return (
          <Card key={member.id}>
            <Card.Body className="d-inline-flex align-items-center gap-2">
              <IconContext.Provider value={{ color: member.color }}>
                <BsFillCircleFill />
              </IconContext.Provider>
              <span>{member.name}</span>
              <span className="ms-auto">&euro; {balance.toFixed(2)}</span>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Summary;
