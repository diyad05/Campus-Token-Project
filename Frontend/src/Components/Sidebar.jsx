 import "../styles/Sidebar.css";

function Sidebar({
  connectWallet,
  walletConnected,
  activePage,
  setActivePage,
}) {

  return (

    <aside className="sidebar">

      <button
        className="connect-btn"
        onClick={connectWallet}
      >
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>

      <div className="menu">

        <button
          className={activePage==="mint" ? "menu-btn active mint" : "menu-btn mint"}
          onClick={()=>setActivePage("mint")}
        >
          🌿
          <span>Mint</span>
        </button>

        <button
          className={activePage==="burn" ? "menu-btn active burn" : "menu-btn burn"}
          onClick={()=>setActivePage("burn")}
        >
          🔥
          <span>Burn</span>
        </button>

        <button
          className={activePage==="transfer" ? "menu-btn active transfer" : "menu-btn transfer"}
          onClick={()=>setActivePage("transfer")}
        >
          🔄
          <span>Transfer</span>
        </button>

        <button
          className={activePage==="history" ? "menu-btn active history" : "menu-btn history"}
          onClick={()=>setActivePage("history")}
        >
          🕒
          <span>History</span>
        </button>

      </div>

    </aside>

  );
}

export default Sidebar;