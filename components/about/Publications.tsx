'use client';

import { useState, useMemo } from 'react';

interface Publication {
  title: string;
  journalName: string;
  authors: string;
  date: string;
  keywords: string;
  cite: string;
  description?: string;
}

const PublicationCard = ({ item }: { item: Publication }) => {
  return (
    <div className="border-b pb-6 mb-8">
      <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Journal Name:</strong> {item.journalName}
        </p>
        <p>
          <strong>Authors:</strong> {item.authors}
        </p>
        <p>
          <strong>Publication Date:</strong> {item.date}
        </p>
        <p>
          <strong>Keywords:</strong> {item.keywords}
        </p>

        <p className="text-gray-600">
          <strong>Cite as:</strong> {item.cite}
        </p>
      </div>

      <button className="mt-3 px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50 transition">
        Read full article →
      </button>
    </div>
  );
};

export default function PublicationPage() {
  // Dummy data (replace with API later)
  const publications: Publication[] = [
    {
      title:
        'Technological innovation and agricultural performance in the ASEAN region: The role of digitalization',
      journalName: 'Food Policy (Scopus Q1, SSCI-Q1, IF: 6.0, ABDC: B)',
      authors: 'Ode Htwee Thann, Zhao Yuhan, Myne Uddin, and Sumin Zuo',
      date: 'August 14, 2025',
      keywords: 'Technological innovation, Agricultural performance, ASEAN',
      cite:
        'Thann, O. H., Yuhan, Z., Uddin, M., & Zuo, S. (2025). Technological innovation and agricultural performance in the ASEAN region. Food Policy, 135, 102939.',
    },
    {
      title:
        'Evaluating the influence of Chinese investment, FDI and digitalization on renewable energy dynamics in Africa',
      journalName: 'Renewable Energy (Scopus Q1, SCI-Q1, IF: 9.1)',
      authors: 'Myne Uddin and Muhammad Shahbaz',
      date: 'July 26, 2025',
      keywords:
        'Chinese investment, Foreign investment, Digitalization, Machine learning',
      cite:
        'Uddin, M., & Shahbaz, M. (2025). Evaluating the Influence of Chinese investment and Digitalization on Renewable Energy Dynamics in Africa. Renewable Energy, 124051.',
    },
    {
      title:
        'Exploring AI-Driven Digital Banking Platforms: Implications for Business Innovation',
      journalName:
        'IEEE Transactions on Engineering Management (Scopus Q1, IF: 4.1)',
      authors: 'Myne Uddin, S. Chowdhury',
      date: 'June 20, 2025',
      keywords: 'AI Banking, Fintech, Digital Banking',
      cite:
        'Uddin, M., & Chowdhury, S. (2025). Exploring AI-driven digital banking platforms. IEEE TEM.',
    },
    {
      title:
        'Harnessing FinTech for green growth: financial innovations and energy efficiency in OECD nations',
      journalName: 'Energy Economics (Scopus Q1, IF: 10.5)',
      authors: 'Myne Uddin, T. Rahman',
      date: 'May 1, 2025',
      keywords: 'FinTech, Green growth, Energy efficiency',
      cite:
        'Uddin, M., & Rahman, T. (2025). Harnessing FinTech for green growth. Energy Economics.',
    },
  ];

  // Pagination Logic
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(publications.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return publications.slice(start, end);
  }, [currentPage]);

  const gotoPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="p-6 bg-gray-100 rounded-xl w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Our Team Publications</h2>
          <p className="text-sm text-gray-600">ABS Research Academy</p>
        </div>

        <div className="flex-1 text-gray-700 text-sm leading-6">
          We foster scientific excellence and promote sustainable education by
          equipping scholars with knowledge and skills to tackle real-world
          challenges. Partnering with top institutions, our publications drive
          meaningful innovation and impact.
          <br />
          <strong>Explore our recent research below.</strong>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6 flex items-center w-full">
        <input
          className="w-full border p-2 rounded-l-md text-sm"
          placeholder="Easy search by title, author, keyword"
        />
        <button className="px-4 py-2 border bg-gray-100 rounded-r-md">
          🔍
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-10">
        <select className="border p-2 rounded-md text-sm">
          <option>Sort By</option>
        </select>

        <select className="border p-2 rounded-md text-sm">
          <option>Authors</option>
        </select>

        <select className="border p-2 rounded-md text-sm">
          <option>Year of Publication</option>
        </select>

        <select className="border p-2 rounded-md text-sm">
          <option>Keywords</option>
        </select>

        <select className="border p-2 rounded-md text-sm">
          <option>Journal Category</option>
        </select>

        <select className="border p-2 rounded-md text-sm">
          <option>Sustainable Development Goals</option>
        </select>
      </div>

      {/* PUBLICATION LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {paginatedItems.map((item, index) => (
          <PublicationCard key={index} item={item} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-40"
          onClick={() => gotoPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            onClick={() => gotoPage(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === pageCount}
          className="px-3 py-1 border rounded-md disabled:opacity-40"
          onClick={() => gotoPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
