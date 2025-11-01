export default function MemberList({
  members,
  currentUser,
  isOwner,
  onAdd,
  onRemove,
  newMemberEmail,
  setNewMemberEmail,
}) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Členové ({members.length})</h2>
      <ul className="space-y-1">
        {members.map((m) => (
          <li key={m} className="flex justify-between items-center border-b py-1">
            <span>
              {m === currentUser ? <b>{m} (Vy)</b> : m}
            </span>
            {(isOwner || m === currentUser) && (
              <button className="text-red-500" onClick={() => onRemove(m)}>
                {m === currentUser ? "Odejít" : "Odebrat"}
              </button>
            )}
          </li>
        ))}
      </ul>

      {isOwner && (
        <div className="flex gap-2 mt-3">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="E-mail nového člena"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={onAdd}>
            Přidat
          </button>
        </div>
      )}
    </div>
  );
}
