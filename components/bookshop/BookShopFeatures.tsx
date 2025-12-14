'use client'

import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react'

const FEATURES = [
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'Free shipping on orders over $50 to anywhere in the world',
    },
    {
        icon: Shield,
        title: 'Secure Payment',
        description: '100% secure payment with SSL encryption and fraud protection',
    },
    {
        icon: RefreshCw,
        title: 'Easy Returns',
        description: '30-day hassle-free return policy for all purchases',
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Dedicated customer support team available around the clock',
    },
]

export default function BookShopFeatures() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                        Why Shop With Us?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide the best shopping experience with premium services and customer satisfaction
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8 text-[#393F50]" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-[#393F50] mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Additional Info Banner */}
                <div className="mt-12 bg-gradient-to-r from-[#393F50] to-[#2d3240] rounded-lg p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">
                        Join Our Book Lovers Community
                    </h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter and get exclusive discounts, early access to new releases,
                        and curated reading recommendations delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="px-6 py-3 bg-white text-[#393F50] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
