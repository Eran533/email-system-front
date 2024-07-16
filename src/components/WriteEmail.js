import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WriteEmail() {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    message: "",
    status: "draft",
  });

  const { recipient, subject, message, status } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/emails/send",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      navigate("/inbox");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Write Email</h2>
      <input
        type="text"
        name="recipient"
        value={recipient}
        onChange={onChange}
        placeholder="Recipient"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        required
      />
      <input
        type="text"
        name="subject"
        value={subject}
        onChange={onChange}
        placeholder="Subject"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        required
      />
      <textarea
        name="message"
        value={message}
        onChange={onChange}
        placeholder="Message"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          minHeight: "200px",
        }}
        required
      ></textarea>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          marginRight: "10px",
          cursor: "pointer",
        }}
        onClick={() => setFormData({ ...formData, status: "sent" })}
      >
        Send
      </button>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setFormData({ ...formData, status: "draft" })}
      >
        Save as Draft
      </button>
    </form>
  );
}

export default WriteEmail;
