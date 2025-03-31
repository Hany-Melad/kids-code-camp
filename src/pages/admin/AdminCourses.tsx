
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
import { Lock, Unlock, Edit, Plus, Trash2, Video } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  lessons: number;
  students: number;
  thumbnail: string;
  isLocked: boolean;
  password: string;
}

interface Lesson {
  id: number;
  courseId: number;
  title: string;
  videoUrl: string;
  isLocked: boolean;
  password: string;
}

const AdminCourses = () => {
  const { toast } = useToast();
  
  // Mock data for courses and lessons
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1, 
      title: 'Python for Beginners', 
      description: 'Learn Python basics',
      lessons: 5, 
      students: 12,
      thumbnail: 'https://placehold.co/300x200/orange/white?text=Python+Basics',
      isLocked: true,
      password: 'python123'
    },
    {
      id: 2, 
      title: 'JavaScript Fundamentals', 
      description: 'Learn JavaScript basics',
      lessons: 4, 
      students: 8,
      thumbnail: 'https://placehold.co/300x200/blue/white?text=JavaScript',
      isLocked: true,
      password: 'js123'
    },
    {
      id: 3, 
      title: 'HTML & CSS', 
      description: 'Learn web development basics',
      lessons: 6, 
      students: 15,
      thumbnail: 'https://placehold.co/300x200/green/white?text=HTML+CSS',
      isLocked: false,
      password: ''
    },
  ]);
  
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      courseId: 1,
      title: 'Introduction to Python',
      videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      isLocked: true,
      password: 'lesson1'
    },
    {
      id: 2,
      courseId: 1,
      title: 'Variables and Data Types',
      videoUrl: 'https://www.youtube.com/watch?v=H1elmMBnykA',
      isLocked: true,
      password: 'lesson2'
    },
    {
      id: 3,
      courseId: 2,
      title: 'JavaScript Variables',
      videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      isLocked: true,
      password: 'js-lesson1'
    }
  ]);
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  
  // Form states for new/edit course
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');
  const [coursePassword, setCoursePassword] = useState('');
  const [isCourseLocked, setIsCourseLocked] = useState(true);
  
  // Form states for new/edit lesson
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonPassword, setLessonPassword] = useState('');
  const [isLessonLocked, setIsLessonLocked] = useState(true);
  
  // Set up edit course modal
  const setupEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseTitle(course.title);
    setCourseDescription(course.description);
    setCourseThumbnail(course.thumbnail);
    setCoursePassword(course.password);
    setIsCourseLocked(course.isLocked);
    setIsAddingCourse(false);
  };
  
  // Set up add course modal
  const setupAddCourse = () => {
    setSelectedCourse(null);
    setCourseTitle('');
    setCourseDescription('');
    setCourseThumbnail('https://placehold.co/300x200/orange/white?text=New+Course');
    setCoursePassword('');
    setIsCourseLocked(true);
    setIsAddingCourse(true);
  };
  
  // Set up add lesson modal
  const setupAddLesson = (courseId: number) => {
    setSelectedLesson(null);
    setLessonTitle('');
    setLessonVideoUrl('');
    setLessonPassword('');
    setIsLessonLocked(true);
    setIsAddingLesson(true);
    setSelectedCourse(courses.find(c => c.id === courseId) || null);
  };
  
  // Set up edit lesson modal
  const setupEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonVideoUrl(lesson.videoUrl);
    setLessonPassword(lesson.password);
    setIsLessonLocked(lesson.isLocked);
    setIsAddingLesson(false);
  };
  
  // Save course changes
  const saveCourse = () => {
    if (!courseTitle) {
      toast({
        title: "Error",
        description: "Course title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (isCourseLocked && !coursePassword) {
      toast({
        title: "Error",
        description: "Password is required for locked courses",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddingCourse) {
      // Add new course
      const newCourse: Course = {
        id: Math.max(0, ...courses.map(c => c.id)) + 1,
        title: courseTitle,
        description: courseDescription,
        lessons: 0,
        students: 0,
        thumbnail: courseThumbnail,
        isLocked: isCourseLocked,
        password: coursePassword
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Success",
        description: "New course created successfully",
      });
    } else if (selectedCourse) {
      // Update existing course
      setCourses(courses.map(c => 
        c.id === selectedCourse.id 
          ? {
              ...c,
              title: courseTitle,
              description: courseDescription,
              thumbnail: courseThumbnail,
              isLocked: isCourseLocked,
              password: coursePassword
            }
          : c
      ));
      toast({
        title: "Success",
        description: "Course updated successfully",
      });
    }
  };
  
  // Save lesson changes
  const saveLesson = () => {
    if (!lessonTitle || !lessonVideoUrl) {
      toast({
        title: "Error",
        description: "Lesson title and video URL are required",
        variant: "destructive",
      });
      return;
    }
    
    if (isLessonLocked && !lessonPassword) {
      toast({
        title: "Error",
        description: "Password is required for locked lessons",
        variant: "destructive",
      });
      return;
    }
    
    if (isAddingLesson && selectedCourse) {
      // Add new lesson
      const newLesson: Lesson = {
        id: Math.max(0, ...lessons.map(l => l.id)) + 1,
        courseId: selectedCourse.id,
        title: lessonTitle,
        videoUrl: lessonVideoUrl,
        isLocked: isLessonLocked,
        password: lessonPassword
      };
      setLessons([...lessons, newLesson]);
      
      // Update course lessons count
      setCourses(courses.map(c => 
        c.id === selectedCourse.id 
          ? { ...c, lessons: c.lessons + 1 }
          : c
      ));
      
      toast({
        title: "Success",
        description: "New lesson added successfully",
      });
    } else if (selectedLesson) {
      // Update existing lesson
      setLessons(lessons.map(l => 
        l.id === selectedLesson.id 
          ? {
              ...l,
              title: lessonTitle,
              videoUrl: lessonVideoUrl,
              isLocked: isLessonLocked,
              password: lessonPassword
            }
          : l
      ));
      toast({
        title: "Success",
        description: "Lesson updated successfully",
      });
    }
  };
  
  // Delete course
  const deleteCourse = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
    
    // Also delete all lessons for this course
    setLessons(lessons.filter(l => l.courseId !== courseId));
    
    toast({
      title: "Success",
      description: "Course and its lessons deleted successfully",
    });
  };
  
  // Delete lesson
  const deleteLesson = (lessonId: number, courseId: number) => {
    setLessons(lessons.filter(l => l.id !== lessonId));
    
    // Update course lessons count
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, lessons: c.lessons - 1 }
        : c
    ));
    
    toast({
      title: "Success",
      description: "Lesson deleted successfully",
    });
  };
  
  // Toggle course lock status
  const toggleCourseLock = (courseId: number, isLocked: boolean) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, isLocked: !isLocked }
        : c
    ));
    
    toast({
      title: "Success",
      description: `Course ${isLocked ? 'unlocked' : 'locked'} successfully`,
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={setupAddCourse} className="bg-orange-500 hover:bg-orange-600">
              <Plus size={16} className="mr-1" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isAddingCourse ? 'Add New Course' : 'Edit Course'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Enter course title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Enter course description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={courseThumbnail}
                  onChange={(e) => setCourseThumbnail(e.target.value)}
                  placeholder="Enter thumbnail URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isLocked"
                  checked={isCourseLocked}
                  onChange={() => setIsCourseLocked(!isCourseLocked)}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <Label htmlFor="isLocked">Password Protected</Label>
              </div>
              {isCourseLocked && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Course Password</Label>
                  <Input
                    id="password"
                    type="text"
                    value={coursePassword}
                    onChange={(e) => setCoursePassword(e.target.value)}
                    placeholder="Enter course password"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={saveCourse} className="bg-orange-500 hover:bg-orange-600">
                  {isAddingCourse ? 'Create Course' : 'Save Changes'}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Lessons</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <React.Fragment key={course.id}>
              <TableRow>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.lessons}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>
                  {course.isLocked ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Lock size={12} className="mr-1" /> Locked
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Unlock size={12} className="mr-1" /> Open
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
                          onClick={() => setupAddLesson(course.id)}
                        >
                          <Video size={14} className="mr-1" /> Add Lesson
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>{isAddingLesson ? 'Add New Lesson' : 'Edit Lesson'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="lessonTitle">Lesson Title</Label>
                            <Input
                              id="lessonTitle"
                              value={lessonTitle}
                              onChange={(e) => setLessonTitle(e.target.value)}
                              placeholder="Enter lesson title"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="videoUrl">YouTube Video URL</Label>
                            <Input
                              id="videoUrl"
                              value={lessonVideoUrl}
                              onChange={(e) => setLessonVideoUrl(e.target.value)}
                              placeholder="e.g., https://www.youtube.com/watch?v=..."
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="isLessonLocked"
                              checked={isLessonLocked}
                              onChange={() => setIsLessonLocked(!isLessonLocked)}
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <Label htmlFor="isLessonLocked">Password Protected</Label>
                          </div>
                          {isLessonLocked && (
                            <div className="grid gap-2">
                              <Label htmlFor="lessonPassword">Lesson Password</Label>
                              <Input
                                id="lessonPassword"
                                type="text"
                                value={lessonPassword}
                                onChange={(e) => setLessonPassword(e.target.value)}
                                placeholder="Enter lesson password"
                              />
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={saveLesson} className="bg-orange-500 hover:bg-orange-600">
                              {isAddingLesson ? 'Add Lesson' : 'Save Changes'}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCourseLock(course.id, course.isLocked)}
                    >
                      {course.isLocked ? <Unlock size={14} /> : <Lock size={14} />}
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setupEditCourse(course)}
                        >
                          <Edit size={14} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        {/* Same content as the add course dialog */}
                        <DialogHeader>
                          <DialogTitle>{isAddingCourse ? 'Add New Course' : 'Edit Course'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                              id="title"
                              value={courseTitle}
                              onChange={(e) => setCourseTitle(e.target.value)}
                              placeholder="Enter course title"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              value={courseDescription}
                              onChange={(e) => setCourseDescription(e.target.value)}
                              placeholder="Enter course description"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail URL</Label>
                            <Input
                              id="thumbnail"
                              value={courseThumbnail}
                              onChange={(e) => setCourseThumbnail(e.target.value)}
                              placeholder="Enter thumbnail URL"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="isLocked"
                              checked={isCourseLocked}
                              onChange={() => setIsCourseLocked(!isCourseLocked)}
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <Label htmlFor="isLocked">Password Protected</Label>
                          </div>
                          {isCourseLocked && (
                            <div className="grid gap-2">
                              <Label htmlFor="password">Course Password</Label>
                              <Input
                                id="password"
                                type="text"
                                value={coursePassword}
                                onChange={(e) => setCoursePassword(e.target.value)}
                                placeholder="Enter course password"
                              />
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={saveCourse} className="bg-orange-500 hover:bg-orange-600">
                              {isAddingCourse ? 'Create Course' : 'Save Changes'}
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
                            This will permanently delete the course "{course.title}" and all of its lessons. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteCourse(course.id)}
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
              
              {/* Lessons for this course */}
              {lessons.filter(lesson => lesson.courseId === course.id).map((lesson) => (
                <TableRow key={`lesson-${lesson.id}`} className="bg-gray-50">
                  <TableCell className="pl-10">
                    <div className="flex items-center">
                      <Video size={14} className="mr-2 text-gray-400" />
                      {lesson.title}
                    </div>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    {lesson.isLocked ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <Lock size={12} className="mr-1" /> Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Unlock size={12} className="mr-1" /> Open
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
                            onClick={() => setupEditLesson(lesson)}
                          >
                            <Edit size={14} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{isAddingLesson ? 'Add New Lesson' : 'Edit Lesson'}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="lessonTitle">Lesson Title</Label>
                              <Input
                                id="lessonTitle"
                                value={lessonTitle}
                                onChange={(e) => setLessonTitle(e.target.value)}
                                placeholder="Enter lesson title"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="videoUrl">YouTube Video URL</Label>
                              <Input
                                id="videoUrl"
                                value={lessonVideoUrl}
                                onChange={(e) => setLessonVideoUrl(e.target.value)}
                                placeholder="e.g., https://www.youtube.com/watch?v=..."
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id="isLessonLocked"
                                checked={isLessonLocked}
                                onChange={() => setIsLessonLocked(!isLessonLocked)}
                                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              />
                              <Label htmlFor="isLessonLocked">Password Protected</Label>
                            </div>
                            {isLessonLocked && (
                              <div className="grid gap-2">
                                <Label htmlFor="lessonPassword">Lesson Password</Label>
                                <Input
                                  id="lessonPassword"
                                  type="text"
                                  value={lessonPassword}
                                  onChange={(e) => setLessonPassword(e.target.value)}
                                  placeholder="Enter lesson password"
                                />
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={saveLesson} className="bg-orange-500 hover:bg-orange-600">
                                {isAddingLesson ? 'Add Lesson' : 'Save Changes'}
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
                              This will permanently delete the lesson "{lesson.title}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteLesson(lesson.id, course.id)}
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
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCourses;
