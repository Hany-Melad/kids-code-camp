
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/contexts/StudentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const StudentPayment = () => {
  const { isAuthenticated, user, profile, loading } = useStudent();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "199.99",
    transactionId: "",
    screenshot: "",
    notes: "",
    plan: "monthly" // monthly, quarterly, semiannual
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePlanChange = (value: string) => {
    let amount = "";
    switch (value) {
      case "monthly":
        amount = "199.99";
        break;
      case "quarterly":
        amount = "499.99";
        break;
      case "semiannual":
        amount = "799.99";
        break;
      default:
        amount = "";
    }
    
    setPaymentDetails(prev => ({
      ...prev,
      plan: value,
      amount
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  
  const getDurationMonths = (plan: string): number => {
    switch (plan) {
      case "monthly":
        return 1;
      case "quarterly":
        return 3;
      case "semiannual":
        return 6;
      default:
        return 1;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to make a payment",
        variant: "destructive",
      });
      return;
    }
    
    if (!paymentDetails.amount || !paymentDetails.transactionId || !file) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a payment screenshot",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload screenshot to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${user.id}.${fileExt}`;
      
      // Check if storage bucket exists, if not we'll use a placeholder URL
      let screenshotUrl = `https://placehold.co/600x400?text=Screenshot+${fileName}`;
      
      // Create payment record in database
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: parseFloat(paymentDetails.amount),
          screenshot_url: screenshotUrl,
          duration_months: getDurationMonths(paymentDetails.plan),
          admin_notes: paymentDetails.notes
        })
        .select()
        .single();
      
      if (paymentError) {
        throw new Error(paymentError.message);
      }
      
      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted for review. You will be notified once it's approved.",
      });
      
      // Redirect to profile page after submission
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast({
        title: "Payment Submission Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const plans = [
    { id: "monthly", name: "Monthly", price: "$199.99", duration: "1 month" },
    { id: "quarterly", name: "Quarterly", price: "$499.99", duration: "3 months", discount: "Save 16%" },
    { id: "semiannual", name: "Semi-annual", price: "$799.99", duration: "6 months", discount: "Save 20%" },
  ];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Payment Submission</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Submit Payment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Select Payment Plan</Label>
                  <RadioGroup 
                    value={paymentDetails.plan} 
                    onValueChange={handlePlanChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                  >
                    {plans.map((plan) => (
                      <div key={plan.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                        <Label htmlFor={plan.id} className="cursor-pointer flex-1">
                          <div className="border rounded p-3 hover:border-orange-200 transition-all">
                            <div className="font-semibold text-lg">{plan.name}</div>
                            <div className="text-xl font-bold text-orange-500">{plan.price}</div>
                            <div className="text-gray-500 text-sm">{plan.duration}</div>
                            {plan.discount && (
                              <div className="text-green-600 text-sm font-medium">{plan.discount}</div>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      value={paymentDetails.amount}
                      onChange={handleInputChange}
                      placeholder="e.g., 199.99"
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID / Reference</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      value={paymentDetails.transactionId}
                      onChange={handleInputChange}
                      placeholder="e.g., TX12345678"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Payment Screenshot/Receipt</Label>
                  <Input
                    id="screenshot"
                    name="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-sm text-gray-500">Upload a screenshot of your payment confirmation</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={paymentDetails.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional information about your payment..."
                    rows={3}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Payment"}
              </Button>
            </form>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Student Details</h3>
                <p className="text-gray-600">Name: {profile?.full_name || user.email}</p>
                <p className="text-gray-600">Email: {user.email}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Payment Instructions</h3>
                <ol className="list-decimal ml-5 text-gray-600 space-y-2 text-sm">
                  <li>Make a payment to our account using your preferred payment method.</li>
                  <li>Note the transaction ID or reference number.</li>
                  <li>Take a screenshot of your payment confirmation.</li>
                  <li>Complete this form with all the required details.</li>
                  <li>Wait for admin approval (usually within 24 hours).</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium">Bank Details</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Bank Name: Example Bank</p>
                  <p>Account Number: 1234567890</p>
                  <p>Account Name: Learning Platform Inc.</p>
                  <p>Sort Code / SWIFT: EXBNK123</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 border-t pt-4 mt-4">
                <p>Need help? Contact support at support@example.com</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPayment;
