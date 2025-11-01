import React, { useState } from "react";
import { SHOPPING_LIST } from "../data/shoppingList";
import ShoppingItem from "../components/ShoppingItem";
import MemberList from "../components/MemberList";

export default function ShoppingListDetail() {
  const currentUser = "alice@example.com"; // simulace přihlášeného uživatele
  const [list, setList] = useState(SHOPPING_LIST);
  const [filter, setFilter] = useState("all");
  const [newItemName, setNewItemName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const isOwner = currentUser === list.owner;

  const handleRename = (newName) => {
    if (isOwner) setList({ ...list, name: newName });
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newItemName,
      done: false,
    };
    setList({ ...list, items: [...list.items, newItem] });
    setNewItemName("");
  };

  const handleRemoveItem = (id) => {
    setList({ ...list, items: list.items.filter((i) => i.id !== id) });
  };

  const handleToggleDone = (id) => {
    setList({
      ...list,
      items: list.items.map((i) =>
        i.id === id ? { ...i, done: !i.done } : i
      ),
    });
  };

  const handleAddMember = () => {
    if (isOwner && newMemberEmail && !list.members.includes(newMemberEmail)) {
      setList({ ...list, members: [...list.members, newMemberEmail] });
      setNewMemberEmail("");
    }
  };

  const handleRemoveMember = (email) => {
    if (isOwner) {
      setList({
        ...list,
        members: list.members.filter((m) => m !== email),
      });
    } else if (email === currentUser) {
      // člen odchází
      alert("Odešel jste ze seznamu.");
    }
  };

  const filteredItems =
    filter === "all" ? list.items : list.items.filter((i) => !i.done);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        {isOwner ? (
          <input
            className="text-2xl font-bold border-b focus:outline-none"
            value={list.name}
            onChange={(e) => handleRename(e.target.value)}
          />
        ) : (
          <h1 className="text-2xl font-bold">{list.name}</h1>
        )}
        <div className="text-sm text-gray-500">
          Vlastník: {list.owner === currentUser ? "Vy" : list.owner}
        </div>
      </header>

      {/* Filtrování */}
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          Všechny
        </button>
        <button
          className={`px-3 py-1 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("active")}
        >
          Pouze nevyřešené
        </button>
      </div>

      {/* Položky */}
      <ul className="space-y-2">
        {filteredItems.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={() => handleToggleDone(item.id)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ul>

      {/* Přidání položky */}
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Nová položka..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddItem}>
          Přidat
        </button>
      </div>

      {/* Členové */}
      <MemberList
        members={list.members}
        currentUser={currentUser}
        isOwner={isOwner}
        onAdd={handleAddMember}
        onRemove={handleRemoveMember}
        newMemberEmail={newMemberEmail}
        setNewMemberEmail={setNewMemberEmail}
      />
    </div>
  );
}
