import SearchBox from "../components/searchBox";

const Products = () => {
  return (
    <div className="products_container">
      <div className="top">
        <div className="left">
          <SearchBox />
        </div>
        <div className="right">
          <button>Create New +</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
