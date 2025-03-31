
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Eye, Download, Trash } from 'lucide-react';

// Mock data for certificate templates
const certificateTemplates = [
  { id: 1, name: "Course Completion", course: "Python for Beginners", design: "Modern Blue", createdAt: "2023-07-15" },
  { id: 2, name: "Excellence Award", course: "Web Development", design: "Golden Premium", createdAt: "2023-07-20" },
  { id: 3, name: "Achievement Certificate", course: "Data Science", design: "Professional Gray", createdAt: "2023-08-01" },
];

// Mock data for issued certificates
const issuedCertificates = [
  { id: "C1001", studentId: "ST1234", studentName: "John Doe", course: "Python for Beginners", issuedDate: "2023-08-10", template: "Course Completion" },
  { id: "C1002", studentId: "ST5678", studentName: "Jane Smith", course: "Web Development", issuedDate: "2023-08-12", template: "Excellence Award" },
  { id: "C1003", studentId: "ST9012", studentName: "Robert Johnson", course: "Data Science", issuedDate: "2023-08-15", template: "Achievement Certificate" },
];

const AdminCertificates = () => {
  const [templates, setTemplates] = useState(certificateTemplates);
  const [certificates, setCertificates] = useState(issuedCertificates);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    course: "",
    design: "",
  });
  
  const [newCertificate, setNewCertificate] = useState({
    studentId: "",
    studentName: "",
    course: "",
    template: "",
  });
  
  const { toast } = useToast();

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.course || !newTemplate.design) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const newId = templates.length > 0 ? Math.max(...templates.map(t => t.id)) + 1 : 1;
    
    setTemplates([
      ...templates,
      {
        id: newId,
        name: newTemplate.name,
        course: newTemplate.course,
        design: newTemplate.design,
        createdAt: new Date().toISOString().split('T')[0],
      }
    ]);
    
    setNewTemplate({
      name: "",
      course: "",
      design: "",
    });
    
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Template Created",
      description: `Certificate template "${newTemplate.name}" has been created.`,
    });
  };

  const handleIssueCertificate = () => {
    if (!newCertificate.studentId || !newCertificate.studentName || !newCertificate.course || !newCertificate.template) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const newId = `C${1000 + certificates.length + 1}`;
    
    setCertificates([
      ...certificates,
      {
        id: newId,
        studentId: newCertificate.studentId,
        studentName: newCertificate.studentName,
        course: newCertificate.course,
        issuedDate: new Date().toISOString().split('T')[0],
        template: newCertificate.template,
      }
    ]);
    
    setNewCertificate({
      studentId: "",
      studentName: "",
      course: "",
      template: "",
    });
    
    setIsIssueDialogOpen(false);
    
    toast({
      title: "Certificate Issued",
      description: `Certificate has been issued to ${newCertificate.studentName}.`,
    });
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    
    toast({
      title: "Template Deleted",
      description: "Certificate template has been deleted.",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Certificates</h2>
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="templates">Certificate Templates</TabsTrigger>
          <TabsTrigger value="issued">Issued Certificates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Certificate Templates</h3>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus size={16} className="mr-1" /> Create Template
              </Button>
            </div>
            
            {templates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Design</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.course}</TableCell>
                      <TableCell>{template.design}</TableCell>
                      <TableCell>{template.createdAt}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setIsPreviewDialogOpen(true);
                          }}
                        >
                          <Eye size={16} className="mr-1" /> Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash size={16} className="mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No certificate templates yet. Create your first template.</p>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="issued">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Issued Certificates</h3>
              <Button onClick={() => setIsIssueDialogOpen(true)}>
                <Plus size={16} className="mr-1" /> Issue Certificate
              </Button>
            </div>
            
            {certificates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>{cert.id}</TableCell>
                      <TableCell>{cert.studentName}</TableCell>
                      <TableCell>{cert.course}</TableCell>
                      <TableCell>{cert.template}</TableCell>
                      <TableCell>{cert.issuedDate}</TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye size={16} className="mr-1" /> View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Download size={16} className="mr-1" /> Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500">No certificates have been issued yet.</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Certificate Template</DialogTitle>
            <DialogDescription>
              Create a new certificate template for courses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input 
                id="templateName" 
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                placeholder="e.g., Course Completion Certificate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input 
                id="course" 
                value={newTemplate.course}
                onChange={(e) => setNewTemplate({...newTemplate, course: e.target.value})}
                placeholder="e.g., Python for Beginners"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="design">Design Style</Label>
              <Input 
                id="design" 
                value={newTemplate.design}
                onChange={(e) => setNewTemplate({...newTemplate, design: e.target.value})}
                placeholder="e.g., Modern Blue"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTemplate}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Issue Certificate Dialog */}
      <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Certificate</DialogTitle>
            <DialogDescription>
              Issue a certificate to a student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input 
                id="studentId" 
                value={newCertificate.studentId}
                onChange={(e) => setNewCertificate({...newCertificate, studentId: e.target.value})}
                placeholder="e.g., ST1234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input 
                id="studentName" 
                value={newCertificate.studentName}
                onChange={(e) => setNewCertificate({...newCertificate, studentName: e.target.value})}
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueCourse">Course</Label>
              <Input 
                id="issueCourse" 
                value={newCertificate.course}
                onChange={(e) => setNewCertificate({...newCertificate, course: e.target.value})}
                placeholder="e.g., Python for Beginners"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Certificate Template</Label>
              <select 
                id="template"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newCertificate.template}
                onChange={(e) => setNewCertificate({...newCertificate, template: e.target.value})}
              >
                <option value="">Select a template</option>
                {templates.map(t => (
                  <option key={t.id} value={t.name}>{t.name} ({t.design})</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIssueDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleIssueCertificate}>Issue Certificate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificate Template Preview</DialogTitle>
            <DialogDescription>
              {selectedTemplate && (
                <div className="text-sm">
                  <p>Template: {selectedTemplate.name}</p>
                  <p>Design: {selectedTemplate.design}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 border rounded p-6">
            {selectedTemplate && (
              <div className="h-80 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-indigo-100 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-serif text-indigo-800 mb-6">Certificate of Completion</h2>
                <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
                <p className="text-xl font-bold text-indigo-900 mb-2">[Student Name]</p>
                <p className="text-lg text-gray-700 mb-6">has successfully completed the course</p>
                <p className="text-xl font-bold text-indigo-900 mb-8">{selectedTemplate.course}</p>
                <div className="w-full flex justify-between items-center mt-4">
                  <div className="text-center">
                    <div className="mb-2 border-b border-gray-400 w-32">Date</div>
                    <p className="text-sm">[Issue Date]</p>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 border-b border-gray-400 w-32">Signature</div>
                    <p className="text-sm">Course Instructor</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificates;
