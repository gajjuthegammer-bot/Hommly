import { useState } from "react";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

// Set this to your backend's base URL — put it in a .env file
// (e.g. REACT_APP_API_URL=http://localhost:5000 for CRA, or
// VITE_API_URL=http://localhost:5000 for Vite) instead of hardcoding it.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030/Contact";

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status !== "true") {
        throw new Error("Failed");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="panel">
      <h3>Send Us a Message</h3>
      <p style={{ marginBottom: 18 }}>
        Have a question about a listing or want a callback from our team? Fill this out and
        we&apos;ll get in touch within one business day.
      </p>

      <form className="tour-form" onSubmit={handleSubmit}>
        <div className="review-fields">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          name="message"
          rows={5}
          placeholder="Tell us a little about what you're looking for..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p style={{ color: "#7a9a6f", fontSize: 13, marginTop: 4 }}>
            Thanks — your message has been sent. We&apos;ll be in touch soon.
          </p>
        )}

        {status === "error" && (
          <p style={{ color: "#d9483f", fontSize: 13, marginTop: 4 }}>
            Couldn&apos;t send your message. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;