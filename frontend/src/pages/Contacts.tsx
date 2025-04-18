
import { useState } from 'react';
import { User, Plus, Trash2, Phone, Mail, UserPlus, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation: string;
};

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('caregiverContacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const { toast } = useToast();

  const addContact = () => {
    if (!name || !phone) {
      toast({
        title: "Missing information",
        description: "Name and phone number are required.",
        variant: "destructive",
      });
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      relation,
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('caregiverContacts', JSON.stringify(updatedContacts));

    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setRelation('');

    toast({
      title: "Contact added",
      description: "New caregiver contact has been added to your list.",
    });
  };

  const deleteContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('caregiverContacts', JSON.stringify(updatedContacts));
    
    toast({
      title: "Contact deleted",
      description: "Caregiver contact has been removed from your list.",
    });
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-6">Caregiver Contacts</h1>
      
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
        
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input 
              id="contact-name" 
              placeholder="Enter name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="contact-relation">Relationship</Label>
            <Input 
              id="contact-relation" 
              placeholder="e.g. Nurse, Family Member" 
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="contact-phone">Phone Number</Label>
            <Input 
              id="contact-phone" 
              placeholder="Enter phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="contact-email">Email (Optional)</Label>
            <Input 
              id="contact-email" 
              type="email" 
              placeholder="Enter email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <Button onClick={addContact} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>
      
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>
        
        {contacts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-background border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{contact.name}</h3>
                      {contact.relation && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {contact.relation}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteContact(contact.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive -mt-1 -mr-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 text-sm">
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {contact.phone}
                  </a>
                  {contact.email && (
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {contact.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <UserPlus className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>No contacts added yet.</p>
            <p className="text-sm">Add your first caregiver contact using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
