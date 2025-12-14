import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function FAQsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-8">
                        Faqs
                    </h1>

                    <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
                        {/* Introduction */}
                        <p className="text-gray-700">
                            Welcome to [Your Journal Website Name]. By accessing and using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
                        </p>

                        {/* Section 1 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">1. Acceptance of Terms</h2>
                            <p className="text-gray-700">
                                By accessing or using this website, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the site.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">2. Use of the Website</h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>You may use our website for lawful purposes only.</li>
                                <li>You agree not to use the site in a way that may harm, disable, or impair the functionality of the website.</li>
                                <li>You are responsible for any content (comments, posts, or submissions) you publish on the site.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">3. Intellectual Property Rights</h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>All articles, graphics, logos, and other content on this site are the property of [Your Journal Website Name] unless otherwise stated.</li>
                                <li>You may not copy, reproduce, or distribute our content without prior written permission.</li>
                                <li>You may share links to our articles on social media with proper credit.</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">4. User-Generated Content</h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>When posting comments, reviews, or other content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display that content.</li>
                                <li>You must not post content that is offensive, unlawful, defamatory, or violates the rights of others.</li>
                                <li>We reserve the right to remove any user-generated content at our discretion.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">5. Disclaimer of Liability</h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>The content provided on our website is for informational and educational purposes only.</li>
                                <li>We do not guarantee the accuracy, completeness, or reliability of the information.</li>
                                <li>We are not responsible for any losses or damages arising from the use of our site.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">6. Third-Party Links</h2>
                            <p className="text-gray-700">
                                Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of these external sites.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">7. Privacy Policy</h2>
                            <p className="text-gray-700">
                                Your use of the website is also governed by our Privacy Policy, which outlines how we collect and use your personal data.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">8. Termination of Use</h2>
                            <p className="text-gray-700">
                                We reserve the right to suspend or terminate access to our website at any time, without notice, if you violate these Terms.
                            </p>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">9. Changes to Terms</h2>
                            <p className="text-gray-700">
                                We may update or modify these Terms and Conditions at any time. Updates will be posted on this page with a revised "Last Updated" date. Continued use of the website means you accept the new terms.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">10. Governing Law</h2>
                            <p className="text-gray-700">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country].
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">11. Contact Information</h2>
                            <p className="text-gray-700 mb-2">For questions regarding these Terms and Conditions, please contact us:</p>
                            <p className="text-gray-700">Email: [your email address]</p>
                            <p className="text-gray-700">Address: [your business address]</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
