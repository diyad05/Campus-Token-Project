import { useState } from "react";
import { burnTokens } from "../contract";
import "../styles/Form.css";

function BurnForm() {

  const [amount, setAmount] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleBurn = async () => {

    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    if (!confirmed) {
      alert("Please confirm before burning tokens.");
      return;
    }

    try {

      setLoading(true);

      await burnTokens(amount);

      alert("Tokens burned successfully!");

      setAmount("");
      setConfirmed(false);

    } catch (err) {

      alert(err.reason || err.message);

    } finally {

      setLoading(false);

    }

  };
  return (
    <div className="form-card">

      <h2>Burn Campus Tokens</h2>

      <p className="subtitle">
        Permanently remove tokens from circulation.
      </p>

      <div className="warning-box">
        ⚠️ Burning tokens cannot be undone.
      </div>

      <div className="input-group">
        <label>Amount to Burn</label>

        <input
          type="number"
          placeholder="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="checkbox">

        <input
          type="checkbox"
          id="confirmBurn"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />

        <label htmlFor="confirmBurn">
          I understand this action is irreversible.
        </label>

      </div>

      <button
        className="action-btn burn-btn"
        onClick={handleBurn}
        disabled={loading}
      >
        {loading ? "Burning..." : "Burn Tokens"}
      </button>

    </div>
  );
}

export default BurnForm;