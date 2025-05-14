// src/pages/JobListings.jsx
import React from 'react';
import { BookmarkIcon } from '@heroicons/react/outline';

// import your screenshots here
import job1 from '../assets/job1.png';
import job2 from '../assets/job2.png'
import job3 from '../assets/job3.png';

const jobs = [
  {
    id: 1,
    img: job1,
    company: 'Global Radio Outreach',
    category: 'Religious Work',
    title: 'Software Development Intern',
    type: 'Part-time job',
    location: 'Remote',
    posted: '2 months ago',
  },
  {
    id: 2,
    img: job2,
    company: 'Inspira, Inc.',
    category: 'Internet & Software',
    title: 'AI/ML Engineer',
    type: '$20/hr · Part-time job',
    location: 'United States (Remote)',
    posted: '7 months ago',
  },
  {
    id: 3,
    img: job3,
    company: "Clementine's Cleaning",
    category: 'Other Industries',
    title: 'AI Development Intern',
    type: 'Part-time job',
    location: 'Remote',
    posted: '5 months ago',
  },
  // …etc
];

export default function JobListings() {
  return (
    <div className="pt-20 bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Postings</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <div
            key={job.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={job.img}
              alt={job.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold">{job.company}</h2>
                  <p className="text-sm text-gray-500">{job.category}</p>
                </div>
              </div>
              <h3 className="text-xl font-medium">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.type}</p>
              <p className="text-sm text-gray-500">
                {job.location} · {job.posted}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
