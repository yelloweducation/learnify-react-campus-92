
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  category: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 left-2" variant="secondary">
            {course.category}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
          <p className="text-sm text-gray-500 mb-3">by {course.instructor}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">{course.students.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <div className="w-full flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">${course.price}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
