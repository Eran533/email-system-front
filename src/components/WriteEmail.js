import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/WriteEmailModal.css"; // Import your CSS for styling

function WriteEmail({ closeModal }) {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    message: "",
    status: "",
  });

  const { recipient, subject, message, status } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/emails/send",
        { ...formData, status },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      navigate("/inbox");
      closeModal(); // Close modal after sending
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleSend = () => {
    setFormData({ ...formData, status: "sent" }); // Update status to "sent"
    onSubmit(); // Call onSubmit function manually
  };

  const handleSaveAsDraft = () => {
    setFormData({ ...formData, status: "draft" }); // Update status to "draft"
    onSubmit(); // Call onSubmit function manually
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="button-group">
          <button type="button" onClick={handleSend}>
            Send
          </button>
          <button
            type="button"
            onClick={handleSaveAsDraft}
            className="cancel-button"
          >
            Save as Draft
          </button>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="write-email-form">
          <h2>Write Email</h2>
          <input
            type="text"
            name="recipient"
            value={recipient}
            onChange={onChange}
            placeholder="Recipient"
            required
          />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={onChange}
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            value={message}
            onChange={onChange}
            placeholder="Message"
            required
          ></textarea>
        </form>
      </div>
    </div>
  );
}

export default WriteEmail;
