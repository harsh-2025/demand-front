import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../client/src/pages/Home';
import CreateTask from '../../client/src/pages/CreateTask';
import EditTask from '../../client/src/pages/EditTask';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
    </Router>
  );
}
