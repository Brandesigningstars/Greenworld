import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { Calendar, Clock } from 'lucide-react';

interface BookVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookVisitDialog({ open, onOpenChange }: BookVisitDialogProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format date for better readability
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });
    };

    // Get property type display name
    const getPropertyTypeName = (value: string) => {
      const propertyTypes: { [key: string]: string } = {
        '1bhk': '1 BHK Apartment',
        '2bhk': '2 BHK Apartment',
        '3bhk': '3 BHK Apartment',
        '4bhk': '4 BHK Apartment',
        'villa': 'Villa',
        'penthouse': 'Penthouse',
        'plot': 'Plot / Land',
        'commercial': 'Commercial Property',
      };
      return propertyTypes[value] || value;
    };

    // Create WhatsApp message with formatted data (simplified format for better compatibility)
    const whatsappMessage = `New Site Visit Booking Request\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Property Type: ${getPropertyTypeName(formData.propertyType)}\n` +
      `Preferred Date: ${formatDate(formData.date)}\n` +
      `Preferred Time: ${formData.time}\n\n` +
      `Please confirm this booking request.`;

    // WhatsApp number (ensure it's in international format without + or spaces)
    const whatsappNumber = '919600077816';
    
    // Properly encode the message for WhatsApp URL
    // Using encodeURIComponent to ensure special characters are properly encoded
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Construct WhatsApp URL - using wa.me format which works for both mobile and web
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Debug: log the URL to console (can be removed in production)
    console.log('WhatsApp URL:', whatsappUrl);
    console.log('Message:', whatsappMessage);

    // Method 1: Try opening in new tab (works best for WhatsApp Web)
    // Create a temporary anchor element and click it - this method is more reliable
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);

    // Show success message
    toast.success('Redirecting to WhatsApp...');

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyType: '',
      date: '',
      time: '',
    });
    
    // Close dialog after a short delay to allow user to see the toast
    setTimeout(() => {
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-800">Book a Site Visit</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll arrange a personalized property tour for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter your full name"
              required
              className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
              required
              className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <Label htmlFor="propertyType">Preferred Project / Property Type *</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              required
            >
              <SelectTrigger className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1bhk">1 BHK Apartment</SelectItem>
                <SelectItem value="2bhk">2 BHK Apartment</SelectItem>
                <SelectItem value="3bhk">3 BHK Apartment</SelectItem>
                <SelectItem value="4bhk">4 BHK Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="plot">Plot / Land</SelectItem>
                <SelectItem value="commercial">Commercial Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar size={16} />
                Preferred Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock size={16} />
                Preferred Time *
              </Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData({ ...formData, time: value })}
                required
              >
                <SelectTrigger className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00-10:00">09:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10:00-11:00">10:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11:00-12:00">11:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="12:00-13:00">12:00 PM - 01:00 PM</SelectItem>
                  <SelectItem value="14:00-15:00">02:00 PM - 03:00 PM</SelectItem>
                  <SelectItem value="15:00-16:00">03:00 PM - 04:00 PM</SelectItem>
                  <SelectItem value="16:00-17:00">04:00 PM - 05:00 PM</SelectItem>
                  <SelectItem value="17:00-18:00">05:00 PM - 06:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700">
              📱 Your booking details will be sent via WhatsApp and email. Our team will confirm your visit within 24 hours.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
            >
              Send Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
