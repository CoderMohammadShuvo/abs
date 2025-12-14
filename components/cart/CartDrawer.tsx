'use client'

import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { removeFromCart, updateQuantity } from '@/lib/slices/cartSlice'
import Link from 'next/link'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }))
        }
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id))
    }

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <Link href="/book-shop">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-[#393F50] text-white rounded-lg hover:bg-[#2d3240] transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                                >
                                    {/* Item Image */}
                                    <div className="w-20 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-3xl">📚</span>
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-900 mb-3">
                                            ${item.price.toFixed(2)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-3 py-1 text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-6 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-medium text-gray-700">Subtotal:</span>
                            <span className="font-bold text-gray-900">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <Link href="/cart">
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-[#393F50] text-white rounded-lg font-medium hover:bg-[#2d3240] transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </Link>

                        <Link href="/book-shop">
                            <button
                                onClick={onClose}
                                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
