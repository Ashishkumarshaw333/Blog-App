import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showRegister, setShowRegister] = useState(false);

  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  if (user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
        <Feed currentUser={user} onLogout={handleLogout} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-slate-900">
      {showRegister ? (
        <Register onLogin={handleLogin} switchToLogin={() => setShowRegister(false)} />
      ) : (
        <Login onLogin={handleLogin} switchToRegister={() => setShowRegister(true)} />
      )}
    </main>
  );
}

export default App;
