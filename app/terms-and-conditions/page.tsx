import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function TermsAndConditionsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-8">
                        Terms & Condition
                    </h1>

                    <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed">
                        {/* Introduction */}
                        <p className="text-gray-700">
                            At [Your Journal Website Name] ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you share when you use our website, read articles, or interact with our services. By accessing or using our site, you agree to the practices described in this Privacy Policy.
                        </p>

                        {/* Section 1 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">1. Information We Collect</h2>
                            <p className="text-gray-700 mb-3">When you use our journal website, we may collect the following types of information:</p>

                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">1.1 Personal Information</h3>
                                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                        <li>Name, email address, or contact details (when you subscribe to our newsletter, submit a comment, or register for an account).</li>
                                        <li>Login credentials if you create an account.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">1.2 Non-Personal Information</h3>
                                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                        <li>Browser type, device information, operating system.</li>
                                        <li>IP address and general location data.</li>
                                        <li>Pages visited, time spent on the site, referral sources.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">1.3 Content-Related Information</h3>
                                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                        <li>Comments or feedback you post on articles.</li>
                                        <li>Preferences such as topics of interest, reading behavior, or bookmarked content.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">1.4 Cookies and Tracking Data</h3>
                                    <p className="text-gray-700">We use cookies, pixels, and analytics tools to enhance user experience, remember preferences, and understand visitor behavior.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">2. How We Use Your Information</h2>
                            <p className="text-gray-700 mb-2">We use the collected data for the following purposes:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>To publish and improve journal content and deliver a better reading experience.</li>
                                <li>To send newsletters or updates if you subscribe.</li>
                                <li>To analyze site traffic and user behavior to improve design, content, and navigation.</li>
                                <li>To respond to inquiries or comments submitted by users.</li>
                                <li>To personalize recommendations and suggest relevant content.</li>
                                <li>To protect the security of our website and prevent misuse.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">3. Sharing of Information</h2>
                            <p className="text-gray-700 mb-2">We respect your privacy and do not sell or rent personal information. However, we may share data in the following cases:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>With third-party service providers (e.g., email marketing tools, hosting providers, analytics platforms).</li>
                                <li>If required by law, regulation, or legal process.</li>
                                <li>To protect our rights, property, or safety.</li>
                                <li>In the case of a business transfer (merger, acquisition, or sale).</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">4. Cookies and Analytics</h2>
                            <p className="text-gray-700 mb-2">Our website uses cookies to:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>Store user preferences (language, theme, login sessions).</li>
                                <li>Track visitor interaction for analytics and improvement.</li>
                                <li>Deliver relevant ads through third-party advertising partners.</li>
                            </ul>
                            <p className="text-gray-700 mt-2">You may disable cookies in your browser settings, but certain features of our website may not work properly without them.</p>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">5. Data Security</h2>
                            <p className="text-gray-700 mb-2">We implement reasonable technical and organizational measures to protect your personal information. These include:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>Encryption of data during transfer.</li>
                                <li>Secure hosting environments.</li>
                                <li>Restricted access to personal information.</li>
                            </ul>
                            <p className="text-gray-700 mt-2">However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">6. Your Rights</h2>
                            <p className="text-gray-700 mb-2">As a user of our journal website, you have the right to:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>Access, update, or delete your personal information.</li>
                                <li>Opt-out of marketing emails by clicking the "unsubscribe" link.</li>
                                <li>Request details about the data we hold on you.</li>
                                <li>Withdraw consent for data processing where applicable.</li>
                            </ul>
                            <p className="text-gray-700 mt-2">To exercise these rights, please contact us at [your email address].</p>
                        </div>

                        {/* Section 7 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">7. Third-Party Services</h2>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>Our website may include links to external sites (e.g., sources, references, or advertisements). We are not responsible for the privacy practices of those websites.</li>
                                <li>If you interact with embedded content (like videos, ads, or social media widgets), third parties may collect your data according to their own privacy policies.</li>
                            </ul>
                        </div>

                        {/* Section 8 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">8. Children's Privacy</h2>
                            <p className="text-gray-700">Our journal website is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have unintentionally collected such data, please contact us to remove it.</p>
                        </div>

                        {/* Section 9 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">9. International Data Transfers</h2>
                            <p className="text-gray-700">If you are accessing our website from outside Bangladesh (or your home country), please note that your data may be transferred to and stored in other jurisdictions. By using our website, you consent to such transfers.</p>
                        </div>

                        {/* Section 10 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">10. Retention of Data</h2>
                            <p className="text-gray-700 mb-2">We retain your personal information only as long as necessary to:</p>
                            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                <li>Provide services you requested.</li>
                                <li>Comply with legal obligations.</li>
                                <li>Resolve disputes and enforce agreements.</li>
                            </ul>
                            <p className="text-gray-700 mt-2">Once data is no longer required, we securely delete or anonymize it.</p>
                        </div>

                        {/* Section 11 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">11. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700">We may update this Privacy Policy from time to time to reflect changes in law, technology, or our practices. Any updates will be posted on this page with a new "Last Updated" date. We encourage you to review this page periodically.</p>
                        </div>

                        {/* Section 12 */}
                        <div>
                            <h2 className="text-lg font-bold text-[#393F50] mb-3">12. Contact Us</h2>
                            <p className="text-gray-700 mb-2">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
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
