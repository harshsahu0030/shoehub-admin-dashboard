import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./app/actions/userAction";

const App = () => {
  //redux
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  //useEffect
  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <section className="main">
        <aside>{isAuthenticated && <Sidebar />}</aside>
        <article>
          <Routes>
            {isAuthenticated ? (
              <>
                {" "}
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </article>
      </section>
    </BrowserRouter>
  );
};

export default App;
