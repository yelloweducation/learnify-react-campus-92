
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award } from 'lucide-react';

// Mock enrolled courses
const ENROLLED_COURSES = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React development',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 1234,
    price: 99,
    image: '/api/placeholder/300/200',
    category: 'Programming',
    progress: 65
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Master modern JavaScript concepts',
    instructor: 'Mike Chen',
    rating: 4.9,
    students: 2156,
    price: 129,
    image: '/api/placeholder/300/200',
    category: 'Programming',
    progress: 30
  }
];

const RECOMMENDED_COURSES = [
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create beautiful user interfaces',
    instructor: 'Emily Davis',
    rating: 4.7,
    students: 987,
    price: 149,
    image: '/api/placeholder/300/200',
    category: 'Design'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-10 w-10 text-blue-600 bg-blue-100 rounded-lg p-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{ENROLLED_COURSES.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-green-600 bg-green-100 rounded-lg p-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-10 w-10 text-purple-600 bg-purple-100 rounded-lg p-2" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ENROLLED_COURSES.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <img src={course.image} alt={course.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Progress value={course.progress} className="flex-1" />
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOMMENDED_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
