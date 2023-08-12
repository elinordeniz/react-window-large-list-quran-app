import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import Copied from "./components/Copied";
import DownloadPdf from "./components/DownloadPdf";
import Collection from "./components/Collection";
import { useSelector } from "react-redux";
import { selectCopied } from "./features/collection/collectionSlice";
import Header from "./components/Header";
import VersesContainer from "./components/VersesContainer";
function App() {
  const copied = useSelector(selectCopied);

  return (
    <>
      {copied && <Copied />}
      <Router>
        <Routes>
          <Route element={<Content />}>
          <Route path="/*" element={ <VersesContainer />} />
          <Route path="/download" element={<DownloadPdf />} />
          <Route path="/collection/:slugs" element={<Collection />} />
</Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
