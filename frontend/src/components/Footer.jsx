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
          <p className="footer-copy">
            © {new Date().getFullYear()} Rathi Varman. Made with{" "}
            <FaHeart style={{ color: "#ef4444", display: "inline" }} /> using{" "}
            <span className="text-gradient font-weight-bold">MERN Stack</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
