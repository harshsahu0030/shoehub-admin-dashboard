import Logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header_container" onClick={() => navigate("/")}>
      <img src={Logo} alt="logo" />
      <FaUserCircle onClick={() => navigate("/account")} />
    </div>
  );
};

export default Header;
