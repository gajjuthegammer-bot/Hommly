function ScheduleTour() {
  return (
    <div className="panel tour-panel">
      <h3>Schedule a Tour</h3>
      <form onSubmit={(e) => e.preventDefault()} className="tour-form">
        <input type="date" placeholder="DD/MM/YYYY" />
        <input type="time" placeholder="Time" />
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your email" />
        <input type="tel" placeholder="Your Phone Number" />
        <textarea placeholder="Message" rows={4} />
        <button type="submit" className="btn-primary">Submit A Tour Request</button>
      </form>
    </div>
  );
}
export default ScheduleTour;