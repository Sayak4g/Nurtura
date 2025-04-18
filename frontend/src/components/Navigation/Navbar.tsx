import { Moon, Sun, LogOut, Pill, ListChecks, Users, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  username: string;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ username, onLogout, isDark, toggleTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary transition-transform hover:scale-105">Nurtura</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors flex items-center gap-1.5">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link to="/medical" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors flex items-center gap-1.5">
                <Pill className="h-4 w-4" />
                Medical
              </Link>
              <Link to="/tasks" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors flex items-center gap-1.5">
                <ListChecks className="h-4 w-4" />
                Tasks
              </Link>
              <Link to="/contacts" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                Contacts
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {username}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 px-0 transition-transform hover:rotate-12"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9 px-0 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
