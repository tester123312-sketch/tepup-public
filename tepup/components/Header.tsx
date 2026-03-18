'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Library, Menu } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/courses', label: 'Khóa học', icon: BookOpen },
    { href: '/library', label: 'Thư viện', icon: Library },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Tepup-Color-Logo-0.png" alt="Tepup logo" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold text-gray-900">Tepup</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-gray-900 font-medium border-b-2 border-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden" aria-label="Mở menu điều hướng">
              <Menu className="w-6 h-6 text-gray-600" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
