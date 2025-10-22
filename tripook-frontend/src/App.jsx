import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkBackendHealth()
  }, [])

  const checkBackendHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/health')
      const data = await response.json()
      setBackendStatus(data)
    } catch (error) {
      console.error('Backend not available:', error)
      setBackendStatus({ status: 'DOWN', error: 'Backend not available' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold font-display text-gray-900">
                🏖️ Tripook
              </h1>
              <span className="ml-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Development
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Trips
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold font-display text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">Tripook</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your ultimate travel planning companion. Discover amazing destinations, 
            plan unforgettable trips, and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Start Planning
            </button>
            <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Explore Trips
            </button>
          </div>
        </div>

        {/* Backend Status Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🚀 System Status
            </h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-3 text-gray-600">Checking backend...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Backend API:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    backendStatus?.status === 'UP' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {backendStatus?.status || 'DOWN'}
                  </span>
                </div>
                
                {backendStatus?.service && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="text-sm text-gray-900">{backendStatus.service}</span>
                  </div>
                )}
                
                {backendStatus?.version && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="text-sm text-gray-900">{backendStatus.version}</span>
                  </div>
                )}
                
                {backendStatus?.timestamp && (
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    Last checked: {new Date(backendStatus.timestamp).toLocaleString()}
                  </div>
                )}

                <button 
                  onClick={checkBackendHealth}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  🔄 Refresh Status
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trip Planning</h3>
            <p className="text-gray-600">Plan your perfect trip with our intelligent itinerary builder.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Ready</h3>
            <p className="text-gray-600">Access your trips anywhere with our responsive design.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Social Features</h3>
            <p className="text-gray-600">Share your adventures and connect with fellow travelers.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Tripook. Built with ❤️ using React, TailwindCSS, and Spring Boot.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
