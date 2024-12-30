import React from 'react';

function About() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About <span className="text-violet-600 dark:text-violet-400">SportFest 2024</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Uniting athletes, fostering sportsmanship, and creating unforgettable moments. Welcome to the most anticipated sports festival of the year!
          </p>
        </div>

        {/* Introduction */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <img 
              src="https://media.istockphoto.com/id/155228825/photo/crowd-of-thousands.jpg?s=612x612&w=0&k=20&c=17uvR9BNlPOmRq7fbqqHbMB070OllpJ9AAVQIhIK7Oo=" 
              alt="SportFest Overview" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-3">What is SportFest?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              SportFest is an annual multi-sport event that brings together athletes, teams, and sports enthusiasts from all walks of life. With thrilling competitions, community-building activities, and inspiring moments, SportFest celebrates the spirit of sportsmanship and excellence.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To provide a platform for athletes to showcase their skills, foster teamwork, and inspire the next generation of sports leaders.
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To become the leading sports festival, promoting inclusivity, diversity, and global collaboration in sports.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-3">Join Us!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Be part of the action, excitement, and community spirit of SportFest 2024. Whether you're an athlete, volunteer, or spectator, there's a place for you!
          </p>
          <a 
            // href="/register" 
            className="bg-violet-600 dark:bg-violet-600 text-white dark:text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-violet-600 dark:hover:bg-violet-800 transition-all hover:cursor-pointer"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
