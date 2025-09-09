// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
// Import other pages and components here as you create them

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar (Admin Navigation) - Will implement later */}
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <ul>
            <li className="mb-4">
              <a href="/admin/products" className="hover:text-blue-300">Products</a>
            </li>
            {/* Add links for Categories, Orders etc. here */}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/admin/products" element={<ProductListPage />} />
            {/* Add other routes here */}
            {/* <Route path="/admin/products/new" element={<ProductFormPage />} /> */}
            {/* <Route path="/admin/products/edit/:id" element={<ProductFormPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;