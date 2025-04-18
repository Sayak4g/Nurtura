
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckSquare, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import Navbar from '@/components/Navigation/Navbar';
import EmergencyButton from '@/components/EmergencyButton/EmergencyButton';

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
    
    // Check if dark mode is enabled
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const shouldEnableDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldEnableDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="w-full max-w-md mx-auto p-6">
          {showLogin ? (
            <LoginForm
              onToggleForm={() => setShowLogin(false)}
              onLoginSuccess={handleLogin}
            />
          ) : (
            <SignupForm
              onToggleForm={() => setShowLogin(true)}
              onSignupSuccess={handleLogin}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        username={username}
        onLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Nurtura Care</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personal care companion</p>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="animate-pulse">
            <EmergencyButton />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in">
            <div 
              className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] cursor-pointer"
              onClick={() => navigate('/medical')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Medical Reminders</h3>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Track your medications and appointments with ease.</p>
              <Button variant="outline" size="sm" className="w-full group">
                <span>View Reminders</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div 
              className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] cursor-pointer"
              onClick={() => navigate('/tasks')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Daily Tasks</h3>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <CheckSquare className="h-5 w-5" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your daily activities and routines effectively.</p>
              <Button variant="outline" size="sm" className="w-full group">
                <span>View Tasks</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div 
              className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] cursor-pointer"
              onClick={() => navigate('/contacts')}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Caregiver Contacts</h3>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Quick access to your support network when needed.</p>
              <Button variant="outline" size="sm" className="w-full group">
                <span>View Contacts</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
