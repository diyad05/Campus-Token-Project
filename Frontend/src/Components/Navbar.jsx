 import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">

        <div className="logo-circle">
          CT
        </div>

        <div className="logo-text">

          <h1>CAMPUS</h1>
          <h1 className="purple">TOKEN</h1>

        </div>

      </div>

      <nav className="nav-links">

        <a href="#">Explorer</a>
        <a href="#">Features</a>
        <a href="#">Docs</a>
        <a href="https://github.com/diyad05/Campus-Token-Project" target="_blank" rel="noreferrer">
          GitHub
        </a>

      </nav>

    </header>
  );
}

export default Navbar;