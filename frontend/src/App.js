import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    pincode: "",
    email: "",
    picture: ""
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        firstName: user.given_name || "",
        lastName: user.family_name || "",
        email: user.email || "",
        picture: user.picture || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      alert("Profile save initiated!");
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  return (
    <div className="App" style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      fontFamily: "Arial" 
    }}>
      <h1 style={{ color: "#333", marginBottom: "1rem" }}>🌟 Platformatory Labs Assignment 🌟</h1>

      {isAuthenticated ? (
        <div style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center"
        }}>
          <img src={profile.picture} alt="profile" style={{ borderRadius: '50%', width: 100, marginBottom: "1rem" }} />
          <h3 style={{ margin: 0 }}>{profile.firstName} {profile.lastName}</h3>
          <p style={{ color: "#666" }}>{profile.email}</p>

          <form style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "1rem" }}>
            <input className="input" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
            <input className="input" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
            <input className="input" name="email" value={profile.email} readOnly />
            <input className="input" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone Number" />
            <input className="input" name="city" value={profile.city} onChange={handleChange} placeholder="City" />
            <input className="input" name="pincode" value={profile.pincode} onChange={handleChange} placeholder="Pincode" />
            <button 
              type="button" 
              onClick={handleSave} 
              style={{
                padding: "0.7rem",
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Save Profile
            </button>
          </form>

          <button 
            onClick={() => logout({ returnTo: window.location.origin })} 
            style={{
              marginTop: "1rem",
              background: "transparent",
              border: "1px solid #f87171",
              color: "#f87171",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={() => loginWithRedirect()} 
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
          }}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}

export default App;
