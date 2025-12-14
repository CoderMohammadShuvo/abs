'use client'

import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, ChevronDown } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { toggleSearchModal } from '@/lib/slices/searchSlice'
import SearchModal from './search-modal'
import CartDrawer from './cart/CartDrawer'
import Link from 'next/link'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/departments" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Training Courses", href: "/services/training-courses" },
      { label: "Consultancy Service", href: "/services/consultancy" },
      { label: "English Editing and Formatting Services", href: "/services/english-editing" },
      { label: "Data Collection and Analysis", href: "/services/data-collection" },
    ],
  },
  { label: "Scholarships", href: "/scholarship" },
  // Disabled as per requirements
  // { label: "Journals", href: "/journals" },
  // { label: "Conferences", href: "/conferences" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "News", href: "/news" },
  // { label: "Projects", href: "/projects" },
];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const isSearchOpen = useAppSelector(state => state.search.isOpen)

  const handleSearchClick = () => {
    dispatch(toggleSearchModal())
  }

  const handleCartClick = () => {
    setCartDrawerOpen(true)
  }

  return (
    <>
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        {/* Top Bar - Hidden on mobile */}
        <div className="border-b border-gray-200 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-end items-center h-10">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <Link href="/book-shop" className="hover:text-gray-900 transition-colors">
                  Book Shop
                </Link>
                <Link href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
                <Link href="/auth" className="hover:text-gray-900 transition-colors">
                  Sign up/Log in
                </Link>
                <Link href="/join-us" className="hover:text-gray-900 transition-colors">
                  Join us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="ABS Research Academy" width={120} height={80} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCartClick}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={handleSearchClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-1 border-t border-gray-200 pt-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && <SearchModal />}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  )
}
