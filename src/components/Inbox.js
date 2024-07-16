import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const [sentEmails, setSentEmails] = useState([]);
  const [draftEmails, setDraftEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emails/inbox", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const filteredSentEmails = res.data.filter(
          (email) => email.status === "sent"
        );
        const filteredDraftEmails = res.data.filter(
          (email) => email.status === "draft"
        );
        setSentEmails(filteredSentEmails);
        setDraftEmails(filteredDraftEmails);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchSentEmails();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleWriteMail = () => {
    navigate("/write-email");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Inbox</h2>
      <div style={{ marginBottom: "10px" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={handleWriteMail}
        >
          Write Email
        </button>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <h1>Inbox</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {sentEmails.map((email) => (
          <li
            key={email._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{email.subject}</h3>
            <h3 style={{ marginBottom: "10px" }}>{email.sender}</h3>
            <p>{email.message}</p>
          </li>
        ))}
      </ul>
      <h1>Draft Mails</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {draftEmails.map((email) => (
          <li
            key={email._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{email.subject}</h3>
            <p>{email.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;
