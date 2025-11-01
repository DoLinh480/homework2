import React, { useState } from "react";

export default function ShoppingListHeader({
  name,
  isOwner,
  onRename,
  showResolved,
  setShowResolved,
}) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    onRename(newName);
    setEditing(false);
  };

  return (
    <div className="shoppinglist-header flex justify-between items-center border-b pb-2">
      {editing ? (
        <div className="shoppinglist-header-edit flex space-x-2">
          <input
            className="shoppinglist-header-input border rounded px-2"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            className="shoppinglist-header-save bg-blue-500 text-white px-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <h2 className="shoppinglist-header-title text-xl font-bold">
          {name}{" "}
          {isOwner && (
            <button
              className="shoppinglist-header-editbtn text-sm text-gray-500 ml-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
        </h2>
      )}

      <label className="shoppinglist-header-filter text-sm">
        <input
          type="checkbox"
          checked={showResolved}
          onChange={(e) => setShowResolved(e.target.checked)}
        />{" "}
        Show resolved 
      </label>
    </div>
  );
}
