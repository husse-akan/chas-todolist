export default function List({ listItems, handleDelete, handleDone }) {
  return listItems.map((item) => (
    <li key={item.id} style={{ display: "inline-flex", gap: "0.5rem" }}>
      <p
        style={
          item.done
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {item.task}
      </p>
      <button onClick={() => handleDone(item)}>done</button>
      <button onClick={() => handleDelete(item)}>-</button>
    </li>
  ));
}
