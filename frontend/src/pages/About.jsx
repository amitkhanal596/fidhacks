// src/pages/About.jsx
import React from 'react';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header />

      <main className="pt-20 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-2">About</h1>
        <h2 className="text-xl text-gray-500 mb-6">Herizon’s Mission</h2>

        <div className="bg-white p-8 rounded-lg shadow mb-12">
          <p className="text-gray-700 mb-4">
            When applying to jobs, there may be times when an applicant may not have all the qualifications that a company asks for. Most of the time, men will still submit an application, while women hesitate. According to Harvard Business Review, men tend to apply for jobs when they meet 60% of the qualifications, while women only apply if they meet 100% of the qualifications. Inspired to encourage women, Herizon was developed for women to explore and apply to jobs in their area, regardless of every qualification some jobs may ask for.
          </p>
          <p className="text-gray-700">
            Herizon is a career-launching platform designed to empower young women to apply for jobs, even when they don’t meet every qualification. Too often, self-doubt holds women back from opportunities they’re more than capable of seizing. Herizon changes that. Through a supportive peer forum, smart resume-matching to local job listings, and a motivational reward system that grows with every application sent, Herizon helps women push past hesitation and step confidently into their futures.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-200 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between">
          {/* Brand/Logo */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold">Herizon</h3>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 gap-x-16">
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Amit Khanal</span><br/>
                <a href="mailto:akhanal2@unc.edu" className="text-gray-400 hover:text-gray-200">
                  akhanal2@unc.edu
                </a>
              </li>
              <li>
                <span className="font-medium">Sophia Sang</span><br/>
                <a href="mailto:ss1482@duke.edu" className="text-gray-400 hover:text-gray-200">
                  ss1482@duke.edu
                </a>
              </li>
              <li>
                <span className="font-medium">Melina Seng</span><br/>
                <a href="mailto:mseng2@ncsu.edu" className="text-gray-400 hover:text-gray-200">
                  mseng2@ncsu.edu
                </a>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Aryan Vinay</span><br/>
                <a href="mailto:aryanvin@unc.edu" className="text-gray-400 hover:text-gray-200">
                  aryanvin@unc.edu
                </a>
              </li>
              <li>
                <span className="font-medium">Fatima Khan</span><br/>
                <a href="mailto:neander4@ncsu.edu" className="text-gray-400 hover:text-gray-200">
                  neander4@ncsu.edu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
