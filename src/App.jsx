import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
