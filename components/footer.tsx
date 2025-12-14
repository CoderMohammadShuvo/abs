import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-12 text-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src="/logo.png" alt="ABS Research Academy" className="h-20" />
          <p className="text-sm leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/training-courses" className="hover:text-gray-900 transition-colors">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/journals" className="hover:text-gray-900 transition-colors">
                Journals
              </Link>
            </li>
            <li>
              <Link href="/scholarship" className="hover:text-gray-900 transition-colors">
                Scholarships
              </Link>
            </li>
            <li>
              <Link href="/conferences" className="hover:text-gray-900 transition-colors">
                Conferences & Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-900 transition-colors">
                News & Announcements
              </Link>
            </li>
            <li>
              <Link href="/certificate" className="hover:text-gray-900 transition-colors">
                Get a Certificate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-gray-900 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-gray-900 transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-lg">Connect With Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                Twitter/X
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                YouTube
              </a>
            </li>
            <li>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                Whatsapp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2025 ABS Research Academy. All rights reserved.
      </div>
    </footer>
  );
}