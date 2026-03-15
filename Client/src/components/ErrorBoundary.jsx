import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 text-center">
          <div className="bg-[#23252B] p-10 rounded-2xl border border-white/5 shadow-2xl max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Something went wrong</h1>
            <p className="text-gray-500 text-sm mb-8 font-bold">The page encountered an unexpected error. Please try refreshing or return home.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#F47521] text-black font-black py-4 px-10 rounded-xl uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
