
import { Phone } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const EmergencyButton = () => {
  const { toast } = useToast();

  const handleEmergency = () => {
    toast({
      title: "Emergency Alert Triggered",
      description: "Emergency services have been notified. Stay calm, help is on the way.",
      variant: "destructive",
    });
  };

  return (
    <button
      onClick={handleEmergency}
      className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group animate-pulse"
    >
      <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="flex flex-col items-center justify-center text-white">
        <Phone size={32} className="mb-2" />
        <span className="font-bold text-lg">SOS</span>
      </div>
    </button>
  );
};

export default EmergencyButton;
