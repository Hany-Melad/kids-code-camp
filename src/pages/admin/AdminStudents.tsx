
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, CheckCircle, XCircle, BookOpen, Award } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  joined: string;
  activeCourses: number;
  completedCourses: number;
  hasPaid: boolean;
}

interface CourseAssignment {
  id: number;
  studentId: number;
  courseId: number;
  courseTitle: string;
  assignedDate: string;
  progress: number;
  completed: boolean;
}

const AdminStudents = () => {
  const { toast } = useToast();
  
  // Mock data for students
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      age: 12,
      joined: '2023-05-10',
      activeCourses: 2,
      completedCourses: 1,
      hasPaid: true
    },
    {
      id: 2,
      name: 'Samantha Lee',
      email: 'samantha@example.com',
      age: 14,
      joined: '2023-06-15',
      activeCourses: 1,
      completedCourses: 2,
      hasPaid: true
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      age: 10,
      joined: '2023-07-20',
      activeCourses: 3,
      completedCourses: 0,
      hasPaid: false
    }
  ]);
  
  // Mock data for course assignments
  const [assignments, setAssignments] = useState<CourseAssignment[]>([
    {
      id: 1,
      studentId: 1,
      courseId: 1,
      courseTitle: 'Python for Beginners',
      assignedDate: '2023-05-12',
      progress: 75,
      completed: false
    },
    {
      id: 2,
      studentId: 1,
      courseId: 2,
      courseTitle: 'JavaScript Fundamentals',
      assignedDate: '2023-06-01',
      progress: 30,
      completed: false
    },
    {
      id: 3,
      studentId: 1,
      courseId: 3,
      courseTitle: 'HTML & CSS',
      assignedDate: '2023-05-20',
      progress: 100,
      completed: true
    },
    {
      id: 4,
      studentId: 2,
      courseId: 1,
      courseTitle: 'Python for Beginners',
      assignedDate: '2023-06-18',
      progress: 100,
      completed: true
    },
    {
      id: 5,
      studentId: 2,
      courseId: 2,
      courseTitle: 'JavaScript Fundamentals',
      assignedDate: '2023-07-05',
      progress: 100,
      completed: true
    },
    {
      id: 6,
      studentId: 3,
      courseId: 1,
      courseTitle: 'Python for Beginners',
      assignedDate: '2023-07-22',
      progress: 15,
      completed: false
    },
    {
      id: 7,
      studentId: 3,
      courseId: 2,
      courseTitle: 'JavaScript Fundamentals',
      assignedDate: '2023-07-25',
      progress: 10,
      completed: false
    },
    {
      id: 8,
      studentId: 3,
      courseId: 3,
      courseTitle: 'HTML & CSS',
      assignedDate: '2023-08-01',
      progress: 5,
      completed: false
    }
  ]);
  
  // Mock course data
  const courses = [
    { id: 1, title: 'Python for Beginners' },
    { id: 2, title: 'JavaScript Fundamentals' },
    { id: 3, title: 'HTML & CSS' }
  ];
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [showAssigning, setShowAssigning] = useState(false);
  
  // Form states for student
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentHasPaid, setStudentHasPaid] = useState(false);
  
  // Form states for course assignment
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  
  // Set up add student modal
  const setupAddStudent = () => {
    setSelectedStudent(null);
    setStudentName('');
    setStudentEmail('');
    setStudentAge('');
    setStudentHasPaid(false);
    setIsAddingStudent(true);
  };
  
  // Set up edit student modal
  const setupEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setStudentName(student.name);
    setStudentEmail(student.email);
    setStudentAge(student.age.toString());
    setStudentHasPaid(student.hasPaid);
    setIsAddingStudent(false);
  };
  
  // Set up assign course modal
  const setupAssignCourse = (student: Student) => {
    setSelectedStudent(student);
    setShowAssigning(true);
    setSelectedCourseId(null);
  };
  
  // Save student changes
  const saveStudent = () => {
    if (!studentName || !studentEmail || !studentAge) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    
    const age = parseInt(studentAge);
    if (isNaN(age) || age < 5 || age > 18) {
      toast({
        title: "Error",
        description: "Age must be between 5 and 18",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddingStudent) {
      // Add new student
      const newStudent: Student = {
        id: Math.max(0, ...students.map(s => s.id)) + 1,
        name: studentName,
        email: studentEmail,
        age: age,
        joined: new Date().toISOString().slice(0, 10),
        activeCourses: 0,
        completedCourses: 0,
        hasPaid: studentHasPaid
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Success",
        description: "New student added successfully",
      });
    } else if (selectedStudent) {
      // Update existing student
      setStudents(students.map(s => 
        s.id === selectedStudent.id 
          ? {
              ...s,
              name: studentName,
              email: studentEmail,
              age: age,
              hasPaid: studentHasPaid
            }
          : s
      ));
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
    }
  };
  
  // Assign course to student
  const assignCourse = () => {
    if (!selectedCourseId || !selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a course",
        variant: "destructive",
      });
      return;
    }
    
    // Check if student is already assigned to this course
    const exists = assignments.some(
      a => a.studentId === selectedStudent.id && a.courseId === selectedCourseId
    );
    
    if (exists) {
      toast({
        title: "Error",
        description: "Student is already assigned to this course",
        variant: "destructive",
      });
      return;
    }
    
    const course = courses.find(c => c.id === selectedCourseId);
    if (!course) {
      toast({
        title: "Error",
        description: "Invalid course selected",
        variant: "destructive",
      });
      return;
    }
    
    // Create new assignment
    const newAssignment: CourseAssignment = {
      id: Math.max(0, ...assignments.map(a => a.id)) + 1,
      studentId: selectedStudent.id,
      courseId: selectedCourseId,
      courseTitle: course.title,
      assignedDate: new Date().toISOString().slice(0, 10),
      progress: 0,
      completed: false
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Update student's active courses
    setStudents(students.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, activeCourses: s.activeCourses + 1 }
        : s
    ));
    
    toast({
      title: "Success",
      description: `Course "${course.title}" assigned to ${selectedStudent.name}`,
    });
  };
  
  // Toggle payment status
  const togglePaymentStatus = (studentId: number, currentStatus: boolean) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, hasPaid: !currentStatus }
        : s
    ));
    
    toast({
      title: "Success",
      description: `Payment status updated for student`,
    });
  };
  
  // Delete student
  const deleteStudent = (studentId: number) => {
    setStudents(students.filter(s => s.id !== studentId));
    
    // Also delete all assignments for this student
    setAssignments(assignments.filter(a => a.studentId !== studentId));
    
    toast({
      title: "Success",
      description: "Student and their assignments deleted successfully",
    });
  };
  
  // Mark course as completed
  const markCourseAsCompleted = (assignmentId: number, studentId: number) => {
    // Update assignment
    setAssignments(assignments.map(a => 
      a.id === assignmentId 
        ? { ...a, completed: true, progress: 100 }
        : a
    ));
    
    // Update student's courses count
    setStudents(students.map(s => 
      s.id === studentId 
        ? { 
            ...s, 
            activeCourses: s.activeCourses - 1,
            completedCourses: s.completedCourses + 1
          }
        : s
    ));
    
    toast({
      title: "Success",
      description: "Course marked as completed",
    });
  };
  
  // Remove course assignment
  const removeCourseAssignment = (assignment: CourseAssignment) => {
    setAssignments(assignments.filter(a => a.id !== assignment.id));
    
    // Update student's courses count
    if (!assignment.completed) {
      setStudents(students.map(s => 
        s.id === assignment.studentId 
          ? { ...s, activeCourses: Math.max(0, s.activeCourses - 1) }
          : s
      ));
    } else {
      setStudents(students.map(s => 
        s.id === assignment.studentId 
          ? { ...s, completedCourses: Math.max(0, s.completedCourses - 1) }
          : s
      ));
    }
    
    toast({
      title: "Success",
      description: "Course assignment removed",
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Students</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={setupAddStudent} className="bg-orange-500 hover:bg-orange-600">
              <Plus size={16} className="mr-1" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isAddingStudent ? 'Add New Student' : 'Edit Student'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Enter student's email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="5"
                  max="18"
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  placeholder="Enter student's age"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasPaid"
                  checked={studentHasPaid}
                  onChange={() => setStudentHasPaid(!studentHasPaid)}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <Label htmlFor="hasPaid">Has Paid Fees</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={saveStudent} className="bg-orange-500 hover:bg-orange-600">
                  {isAddingStudent ? 'Add Student' : 'Save Changes'}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <React.Fragment key={student.id}>
              <TableRow>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{new Date(student.joined).toLocaleDateString()}</TableCell>
                <TableCell>
                  {student.activeCourses} active, {student.completedCourses} completed
                </TableCell>
                <TableCell>
                  {student.hasPaid ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle size={12} className="mr-1" /> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle size={12} className="mr-1" /> Unpaid
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setupAssignCourse(student)}
                        >
                          <BookOpen size={14} className="mr-1" /> Assign Course
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Assign Course to {student?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <Label htmlFor="course" className="mb-2 block">Select Course</Label>
                          <select
                            id="course"
                            value={selectedCourseId || ''}
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="">-- Select a course --</option>
                            {courses.map(course => (
                              <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                          </select>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={assignCourse} className="bg-orange-500 hover:bg-orange-600">
                              Assign Course
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePaymentStatus(student.id, student.hasPaid)}
                    >
                      {student.hasPaid ? (
                        <XCircle size={14} className="text-red-500" />
                      ) : (
                        <CheckCircle size={14} className="text-green-500" />
                      )}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setupEditStudent(student)}
                        >
                          <Edit size={14} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>{isAddingStudent ? 'Add New Student' : 'Edit Student'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
                              placeholder="Enter student's full name"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={studentEmail}
                              onChange={(e) => setStudentEmail(e.target.value)}
                              placeholder="Enter student's email"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              min="5"
                              max="18"
                              value={studentAge}
                              onChange={(e) => setStudentAge(e.target.value)}
                              placeholder="Enter student's age"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="hasPaid"
                              checked={studentHasPaid}
                              onChange={() => setStudentHasPaid(!studentHasPaid)}
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <Label htmlFor="hasPaid">Has Paid Fees</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={saveStudent} className="bg-orange-500 hover:bg-orange-600">
                              {isAddingStudent ? 'Add Student' : 'Save Changes'}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                          <Trash2 size={14} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the student "{student.name}" and all their course assignments. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteStudent(student.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
              
              {/* Course assignments for this student */}
              {assignments.filter(a => a.studentId === student.id).map((assignment) => (
                <TableRow key={`assignment-${assignment.id}`} className="bg-gray-50">
                  <TableCell className="pl-10">
                    <div className="flex items-center">
                      <BookOpen size={14} className="mr-2 text-gray-400" />
                      {assignment.courseTitle}
                    </div>
                  </TableCell>
                  <TableCell>
                    Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell colSpan={3}>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{assignment.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${assignment.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${assignment.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {assignment.completed ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {!assignment.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markCourseAsCompleted(assignment.id, student.id)}
                          className="text-green-500 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle size={14} className="mr-1" /> Mark Completed
                        </Button>
                      )}
                      
                      {assignment.completed && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 border-green-200 hover:bg-green-50"
                            >
                              <Award size={14} className="mr-1" /> Issue Certificate
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Issue Certificate</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p>You are about to issue a certificate for <strong>{assignment.courseTitle}</strong> to <strong>{student.name}</strong>.</p>
                              <p className="mt-2">This will create a certificate that the student can access from their certificates page.</p>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button 
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => {
                                    toast({
                                      title: "Certificate Issued",
                                      description: `Certificate for ${assignment.courseTitle} issued to ${student.name}`,
                                    });
                                  }}
                                >
                                  Issue Certificate
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                            <Trash2 size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the course "{assignment.courseTitle}" from this student. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removeCourseAssignment(assignment)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Divider row */}
              {students.indexOf(student) < students.length - 1 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-2 p-0">
                    <div className="border-t"></div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminStudents;
