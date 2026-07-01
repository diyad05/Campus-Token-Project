import "../styles/WalletCard.css";

function WalletCard({
  walletConnected,
  walletAddress,
  tokenBalance,
  network,
  isOwner,
}) {
  return (
    <div className="wallet-card">

      <div className="wallet-header">
        <h2>Wallet Information</h2>
      </div>

      <div className="wallet-grid">

        <div className="wallet-item">
          <span className="label">Wallet Address</span>
          <span className="value">
            {walletConnected ? walletAddress : "Not Connected"}
          </span>
        </div>

        <div className="wallet-item">
          <span className="label">Token Balance</span>
          <span className="value">
            {walletConnected
              ? `${Number(tokenBalance).toLocaleString()} CT`
              : "--"}
          </span>
        </div>

        <div className="wallet-item">
          <span className="label">Network</span>
          <span className="value">
            {walletConnected ? network : "--"}
          </span>
        </div>

        <div className="wallet-item">
          <span className="label">Role</span>
          <span className="value">
            {!walletConnected
              ? "--"
              : isOwner
                ? "Contract Owner"
                : "Token Holder"}
          </span>
        </div>

        <div className="wallet-item">
          <span className="label">Status</span>
          <span
            className={
              walletConnected
                ? "status connected"
                : "status disconnected"
            }
          >
            {walletConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default WalletCard;