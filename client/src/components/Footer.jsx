import { FaHeart } from "react-icons/fa";
import "./Footer.css";


export default function Footer() {
  const handleNav = (e, id) => {
    e.preventDefault();
    document
      .querySelector(`#${id.toLowerCase()}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-gradient-line"></div>
      <div className="container py-4">
        <div className="text-center">
          <p className="footer-copy mb-2" style={{ fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} <strong>Rathivarman</strong>. All rights reserved.
          </p>
          <p className="footer-subtext mb-0">
            Designed &amp; Developed by <span className="text-gradient" style={{ fontWeight: 600 }}>Rathivarman</span> &nbsp;|&nbsp; MERN Stack Developer
          </p>
        </div>
      </div>
    </footer>
  );
}
