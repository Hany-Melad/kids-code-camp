
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for pending payments
const pendingPayments = [
  { id: "P1", studentId: "ST1234", studentName: "John Doe", amount: 199.99, date: "2023-08-15", screenshot: "payment_receipt.jpg", planType: "Monthly", status: "pending" },
  { id: "P2", studentId: "ST5678", studentName: "Jane Smith", amount: 499.99, date: "2023-08-14", screenshot: "payment_receipt2.jpg", planType: "3 Months", status: "pending" },
  { id: "P3", studentId: "ST9012", studentName: "Robert Johnson", amount: 799.99, date: "2023-08-12", screenshot: "payment_receipt3.jpg", planType: "5 Months", status: "pending" },
];

// Mock data for approved payments
const approvedPayments = [
  { id: "P4", studentId: "ST2345", studentName: "Alice Brown", amount: 199.99, date: "2023-08-10", planType: "Monthly", expiryDate: "2023-09-10", status: "approved" },
  { id: "P5", studentId: "ST6789", studentName: "Charlie Davis", amount: 499.99, date: "2023-08-05", planType: "3 Months", expiryDate: "2023-11-05", status: "approved" },
  { id: "P6", studentId: "ST1234", studentName: "John Doe", amount: 799.99, date: "2023-07-15", planType: "5 Months", expiryDate: "2023-12-15", status: "approved" },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState({
    pending: pendingPayments,
    approved: approvedPayments
  });
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [viewScreenshot, setViewScreenshot] = useState(false);
  const { toast } = useToast();

  const handleApprove = (payment: any) => {
    // Calculate expiry date based on plan type
    let expiryDate = new Date();
    
    switch(payment.planType) {
      case "Monthly":
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;
      case "3 Months":
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        break;
      case "5 Months":
        expiryDate.setMonth(expiryDate.getMonth() + 5);
        break;
      default:
        expiryDate.setMonth(expiryDate.getMonth() + 1);
    }
    
    const formattedExpiryDate = expiryDate.toISOString().split('T')[0];
    
    // Update payment with approved status and expiry date
    const updatedPayment = {
      ...payment,
      status: "approved",
      expiryDate: formattedExpiryDate
    };
    
    // Remove from pending and add to approved
    setPayments({
      pending: payments.pending.filter(p => p.id !== payment.id),
      approved: [...payments.approved, updatedPayment]
    });
    
    toast({
      title: "Payment Approved",
      description: `Payment for ${payment.studentName} has been approved.`,
    });
  };

  const handleReject = (payment: any) => {
    // Remove from pending
    setPayments({
      ...payments,
      pending: payments.pending.filter(p => p.id !== payment.id)
    });
    
    toast({
      title: "Payment Rejected",
      description: `Payment for ${payment.studentName} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Payments</h2>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="approved">Approved Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Pending Payment Requests</h3>
            {payments.pending.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.pending.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.studentId}</TableCell>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.planType}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setViewScreenshot(true);
                          }}
                        >
                          <Eye size={16} className="mr-1" /> View
                        </Button>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                          onClick={() => handleApprove(payment)}
                        >
                          <Check size={16} className="mr-1" /> Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                          onClick={() => handleReject(payment)}
                        >
                          <X size={16} className="mr-1" /> Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No pending payment requests.</p>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Approved Payments</h3>
            {payments.approved.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.approved.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.studentId}</TableCell>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.planType}</TableCell>
                      <TableCell>{payment.expiryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          Approved
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No approved payments.</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Payment Screenshot Dialog */}
      <Dialog open={viewScreenshot} onOpenChange={setViewScreenshot}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              {selectedPayment && (
                <div className="text-sm">
                  <p>Student: {selectedPayment.studentName}</p>
                  <p>Amount: ${selectedPayment.amount}</p>
                  <p>Date: {selectedPayment.date}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 border rounded">
            {/* This would normally display the actual image - mock for demo */}
            <div className="h-60 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Payment Receipt Image</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewScreenshot(false)}
            >
              Close
            </Button>
            {selectedPayment && (
              <Button 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  handleApprove(selectedPayment);
                  setViewScreenshot(false);
                }}
              >
                Approve Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;
