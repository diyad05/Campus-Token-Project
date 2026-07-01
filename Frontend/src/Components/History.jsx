import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getTransactionHistory } from "../contract";
import "../styles/Form.css";

function History() {

  const [transactions, setTransactions] = useState([]);

  const [filter, setFilter] = useState("all");
  useEffect(() => {

    const loadHistory = async () => {

      try {

        const events = await getTransactionHistory();

        setTransactions(events.reverse());

      } catch (err) {

        console.log(err);

      }

    };

    loadHistory();

  }, []);
  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  return (
    <div className="form-card">

      <h2>Transaction History</h2>

      <div className="history-filters">

        <button onClick={() => setFilter("week")}>
          1 Week
        </button>

        <button onClick={() => setFilter("month")}>
          1 Month
        </button>

        <button onClick={() => setFilter("all")}>
          All
        </button>
      </div>

      <div className="history-list">

        {transactions.length === 0 ? (

          <div className="history-placeholder">

            <h3>No Transactions Yet</h3>

            <p>
              Connect your wallet and perform an operation.
            </p>

          </div>

        ) : (

          transactions.map((tx, index) => {

            const from = tx.args[0];

            const to = tx.args[1];

            const amount = ethers.formatUnits(tx.args[2], 18);

            let type = "Transfer";

            if (
              from === "0x0000000000000000000000000000000000000000"
            ) {
              type = "Mint";
            }

            else if (
              to === "0x0000000000000000000000000000000000000000"
            ) {
              type = "Burn";
            }

            return (

              <div
                key={index}
                className={`history-card ${type.toLowerCase()}`}
              >

                <h3>{type}</h3>

                <p className="amount">
                  {type === "Mint"
                    ? "+"
                    : type === "Burn"
                      ? "-"
                      : ""}
                  {Number(amount).toLocaleString()} CT
                </p>

                {type === "Mint" && (
                  <p>
                    <strong>To:</strong> {shortenAddress(to)}
                  </p>
                )}

                {type === "Burn" && (
                  <p>
                    <strong>From:</strong> {shortenAddress(from)}
                  </p>
                )}

                {type === "Transfer" && (
                  <>
                    <p>
                      <strong>From:</strong> {shortenAddress(from)}
                    </p>

                    <p>
                      <strong>To:</strong> {shortenAddress(to)}
                    </p>
                  </>
                )}

                <p>
                  <strong>Block:</strong> #{tx.blockNumber}
                </p>

              </div>

            );

          })

        )}

      </div>

    </div>
  );
}

export default History;