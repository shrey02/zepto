import React, { useState, useId } from "react";
import './App.css';
interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const users: User[] = [
    {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Alice Smith",
      email: "alice.smith@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "David Miller",
      email: "david.miller@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Eva Davis",
      email: "eva.davis@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Frank White",
      email: "frank.white@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Grace Taylor",
      email: "grace.taylor@example.com",
  },
  {
      id: useId(),
      avatar: "https://placehold.co/64x64",
      name: "Henry Clark",
      email: "henry.clark@example.com",
  },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [activeUserId, setActiveUserId] = useState("");

  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const filteredUser = users
    .filter((user) => selectedUser.findIndex((value) => value.id === user.id) === -1)
    .filter((user) => user.name.includes(query) || user.email.includes(query));

  return (
    <div className="container">
      {selectedUser.map((user) => (
        <div
          key={user.id}
          className={`chip-pill ${user.id === activeUserId ? "highlight" : ""}`}
        >
          <img className="avatar" alt={user.name} src={user.avatar} />
          {user.name}
          <button
            className="chip-pill-close-btn"
            onClick={() => setSelectedUser((prev) => prev.filter((_user) => _user.id !== user.id))}
          >
            &#10005;
          </button>
        </div>
      ))}
      <div className="input-container">
        <input
          className={`search-input ${showDropdown ? 'input-with-dropdown' : ''}`}
          onClick={() => setShowDropdown((prev) => !prev)}
          value={query}
          onChange={(e) => setQuery(() => e.target.value)}
          onKeyUp={(ev) => {
            const key = ev.key.toLowerCase();

            if (key === "backspace" && selectedUser.length > 0) {
              if (activeUserId) {
                setSelectedUser((prev) => prev.filter((user) => user.id !== activeUserId));
                setActiveUserId(() => "");
              } else {
                setActiveUserId(selectedUser[selectedUser.length - 1].id);
              }
            }
          }}
          onBlur={() => setActiveUserId(() => "")}
        />
       
        {showDropdown && (
          <div className="dropdown">
            {filteredUser.map((user) => (
              <button
                className="user-btn"
                key={user.id}
                onClick={() => setSelectedUser((prev) => [...prev, user])}
              >
                <img className="avatar" alt={user.name} src={user.avatar} />
                {user.name}&nbsp;&nbsp;&nbsp;&nbsp;
                {user.email}
              </button>
            ))}
            {filteredUser.length === 0 && <div className="no-user-found">No User Found</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
