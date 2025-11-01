export default function ShoppingItem({ item, onToggle, onRemove }) {
  return (
    <li className="flex justify-between items-center border-b py-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={item.done} onChange={onToggle} />
        <span className={item.done ? "line-through text-gray-500" : ""}>
          {item.name}
        </span>
      </label>
      <button className="text-red-500" onClick={onRemove}>
        🗑
      </button>
    </li>
  );
}
