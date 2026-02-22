'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  GraduationCap,
  Library,
  Users,
  BookMarked,
  Settings,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

const allMenuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    adminOnly: false,
  },
  {
    title: 'Danh mục',
    href: '/admin/categories',
    icon: FolderTree,
    adminOnly: true,
  },
  {
    title: 'Khóa học',
    href: '/admin/courses',
    icon: BookOpen,
    adminOnly: true,
  },
  {
    title: 'Bài học',
    href: '/admin/lessons',
    icon: GraduationCap,
    adminOnly: true,
  },
  {
    title: 'Thư viện',
    href: '/admin/library',
    icon: Library,
    adminOnly: true,
  },
  {
    title: 'Nhân vật',
    href: '/admin/characters',
    icon: Users,
    adminOnly: true,
  },
  {
    title: 'Câu chuyện',
    href: '/admin/stories',
    icon: BookMarked,
    adminOnly: true,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const menuItems = allMenuItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${
          collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={() => setCollapsed(true)}
      />

      {/* Mobile menu button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            {!collapsed && (
              <span className="font-bold text-gray-900">Tepup Admin</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 text-gray-500 transition-transform ${
                collapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={collapsed ? item.title : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Settings at bottom - all users */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              pathname === '/admin/settings'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title={collapsed ? 'Cài đặt' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Cài đặt</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
