import {Link} from "react-router-dom"
export default function LandingPage() {
    return (
      <div className="LandingPage">
          <Link to="/home">
              <button>Home</button>
          </Link>
          <h1>proyecto de kevin</h1>
      </div >
    );
  }