import "../styles/MainPanel.css";
import MintForm from "./MintForm";
import BurnForm from "./BurnForm";
import TransferForm from "./TransferForm";
import History from "./History";

function MainPanel({ activePage, isOwner }) {

  switch (activePage) {

    case "mint":
      return <MintForm isOwner={isOwner}/>;

    case "burn":
      return <BurnForm />;

    case "transfer":
      return <TransferForm />;

    case "history":
      return <History />;

    default:
      return (

        <div className="main-panel">

          <div className="welcome">

            <div className="welcome-icon">
              ⬢
            </div>

            <h1>Select Your Operation</h1>

            <p>
              Choose an operation from the left sidebar to
              interact with your Campus Token smart contract.
            </p>

          </div>

        </div>

      );
  }

}

export default MainPanel;