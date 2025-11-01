import React, { useState } from "react";
import ShoppingListHeader from "../components/ShoppingListHeader";
import MemberList from "../components/MemberList";
import ShoppingListItems from "../components/ShoppingListItems";

const initialData = {
  id: 1,
  name: "Weekend ",
  owner: { id: 1, name: "Petr" },
  members: [
    { id: 1, name: "Petr" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Tomáš" },
  ],
  items: [
    { id: 1, name: "Mléko", done: false },
    { id: 2, name: "Chléb", done: true },
    { id: 3, name: "Máslo", done: false },
  ],
};

const currentUser = { id: 2, name: "Anna" };

export default function ShoppingListDetail() {
  const [list, setList] = useState(initialData);
  const [showResolved, setShowResolved] = useState(false);
  const isOwner = currentUser.id === list.owner.id;

  const handleRename = (newName) => {
    if (isOwner) setList({ ...list, name: newName });
  };

  const handleAddMember = (name) => {
    if (!isOwner || !name.trim()) return;
    const newMember = { id: Date.now(), name };
    setList({ ...list, members: [...list.members, newMember] });
  };

  const handleRemoveMember = (id) => {
    if (isOwner || id === currentUser.id) {
      const updated = list.members.filter((m) => m.id !== id);
      setList({ ...list, members: updated });
    }
  };

  const handleAddItem = (name) => {
    if (!name.trim()) return;
    const newItem = { id: Date.now(), name, done: false };
    setList({ ...list, items: [...list.items, newItem] });
  };

  const handleRemoveItem = (id) => {
    setList({ ...list, items: list.items.filter((i) => i.id !== id) });
  };

  const handleToggleItem = (id) => {
    const updated = list.items.map((i) =>
      i.id === id ? { ...i, done: !i.done } : i
    );
    setList({ ...list, items: updated });
  };

  return (
    <div className="shoppinglist-container max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <ShoppingListHeader
        name={list.name}
        isOwner={isOwner}
        onRename={handleRename}
        showResolved={showResolved}
        setShowResolved={setShowResolved}
      />

      <MemberList
        members={list.members}
        ownerId={list.owner.id}
        isOwner={isOwner}
        currentUser={currentUser}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />

      <ShoppingListItems
        items={list.items}
        showResolved={showResolved}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
      />
    </div>
  );
}
