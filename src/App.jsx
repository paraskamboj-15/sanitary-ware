import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

function NotFound() {
  return (
    <div className="container-x flex min-h-[55vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">This page doesn't exist.</h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-smoke">
        The link may have moved, or the address may be mistyped. Everything we
        make is listed under the collections.
      </p>
      <Link to="/" className="btn-solid mt-9">
        Back to home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/product/:productSlug" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
