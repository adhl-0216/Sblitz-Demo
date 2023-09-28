import React, { useState } from "react";
// import { Item } from "../App";
import { AiFillEdit } from "react-icons/ai";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { auth, db } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Member } from "../../classes/Member";
import { Button, Card, Form, Stack } from "react-bootstrap";

interface Props {
  item: any;
  onPosted: (params?: any) => void;
  selectedList: string;
  allMembers: Member[];
}

const ListItem = ({ item, selectedList, allMembers }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState<Number>(item.price);
  const [quantity, setQuantity] = useState<Number>(item.quantity);
  const [type, setType] = useState(item.type);

  const id = item.docId;

  const [user] = useAuthState(auth);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const item = {
      name: name,
      price: price,
      quantity: quantity,
      type: type,
    };
    const docRef = doc(db, user!.uid, selectedList, "Items", id);
    setDoc(docRef, item);
    setIsActive((curr) => !curr);
  };

  const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const select = e.target as HTMLSelectElement;
    console.log(select.value);
    console.log(price);
  };

  return (
    <Card>
      <Card.Body className="d-inline-flex">
        <Form>
          <Button variant="none" onClick={handleEdit}>
            {isActive ? <BsFillCloudArrowUpFill /> : <AiFillEdit />}
          </Button>
          <fieldset disabled={!isActive} className="d-inline-flex p-2">
            <Form.Control
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            <Form.Label className="p-2">Price(&euro;)</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={price.toFixed(2)}
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Form.Control>
            <Form.Label className="p-2">Quantity</Form.Label>
            <Form.Control
              type="number"
              className="form-control"
              value={Number(quantity)}
              onChange={(e) => setQuantity(Number(e.target.value))}
            ></Form.Control>
          </fieldset>
          <Form.Select
            id="type"
            defaultValue={item.type}
            onChange={handleSelect}
          >
            <option value="Equal Split">Equal Split</option>
            {allMembers.map((member) => {
              if (item.type == member.name) {
                return (
                  <option key={member.key} value={member.id} selected>
                    {member.name}
                  </option>
                );
              }
              return (
                <option key={member.key} value={member.id}>
                  {member.name}
                </option>
              );
            })}
          </Form.Select>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
