import React, { useState } from "react";

export default function MemberList({
  members,
  ownerId,
  isOwner,
  currentUser,
  onAddMember,
  onRemoveMember,
}) {
  const [newMember, setNewMember] = useState("");

  return (
    <div className="memberlist-section border-b pb-3">
      <h3 className="memberlist-title font-semibold mb-2">List of members</h3>
      <ul className="memberlist-list space-y-1">
        {members.map((m) => (
          <li
            key={m.id}
            className="memberlist-item flex justify-between items-center"
          >
            <span className="memberlist-name">
              {m.name} {m.id === ownerId && <em>(owner)</em>}
            </span>
            {(isOwner || m.id === currentUser.id) && m.id !== ownerId && (
              <button
                onClick={() => onRemoveMember(m.id)}
                className="memberlist-remove text-red-500 text-sm"
              >
                Remove member
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && (
        <div className="memberlist-add mt-3 flex space-x-2">
          <input
            className="memberlist-input border rounded px-2"
            placeholder="Member name"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button
            className="memberlist-addbtn bg-green-500 text-white px-3 rounded"
            onClick={() => {
              onAddMember(newMember);
              setNewMember("");
            }}
          >
            Add member
          </button>
        </div>
      )}
    </div>
  );
}
