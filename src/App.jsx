import { useState, useEffect } from "react";
import List from "./components/List";

let counter = 0;

export default function App() {
  const [listItems, setListItems] = useState(() => {
    const saved = localStorage.getItem("listItems");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [userText, setUserText] = useState({});

  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

  function handleUserText(e) {
    setUserText(e.target.value);
    console.log({ userText });
  }

  function handleSetList(e) {
    if (userText !== "") {
      e.preventDefault();
      setListItems([
        ...listItems,
        { id: counter++, task: userText, done: false },
      ]);
    }
  }

  function handleDone(item) {
    // Svår del jag behöver öva.
    const updatedListItems = listItems.map((i) => {
      if (i.id === item.id) {
        return { ...i, done: !i.done };
      }
      return i;
    });
    setListItems(updatedListItems);
  }

  function handleDelete(item) {
    setListItems(listItems.filter((i) => i.id !== item.id));
  }

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="inputTask">Add task: </label>
        <input
          type="text"
          name="inputTask"
          id="inputTask"
          placeholder="Type your text here."
          onChange={handleUserText}
        />
        <button onClick={handleSetList}>+</button>
      </form>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        <List
          listItems={listItems}
          handleDelete={handleDelete}
          handleDone={handleDone}
        />
      </ul>
    </div>
  );
}
