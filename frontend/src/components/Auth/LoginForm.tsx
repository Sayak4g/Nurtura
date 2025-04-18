
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onToggleForm: () => void;
  onLoginSuccess: (username: string) => void;
}

const LoginForm = ({ onToggleForm, onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // In a real app, this would be an API call
      localStorage.setItem('user', username);
      onLoginSuccess(username);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    }
  };

  return (
    <Card className="w-[350px] p-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button
            onClick={onToggleForm}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
