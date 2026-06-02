import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Shop from './pages/Shop'
import NewPost from './pages/NewPost'
import EditProfile from './pages/EditProfile'

function App() {
  const [currentPage, setCurrentPage] = useState('feed') // 'login' | 'register' | 'feed' | 'newpost' | 'profile'

  const navigateToRegister = () => setCurrentPage('register')
  const navigateToShop = () => setCurrentPage('shop')
  const navigateToLogin = () => setCurrentPage('login')
  const navigateToFeed = () => setCurrentPage('feed')
  const navigateToNewPost = () => setCurrentPage('newpost')
  const navigateToProfile = () => setCurrentPage('profile')
  const handleLogout = () => setCurrentPage('login')

  if (currentPage === 'register') {
    return <Register onNavigateToLogin={navigateToLogin} />
  }

  if (currentPage === 'feed') {
    return <Feed 
      onNavigateToNewPost={navigateToNewPost} 
      onNavigateToProfile={navigateToProfile} 
      onNavigateToShop={navigateToShop} 
      onLogout={handleLogout}  
    />
  }

  if(currentPage === 'shop') {
    return <Shop 
      onNavigateToFeed={navigateToFeed} 
      onNavigateToProfile={navigateToProfile} 
      onLogout={handleLogout} 
    />
  }

  if (currentPage === 'newpost') {
    return <NewPost onNavigateToFeed={navigateToFeed} />
  }

  if (currentPage === 'profile') {
    return <EditProfile 
      onNavigateToFeed={navigateToFeed} 
      onNavigateToShop={navigateToShop} 
      onNavigateToNewPost={navigateToNewPost} 
      onLogout={handleLogout} 
    />
  }

  return <Login onNavigateToRegister={navigateToRegister} onNavigateToFeed={navigateToFeed} />
}

export default App
