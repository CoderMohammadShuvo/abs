'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  position: string;
  affiliation: string;
  researchInterest?: string;
  publications?: string;
  citations?: string;
  img?: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="border rounded-lg bg-white shadow-sm p-4 flex gap-4">
      <div className="w-1/2 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
        {member.img ? (
          <Image src={member.img} alt={member.name} width={96} height={96} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.position}</p>
        <p className="text-sm text-gray-600">{member.affiliation}</p>
        {member.researchInterest && (
          <p className="text-sm text-gray-500">
            <span className="font-medium">Research Interest:</span> {member.researchInterest}
          </p>
        )}

        <div className="flex gap-4 text-sm mt-1">
          {member.publications && (
            <span className="text-gray-700">
              <span className="font-bold">{member.publications}</span> Publications
            </span>
          )}
          {member.citations && (
            <span className="text-gray-700">
              <span className="font-bold">{member.citations}</span> Citations
            </span>
          )}
        </div>

        <button className="mt-2 px-3 py-1 rounded-md border text-sm hover:bg-gray-50 transition">
          View Profile →
        </button>
      </div>
    </div>
  );
};

export default function OurTeam() {
  const [filters, setFilters] = useState({ authors: '', keywords: '', category: '', goals: '' });

  // Dummy Data (replace with real API/database)
  const advisors: TeamMember[] = [
    {
      name: 'Prof. Dr. Mohammad Ekramol Islam',
      position: 'Advisor',
      affiliation: 'PhD, South University of Science and Technology, India',
      researchInterest: 'Stock Investment, Inventory Models, Operations Research',
      publications: '200+',
      citations: '450+',
      img: '/team/team1.png',
    },
    {
      name: 'Prof. Dr. Zheng Guangwen',
      position: 'Advisor',
      affiliation: 'PhD, Xian Jiaotong University, China',
      researchInterest: 'Green Finance, Sustainable Banking, Fintech',
      publications: '200+',
      citations: '430+',
      img: '/team/team6.png',
    },
  ];

  const coordinators: TeamMember[] = [
    {
      name: 'Huawei Tian',
      position: 'Research Coordinator',
      affiliation: 'PhD, SEGI University, Malaysia',
      researchInterest: 'Business Administration, Consumer Economics, Marketing',
      publications: '200+',
      citations: '150+',
      img: '/team3.png',
    },
  ];

  const instructors: TeamMember[] = [
    {
      name: 'Dr. Lahcene Makhouf',
      position: 'Research Instructor',
      affiliation: 'PhD, SEGI University, Malaysia',
      researchInterest: 'Business Administration, Consumer Economics, Marketing',
      publications: '200+',
      citations: '150+',
      img: '',
    },
  ];

  const fellows: TeamMember[] = [
    {
      name: 'Myne Uddin',
      position: 'Research Fellow',
      affiliation: 'Masters in World Economics, Beijing Normal University',
      researchInterest: 'Energy & Environmental Economics, AI, Fintech',
      publications: '140+',
      citations: '20+',
      img: '/team6.png',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border rounded-md p-2 text-sm"
            onChange={(e) => setFilters({ ...filters, authors: e.target.value })}
          >
            <option>Authors</option>
            <option>Advisor</option>
            <option>Research Coordinator</option>
          </select>

          <select className="border rounded-md p-2 text-sm">
            <option>Keywords</option>
          </select>

          <select className="border rounded-md p-2 text-sm">
            <option>Journal Category</option>
          </select>

          <select className="border rounded-md p-2 text-sm">
            <option>Sustainable Development Goals</option>
          </select>
        </div>
      </div>

      {/* Advisors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Advisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((m, idx) => (
            <TeamCard key={idx} member={m} />
          ))}
        </div>
      </section>

      {/* Coordinators Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Research Coordinators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coordinators.map((m, idx) => (
            <TeamCard key={idx} member={m} />
          ))}
        </div>
      </section>

      {/* Instructors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Research Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructors.map((m, idx) => (
            <TeamCard key={idx} member={m} />
          ))}
        </div>
      </section>

      {/* Fellows Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Research Fellows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fellows.map((m, idx) => (
            <TeamCard key={idx} member={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
