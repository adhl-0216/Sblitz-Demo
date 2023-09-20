import { useState } from "react";
//Firebase
import { db } from "../FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
//React-bootstrap
import { Button, Form, Stack } from "react-bootstrap";

interface Props {
  user: User;
  listName: string;
  onAdd: (params?: any) => void;
}

const AddItem = ({ user, listName, onAdd }: Props) => {
  const [itemName, setItemName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<string>("50/50");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const listData = {
      name: itemName,
      price: price,
      quantity: quantity,
      type: type,
    };

    const listRef = doc(db, user.uid, listName, "Items");

    if ((await getDoc(listRef)).exists()) {
      await updateDoc(listRef, listData);
    } else {
      await setDoc(listRef, listData);
    }

    onAdd();
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.selectedOptions[0].value;
    console.log(value);
    setType(value);
  };

  return (
    <div className="px-3 m-3">
      <h3 className="">Add Item</h3>

      <Form className="d-flex md-3 ">
        <Stack direction="horizontal" gap={3}>
          <Form.Label>Item</Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            size="sm"
          ></Form.Control>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
          ></Form.Control>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantiy"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
          ></Form.Control>
          <Form.Label>Type</Form.Label>
          <Form.Select
            id="type"
            className="form-select form-select-sm"
            defaultValue={"50/50"}
            onChange={handleSelect}
          >
            <option value="50/50">50/50</option>
            <option value="user1">User A</option>
            <option value="user2">User B</option>
          </Form.Select>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default AddItem;
