import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token (simple approach)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect later when you add routing:
      // navigate("/trips");

      alert("Logged in!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <h2>Welcome back</h2>
      <p>Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          style={{ width: "100%", padding: 12, margin: "6px 0 14px" }}
        />

        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          style={{ width: "100%", padding: 12, margin: "6px 0 14px" }}
        />

        {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

        <button disabled={loading} style={{ width: "100%", padding: 12 }}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
