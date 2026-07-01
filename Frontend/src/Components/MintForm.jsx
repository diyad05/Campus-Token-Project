import { useState } from "react";
import { mintTokens } from "../contract";
import "../styles/Form.css";

function MintForm({ isOwner }) {

    const [recipient, setRecipient] = useState("");

    const [amount, setAmount] = useState("");

    const [includeReward, setIncludeReward] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleMint = async () => {

        if (!recipient || !amount) {
            alert("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            await mintTokens(
                recipient,
                amount,
                includeReward
            );

            alert("Tokens minted successfully!");

            setRecipient("");
            setAmount("");
            setIncludeReward(false);

        } catch (err) {

            alert(err.reason || err.message);

        } finally {

            setLoading(false);

        }

    };
    return (
        <div className="form-card">

            <h2>Mint Campus Tokens</h2>

            <p className="subtitle">
                Only the contract owner can mint new Campus Tokens.
            </p>

            <div className="input-group">
                <label>Recipient Address</label>

                <input
                    type="text"
                    placeholder="0x..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    disabled={!isOwner}
                />
            </div>

            <div className="input-group">
                <label>Amount</label>

                <input
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!isOwner}
                />
            </div>

            <div className="checkbox">

                <input
                    type="checkbox"
                    id="reward"
                    checked={includeReward}
                    onChange={(e) => setIncludeReward(e.target.checked)}
                    disabled={!isOwner}
                />

                <label htmlFor="reward">
                    Include Reward Tokens
                </label>

            </div>

            <button
                className="action-btn mint-btn"
                onClick={handleMint}
                disabled={loading || !isOwner}
            >
                {loading ? "Minting..." : "Mint Tokens"}
                {!isOwner && (
                    <p className="warning-text">
                        Only the contract owner can mint Campus Tokens.
                    </p>
                )}
            </button>
        </div>
    );
}

export default MintForm;