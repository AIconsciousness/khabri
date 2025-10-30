'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 border-b border-gray-200 gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600">
            <span className="whitespace-nowrap">📍 New Delhi, India</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-center sm:text-left">{currentDate || 'Loading...'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition px-3 py-1 rounded hover:bg-gray-100">
              Login
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition font-medium">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-xl sm:text-2xl">
              K
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Khabri</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Your Trusted News Source</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            <Link href="/" className="text-gray-900 font-semibold hover:text-blue-600 transition border-b-2 border-blue-600 pb-1 px-3 whitespace-nowrap">
              Home
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/politics" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Politics
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/business" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Business
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/technology" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Technology
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/sports" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Sports
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/entertainment" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Entertainment
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/world" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              World
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/category/health" className="text-gray-700 hover:text-blue-600 transition px-3 whitespace-nowrap">
              Health
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 py-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-900 font-semibold hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/category/politics" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Politics
              </Link>
              <Link href="/category/business" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Business
              </Link>
              <Link href="/category/technology" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Technology
              </Link>
              <Link href="/category/sports" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Sports
              </Link>
              <Link href="/category/entertainment" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Entertainment
              </Link>
              <Link href="/category/world" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                World
              </Link>
              <Link href="/category/health" className="text-gray-700 hover:text-blue-600 transition py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Health
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
