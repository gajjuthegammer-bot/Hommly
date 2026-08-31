
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "./Icons";
import ContactForm from "./ContactForm";

const QUICK_INFO = [
  {
    icon: PinIcon,
    title: "Visit Us",
    text: "221B Marine Drive, Mumbai, Maharashtra 400001",
  },
  {
    icon: PhoneIcon,
    title: "Call Us",
    text: "+91 123 456 7890",
  },
  {
    icon: MailIcon,
    title: "Email Us",
    text: "hello@yoursite.com",
  },
  {
    icon: ClockIcon,
    title: "Working Hours",
    text: "Mon – Sat, 9:00 AM – 7:00 PM",
  },
];

const Contactinfo = () => {
  return (
    <>
      

      <section className="contact-sec">
        <div className="container">
          <div className="contact-intro">
            <h2>We&apos;d love to hear from you</h2>
            <p>
              Whether you&apos;re buying, selling, or just exploring the market — our team is a
              message away.
            </p>
          </div>

          <div className="contact-quick-info">
            {QUICK_INFO.map(({ icon: Icon, title, text }) => (
              <div className="quick-info-card" key={title}>
                <div className="quick-info-icon">
                  <Icon />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>

          {/* reuses the same .fh-page / .fh-grid / .panel / .agent-panel /
              .map-box classes already built for the property page */}
          <div className="fh-page" style={{ padding: 0, background: "transparent" }}>
            <div className="fh-grid">
              <div className="fh-main" style={{ order: 2 }}>
                <ContactForm />
              </div>

              <div className="fh-sidebar" style={{ order: 1 }}>
                <div className="panel agent-panel">
                  <img src="/images/office-front.jpg" alt="Our office" className="agent-photo" />
                  <p className="agent-name">Head Office</p>
                  <p className="agent-role">Marine Drive, Mumbai</p>
                  <div className="agent-social">
                    <a href="#" aria-label="Facebook">
                      <i className="fa-brands fa-facebook" />
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin" />
                    </a>
                  </div>
                </div>

                <div className="panel">
                  <h3>Find Us</h3>
                  <p className="address">221B Marine Drive, Mumbai, Maharashtra 400001</p>
                  <div className="map-box">
                    <div className="map-pin">
                      <PinIcon />
                    </div>
                    <div className="map-card">
                      <p className="map-card-title">Head Office</p>
                      <p className="map-card-sub">Marine Drive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default Contactinfo;