import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder';
import MyFormsPage from './pages/MyFormsPage';
import FormPreview from './pages/FormPreview';
import ViewForm from './pages/ViewForm';


function App() {
  return (
    <Router>
    <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
      <Link to="/" style={{ marginRight: 10 }}>Form Builder</Link>
      <Link to="/my-forms">My Forms</Link>
    </nav>
    <Routes>
      <Route path="/" element={<FormBuilder />} />
      <Route path="/my-forms" element={<MyFormsPage />} />
      <Route path="/forms/:formId" element={<FormPreview />} />
      <Route path="/view-form" element={<ViewForm />} />
    </Routes>
  </Router>
  );
}

export default App;
