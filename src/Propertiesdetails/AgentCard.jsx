function AgentCard() {
  return (
    <div className="panel agent-panel">
      <img
        className="agent-photo"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80"
        alt="Rebecca Robinson"
      />
      <div className="agent-name">Rebecca Robinson</div>
      <div className="agent-role">Real Estate Broker</div>
      <div className="agent-social">
        <span>f</span>
        <span>◎</span>
        <span>▶</span>
        <span>✎</span>
      </div>
    </div>
  );
}
export default AgentCard;