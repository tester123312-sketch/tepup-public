'use client';

import Link from 'next/link';
import { Home, BookOpen, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Tepup</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Trang chủ</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-900 font-medium border-b-2 border-gray-900"
            >
              <BookOpen className="w-5 h-5" />
              <span>Khóa học</span>
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
