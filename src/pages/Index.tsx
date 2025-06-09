
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Search, Video, BookOpen, Users, Star } from 'lucide-react';

// Mock courses data
const MOCK_COURSES = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React development',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 1234,
    price: 99,
    image: '/api/placeholder/300/200',
    category: 'Programming'
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
    category: 'Programming'
  },
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCourses, setShowCourses] = useState(false);
  const navigate = useNavigate();

  const filteredCourses = MOCK_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setShowCourses(true);
  };

  const handleVideoFeed = () => {
    navigate('/videos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Without
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Limits</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Discover thousands of courses from expert instructors and advance your skills
            </p>
            
            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-14 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="h-14 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleVideoFeed} size="lg" variant="outline" className="h-14 px-8">
                <Video className="mr-2 h-5 w-5" />
                Watch Videos
              </Button>
              <Link to="/register">
                <Button size="lg" className="h-14 px-8">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">50,000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-blue-600 mb-4" />
              <div className="text-3xl font-bold text-gray-900">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Results */}
      {showCourses && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {searchTerm ? `Results for "${searchTerm}"` : 'All Courses'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No courses found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
