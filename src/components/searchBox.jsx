import { LuSearch } from "react-icons/lu";

const SearchBox = () => {
  return (
    <div className="searchBox_container">
      <input type="search" placeholder="Search..." />
      <LuSearch />
    </div>
  );
};

export default SearchBox;
