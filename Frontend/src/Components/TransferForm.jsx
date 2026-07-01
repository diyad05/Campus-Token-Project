import { useState } from "react";
import { transferTokens } from "../contract";
import "../styles/Form.css";

function TransferForm() {

  const [recipient, setRecipient] = useState("");

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const handleTransfer = async () => {

    if (!recipient || !amount) {
      alert("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      await transferTokens(
        recipient,
        amount
      );

      alert("Transfer completed successfully!");

      setRecipient("");
      setAmount("");

    } catch (err) {

      alert(err.reason || err.message);

    } finally {

      setLoading(false);

    }

  };
  return (
    <div className="form-card">

      <h2>Transfer Tokens</h2>

      <p className="subtitle">
        Send Campus Tokens to another wallet.
      </p>

      <div className="input-group">
        <label>Recipient Address</label>

        <input
          type="text"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Amount</label>

        <input
          type="number"
          placeholder="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        className="action-btn transfer-btn"
        onClick={handleTransfer}
        disabled={loading}
      >
        {loading ? "Transferring..." : "Transfer Tokens"}
      </button>

    </div>
  );
}

export default TransferForm;