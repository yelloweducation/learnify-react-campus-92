
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

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

const Courses = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const filteredCourses = MOCK_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
  );
};

export default Courses;
