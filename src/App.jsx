import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import Copied from "./components/Copied";
import { useSelector } from "react-redux";
import { selectCopied } from "./features/collection/collectionSlice";

function App() {
   console.log("App")
  const copied = useSelector(selectCopied);

  return (
    <>
      {copied && <Copied />}
      <Router>
        <Routes>
          <Route path="/" element={<Content />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
