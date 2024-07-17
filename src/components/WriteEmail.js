import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/WriteEmailModal.css";

function WriteEmail({ closeModal, updateEmails }) {
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

  const handleSend = () => {
    const updatedFormData = { ...formData, status: "sent" };
    setFormData(updatedFormData);

    onSubmit(updatedFormData);
  };

  const handleSaveAsDraft = () => {
    const updatedFormData = { ...formData, status: "draft" };
    setFormData(updatedFormData);

    onSubmit(updatedFormData);
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/emails/send",
        data,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      navigate("/inbox");
      closeModal();
      updateEmails();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
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
          <div className="button-group">
            <div className="left-buttons">
              <button
                type="button"
                className="send-button"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
            <div className="right-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteEmail;
