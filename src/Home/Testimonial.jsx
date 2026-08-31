const Testimonial = () => {
    return(
        <div className="testimonial">
  <div className="container">

    <div className="testimonial-heading">
      <h2>OUR CLIENT'S SUCCESS STORIES</h2>

      <p>
        Discover how our clients found their dream homes and successful <br />
        real estate investments with the help of our expert agents.
      </p>
    </div>

    <div className="testimonial-wrapper">

      {/* Card 1 */}
      <div className="testimonial-card">

        <div className="testimonial-image">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="home"
          />

          <div className="quote-icon">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          <div className="client-image">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
              alt="client"
            />
          </div>

        </div>

        <div className="testimonial-content">
          <h3>Sophia Rodriguez</h3>

          <p>
            "The real estate agents were incredibly responsive and
            helpful throughout the entire process. I couldn't have
            asked for a better experience."
          </p>
        </div>

      </div>

      {/* Card 2 */}
      <div className="testimonial-card">

        <div className="testimonial-image">

          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
            alt="home"
          />

          <div className="quote-icon">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          <div className="client-image">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop"
              alt="client"
            />
          </div>

        </div>

        <div className="testimonial-content">
          <h3>Ava Thompson</h3>

          <p>
            "The real estate agents were incredibly responsive and
            helpful throughout the entire process. I couldn't have
            asked for a better experience."
          </p>
        </div>

      </div>

      {/* Card 3 */}
      <div className="testimonial-card">

        <div className="testimonial-image">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="home"
          />

          <div className="quote-icon">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          <div className="client-image">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
              alt="client"
            />
          </div>

        </div>

        <div className="testimonial-content">
          <h3>Sophia Rodriguez</h3>

          <p>
            "The real estate agents were incredibly responsive and
            helpful throughout the entire process. I couldn't have
            asked for a better experience."
          </p>
        </div>

      </div>

    </div>
  </div>
</div>
    )
}
export default Testimonial;