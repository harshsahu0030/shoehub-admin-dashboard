import { NavLink } from "react-router-dom";
import { sideBar_data } from "../data/sidebar";

const Sidebar = () => {
  return (
    <div className="sidebar_container">
      <ul>
        {sideBar_data &&
          sideBar_data.links01.map((item, i) => (
            <NavLink
              key={i}
              to={item.url}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>{item.name}</li>
            </NavLink>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
