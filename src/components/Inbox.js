import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInbox, FaPaperPlane, FaDraftingCompass } from "react-icons/fa";
import "./css/Inbox.css";
import WriteEmail from "./WriteEmail";

function Inbox() {
  const [sentEmails, setSentEmails] = useState([]);
  const [recivedEmails, setRecivedEmails] = useState([]);
  const [draftEmails, setDraftEmails] = useState([]);
  const [sentEmailsInbox, setSentEmailsInbox] = useState(true);
  const [draftEmailsInbox, setDraftEmailsInbox] = useState(false);
  const [recivedEmailsInbox, setRecivedEmailsInbox] = useState(false);
  const [showWriteEmailModal, setShowWriteEmailModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emails/inbox", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        console.log(res);
        const sentEmails = res.data.sent;
        const receivedEmails = res.data.received;
        const draftEmails = res.data.sent.filter(
          (email) => email.status === "draft"
        );
        setSentEmails(sentEmails);
        setRecivedEmails(receivedEmails);
        setDraftEmails(draftEmails);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchEmails();
  }, []);

  const handleWriteMail = () => {
    setShowWriteEmailModal(true); // Show modal on click
  };

  const handleInbox = () => {
    setSentEmailsInbox(true);
    setRecivedEmailsInbox(false);
    setDraftEmailsInbox(false);
  };

  const handleRecived = () => {
    setSentEmailsInbox(false);
    setRecivedEmailsInbox(true);
    setDraftEmailsInbox(false);
  };

  const handleDrafts = () => {
    setSentEmailsInbox(false);
    setRecivedEmailsInbox(false);
    setDraftEmailsInbox(true);
  };

  const closeModal = () => {
    setShowWriteEmailModal(false); // Close modal function
  };

  return (
    <>
      <div className="full-width-header">
        <div className="nav-buttons">
          <button
            onClick={handleRecived}
            className={recivedEmailsInbox ? "active" : ""}
          >
            <FaInbox /> Inbox
          </button>
          <button
            onClick={handleDrafts}
            className={draftEmailsInbox ? "active" : ""}
          >
            <FaPaperPlane /> Drafts
          </button>
          <button
            onClick={handleInbox}
            className={sentEmailsInbox ? "active" : ""}
          >
            <FaDraftingCompass /> Outbox
          </button>
        </div>
        <button onClick={handleWriteMail} className="write-mail-btn">
          New Mail
        </button>
      </div>
      <div className="inbox-container">
        {sentEmailsInbox && (
          <>
            <h2>Sent Mails</h2>
            <ul className="email-list">
              {sentEmails.map((email) => (
                <li key={email._id} className="email-item">
                  <h3>{email.subject}</h3>
                  <h3>{email.recipient}</h3>
                  <p>{email.message}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {recivedEmailsInbox && (
          <>
            <h2>received Mails</h2>
            <ul className="email-list">
              {recivedEmails.map((email) => (
                <li key={email._id} className="email-item">
                  <h3>{email.subject}</h3>
                  <p>{email.message}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {draftEmailsInbox && (
          <>
            <ul className="email-list">
              {draftEmails.map((email) => (
                <li key={email._id} className="email-item">
                  <h3>{email.subject}</h3>
                  <p>{email.message}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {showWriteEmailModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <WriteEmail closeModal={closeModal} />{" "}
            {/* Pass closeModal function as prop */}
          </div>
        </div>
      )}
    </>
  );
}

export default Inbox;
