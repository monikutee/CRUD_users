import { Routes, Route } from "react-router-dom";
import { Home } from "./components";
import { AddEdit } from "./components";
import { ContextProvider } from "./contextStore";

function App() {
  return (
    <ContextProvider initialUsers={[]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="edit" element={<AddEdit />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
