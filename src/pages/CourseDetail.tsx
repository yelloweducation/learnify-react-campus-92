
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Star, Users, Clock, PlayCircle, CheckCircle } from 'lucide-react';

// Mock course data
const COURSE_DATA = {
  '1': {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the fundamentals of React development and build modern web applications',
    longDescription: 'This comprehensive React course will take you from beginner to confident React developer. You\'ll learn all the core concepts including components, state management, hooks, and much more.',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 1234,
    price: 99,
    image: '/api/placeholder/600/400',
    category: 'Programming',
    duration: '12 hours',
    modules: [
      { id: 1, title: 'Introduction to React', duration: '45 min', completed: false },
      { id: 2, title: 'Components and JSX', duration: '60 min', completed: false },
      { id: 3, title: 'State and Props', duration: '75 min', completed: false },
      { id: 4, title: 'Event Handling', duration: '50 min', completed: false },
      { id: 5, title: 'React Hooks', duration: '90 min', completed: false },
    ]
  },
  '2': {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master modern JavaScript concepts and advanced programming techniques',
    longDescription: 'Dive deep into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
    instructor: 'Mike Chen',
    rating: 4.9,
    students: 2156,
    price: 129,
    image: '/api/placeholder/600/400',
    category: 'Programming',
    duration: '15 hours',
    modules: [
      { id: 1, title: 'Advanced Functions', duration: '60 min', completed: false },
      { id: 2, title: 'Closures and Scope', duration: '45 min', completed: false },
      { id: 3, title: 'Prototypes and Inheritance', duration: '70 min', completed: false },
      { id: 4, title: 'Async Programming', duration: '85 min', completed: false },
      { id: 5, title: 'Modern ES6+ Features', duration: '90 min', completed: false },
    ]
  },
  '3': {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful user interfaces and enhance user experience',
    longDescription: 'Learn the principles of great design and how to create intuitive, beautiful user interfaces that users love.',
    instructor: 'Emily Davis',
    rating: 4.7,
    students: 987,
    price: 149,
    image: '/api/placeholder/600/400',
    category: 'Design',
    duration: '18 hours',
    modules: [
      { id: 1, title: 'Design Principles', duration: '55 min', completed: false },
      { id: 2, title: 'Color Theory', duration: '40 min', completed: false },
      { id: 3, title: 'Typography', duration: '65 min', completed: false },
      { id: 4, title: 'User Research', duration: '80 min', completed: false },
      { id: 5, title: 'Prototyping', duration: '95 min', completed: false },
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const course = COURSE_DATA[id as keyof typeof COURSE_DATA];

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <Button onClick={() => navigate('/')} className="mt-4">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    toast({
      title: "Enrolled successfully!",
      description: `You've been enrolled in ${course.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-2">{course.category}</Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Instructor: <span className="font-medium">{course.instructor}</span>
              </p>
            </div>

            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
              <p className="text-gray-700">{course.longDescription}</p>
            </div>

            {/* Course Modules */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h2>
              <Card>
                <CardContent className="p-0">
                  {course.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {index + 1}. {module.title}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">${course.price}</div>
                  <Button onClick={handleEnroll} className="w-full mb-4">
                    Enroll Now
                  </Button>
                  <p className="text-sm text-gray-500">30-day money-back guarantee</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{course.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
