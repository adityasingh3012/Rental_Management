import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { RentalOrders } from './pages/RentalOrders';
import { RentalOrderForm } from './pages/RentalOrderForm';
import { RentalOrderFormData } from './types/rentalForm';
import { NavigationPage, NavigationProps } from './types/navigation';

function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [editingOrderId, setEditingOrderId] = useState<string | undefined>();

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    if (page !== 'rental-form') {
      setEditingOrderId(undefined);
    }
  };

  const handleCreateRental = () => {
    setEditingOrderId(undefined);
    setCurrentPage('rental-form');
  };

  const handleEditRental = (orderId: string) => {
    setEditingOrderId(orderId);
    setCurrentPage('rental-form');
  };

  const handleSaveRental = async (data: RentalOrderFormData) => {
    // TODO: Implement save logic
    console.log('Saving rental order:', data);
    setCurrentPage('rental');
  };

  const handleCancelRental = () => {
    setCurrentPage('rental');
  };

  // Navigation props to pass to all pages
  const navigationProps: NavigationProps = {
    currentPage,
    onNavigate: handleNavigate,
    onCreateRental: handleCreateRental,
    onEditRental: handleEditRental
  };

  return (
    <ThemeProvider>
      {currentPage === 'dashboard' && <Dashboard {...navigationProps} />}
      {currentPage === 'rental' && <RentalOrders {...navigationProps} />}
      {currentPage === 'order' && <RentalOrders {...navigationProps} />}
      {currentPage === 'rental-form' && (
        <RentalOrderForm
          orderId={editingOrderId}
          onSave={handleSaveRental}
          onCancel={handleCancelRental}
          {...navigationProps}
        />
      )}
      {/* Placeholder pages for future implementation */}
      {currentPage === 'products' && (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Products Page</h1>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
      {currentPage === 'reporting' && (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reporting Page</h1>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
      {currentPage === 'setting' && (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings Page</h1>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;