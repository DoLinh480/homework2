import React, { useState } from "react";

export default function ShoppingListItems({
  items,
  showResolved,
  onAddItem,
  onRemoveItem,
  onToggleItem,
}) {
  const [newItem, setNewItem] = useState("");

  const visibleItems = showResolved ? items : items.filter((i) => !i.done);

  return (
    <div className="itemlist-section">
      <h3 className="itemlist-title font-semibold mb-2">Položky seznamu</h3>

      <ul className="itemlist-list space-y-1">
        {visibleItems.map((i) => (
          <li
            key={i.id}
            className="itemlist-item flex justify-between items-center border rounded px-2 py-1"
          >
            <div className="itemlist-left flex items-center">
              <input
                type="checkbox"
                className="itemlist-checkbox mr-2"
                checked={i.done}
                onChange={() => onToggleItem(i.id)}
              />
              <span
                className={`itemlist-name ${
                  i.done ? "line-through text-gray-500" : ""
                }`}
              >
                {i.name}
              </span>
            </div>
            <button
              onClick={() => onRemoveItem(i.id)}
              className="itemlist-remove text-red-500 text-sm"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="itemlist-add mt-3 flex space-x-2">
        <input
          className="itemlist-input border rounded px-2 flex-1"
          placeholder="Nová položka"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className="itemlist-addbtn bg-green-500 text-white px-3 rounded"
          onClick={() => {
            onAddItem(newItem);
            setNewItem("");
          }}
        >
          ➕
        </button>
      </div>
    </div>
  );
}
