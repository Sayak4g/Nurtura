
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto py-4 border-t">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="text-center text-sm text-muted-foreground">
          <span className="flex items-center justify-center gap-1">
            Created with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> by Rule Breakers 2025
          </span>
          <span className="block text-xs mt-1">All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
