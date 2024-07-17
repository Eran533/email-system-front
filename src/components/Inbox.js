import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInbox, FaPaperPlane, FaDraftingCompass } from "react-icons/fa";
import "./css/Inbox.css";
import WriteEmail from "./WriteEmail";

function Inbox() {
  const [sentEmails, setSentEmails] = useState([]);
  const [sentEmailsOriginal, setSentOriginalEmails] = useState([]);
  const [receivedEmailsOriginal, setReceivedEmailsOriginal] = useState([]);
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [draftEmailsOriginal, setDraftEmailsOriginal] = useState([]);
  const [draftEmails, setDraftEmails] = useState([]);
  const [sentEmailsInbox, setSentEmailsInbox] = useState(false);
  const [draftEmailsInbox, setDraftEmailsInbox] = useState(false);
  const [receivedEmailsInbox, setReceivedEmailsInbox] = useState(true);
  const [showWriteEmailModal, setShowWriteEmailModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emails/inbox", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const { sent, received } = res.data;
      const draftEmails = sent.filter((email) => email.status === "draft");
      const sentEmails = sent.filter((email) => email.status === "sent");
      const receivedEmails = received.filter(
        (email) => email.status === "sent"
      );
      setSentEmails(sentEmails);
      setSentOriginalEmails(sentEmails);
      setReceivedEmails(receivedEmails);
      setReceivedEmailsOriginal(receivedEmails);
      setDraftEmails(draftEmails);
      setDraftEmailsOriginal(draftEmails);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateEmails = async () => {
    try {
      await fetchEmails();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleSearchSent = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (sentEmailsInbox) {
      if (value.trim() === "") {
        setSentEmails(sentEmailsOriginal);
      } else {
        const filteredMails = sentEmails.filter((mail) =>
          mail.subject.toLowerCase().includes(value.toLowerCase())
        );
        setSentEmails(filteredMails);
      }
    }
    if (receivedEmailsInbox) {
      if (value.trim() === "") {
        setReceivedEmails(receivedEmailsOriginal);
      } else {
        const filteredMails = receivedEmails.filter((mail) =>
          mail.subject.toLowerCase().includes(value.toLowerCase())
        );
        setReceivedEmails(filteredMails);
      }
    }
    if (draftEmailsInbox) {
      if (value.trim() === "") {
        setDraftEmails(draftEmailsOriginal);
      } else {
        const filteredMails = draftEmails.filter((mail) =>
          mail.subject.toLowerCase().includes(value.toLowerCase())
        );
        setDraftEmails(filteredMails);
      }
    }
  };

  const handleWriteMail = () => {
    setShowWriteEmailModal(true);
  };

  const handleInbox = () => {
    setSentEmailsInbox(true);
    setReceivedEmailsInbox(false);
    setDraftEmailsInbox(false);
    setSelectedEmail(null);
  };

  const handleReceived = () => {
    setSentEmailsInbox(false);
    setReceivedEmailsInbox(true);
    setDraftEmailsInbox(false);
    setSelectedEmail(null);
  };

  const handleDrafts = () => {
    setSentEmailsInbox(false);
    setReceivedEmailsInbox(false);
    setDraftEmailsInbox(true);
    setSelectedEmail(null);
  };

  const closeModal = () => {
    setShowWriteEmailModal(false);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const convertToNormalDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="full-width-header">
        <div className="nav-buttons">
          <button
            onClick={handleReceived}
            className={receivedEmailsInbox ? "active" : ""}
          >
            <FaInbox /> Inbox
          </button>
          <button
            onClick={handleDrafts}
            className={draftEmailsInbox ? "active" : ""}
          >
            <FaDraftingCompass /> Drafts
          </button>
          <button
            onClick={handleInbox}
            className={sentEmailsInbox ? "active" : ""}
          >
            <FaPaperPlane />
            Outbox
          </button>
        </div>
        <input
          type="text"
          placeholder="Search mail by subject..."
          value={searchTerm}
          className="input-search"
          onChange={handleSearchSent}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={handleWriteMail} className="write-mail-btn">
          New Mail
        </button>
      </div>
      <div className="inbox-container">
        {sentEmailsInbox && (
          <>
            <h2>Sent</h2>
            <ul className="email-list">
              {sentEmails.map((email) => (
                <li
                  key={email._id}
                  className="email-item"
                  onClick={() => handleEmailClick(email)}
                >
                  <h3>{email.recipient}</h3>
                  <h3>{email.subject}</h3>
                  <p>{email.message}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {receivedEmailsInbox && (
          <>
            <h2>Inbox</h2>
            <ul className="email-list">
              {receivedEmails.map((email) => (
                <li
                  key={email._id}
                  className="email-item"
                  onClick={() => handleEmailClick(email)}
                >
                  <div className="email-container">
                    <div className="email-icon">
                      <span className="initials">
                        {email.firstName.charAt(0)}
                        {email.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="email-content">
                      <h3>
                        {email.firstName} {email.lastName}
                      </h3>
                      <h3>{email.subject}</h3>
                      <p>{email.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {draftEmailsInbox && (
          <>
            <h2>Draft</h2>
            <ul className="email-list">
              {draftEmails.map((email) => (
                <li
                  key={email._id}
                  className="email-item"
                  onClick={() => handleEmailClick(email)}
                >
                  <h3>{email.recipient}</h3>
                  <h3>{email.subject}</h3>
                  <p>{email.message}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mail-container">
        {selectedEmail && (
          <div className="email-details">
            <h3>
              {selectedEmail.firstName} {selectedEmail.lastName}
            </h3>
            <div className="email-header">
              <h2>{selectedEmail.subject}</h2>
              <p>{convertToNormalDateTime(selectedEmail.timestamp)}</p>
            </div>
            <h3>To: {selectedEmail.recipient}</h3>
            <p>{selectedEmail.message}</p>
          </div>
        )}
      </div>
      {showWriteEmailModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <WriteEmail closeModal={closeModal} updateEmails={updateEmails} />
          </div>
        </div>
      )}
    </>
  );
}

export default Inbox;
