import React from 'react';
import './App.css'
import BooksList from './components/BooksList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Search App</h1>
      <BooksList />
    </div>
  );
};

export default App;
