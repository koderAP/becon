
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Footer } from '../../components/Footer';

export const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans">
            <PageHeader title="PRIVACY POLICY" subtitle="Last Revised: March 4, 2024" />

            <div className="relative z-20 py-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
                <div className="space-y-12 text-gray-300 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. General</h2>
                        <p>
                            BECon (“we”, “our”, “us”) is an entrepreneurship summit organised by the Entrepreneurship Development Cell, IIT Delhi. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share information when you access or use our website, registration portals, mobile applications, and related services (collectively, the “Service”).
                        </p>
                        <p className="mt-4">
                            By using the Service, you agree to the collection and use of your information in accordance with this Privacy Policy. Certain BECon activities, competitions, or services may be subject to additional terms, which will be communicated separately. BECon is an evolving event, and features or services may vary across editions or locations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">2.1 Event Registration Information</h3>
                                <p>When you register for BECon, we may collect:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Full name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Age or academic/professional status</li>
                                    <li>College, institution, or organisation name</li>
                                    <li>City and country</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">2.2 Profile and User-Submitted Content</h3>
                                <p>If you create a profile or submit content, we may collect:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Profile details such as name, designation, bio, and photograph</li>
                                    <li>Startup or project information</li>
                                    <li>Pitch decks, applications, feedback, or competition submissions</li>
                                    <li>Any other information you voluntarily provide</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">2.3 Event Participation and Activity Data</h3>
                                <p>When you interact with the Service, we may collect:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Event sessions attended and pages visited</li>
                                    <li>Engagement with workshops, competitions, or networking features</li>
                                    <li>Device information, browser type, and IP address</li>
                                    <li>Log and usage data for analytics and security purposes</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">2.4 Cookies</h3>
                                <p>We use cookies and similar technologies to:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Maintain login sessions</li>
                                    <li>Improve website performance and user experience</li>
                                    <li>Understand visitor behaviour and engagement</li>
                                </ul>
                                <p className="mt-2 text-sm italic">You may control cookies through your browser settings. Disabling cookies may limit certain features of the Service.</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">2.5 Google Analytics</h3>
                                <p>We use Google Analytics to analyse website traffic and user interactions. Google Analytics uses cookies to collect aggregated information such as page visits and traffic patterns. This data does not identify individual users. You may opt out by using Google’s browser add-on.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We process personal information based on consent, legitimate interests, contractual necessity, or legal obligations. Your information may be used to:</p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">3.1 Operate and Improve BECon</h3>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Manage registrations, passes, and event access</li>
                                    <li>Coordinate competitions, workshops, and sessions</li>
                                    <li>Improve event experience, platforms, and services</li>
                                    <li>Conduct internal research and analysis</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">3.2 Communication</h3>
                                <p>We may use your contact details to send:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Registration confirmations and essential event updates</li>
                                    <li>Schedule changes and announcements</li>
                                    <li>Reminders, learning resources, and speaker updates</li>
                                    <li>Information about future BECon editions or EDC IIT Delhi initiatives</li>
                                </ul>
                                <p className="mt-2 text-sm italic">You may opt out of non-essential communications at any time.</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">3.3 Legal Compliance and Safety</h3>
                                <p>We may process or disclose personal information to:</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Comply with applicable laws or lawful requests</li>
                                    <li>Protect the rights, safety, and property of BECon, participants, or partners</li>
                                    <li>Prevent fraud, misuse, or security incidents</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">3.4 Sponsorships and Partnerships</h3>
                                <p>We may share limited and relevant participant information, including aggregated or anonymised data, with sponsors or partners for reporting and collaboration purposes. We do not sell personal data.</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-400 mb-2">3.5 Anonymous and Aggregated Data</h3>
                                <p>We may process anonymised or aggregated data for research, reporting, and event improvement. Such data does not identify individuals.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
                        <p>Subject to applicable law, you have the right to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate or incomplete information</li>
                            <li>Request deletion of your personal data</li>
                            <li>Withdraw consent where processing is based on consent</li>
                            <li>Object to certain processing activities</li>
                            <li>Request portability of your data in a usable format</li>
                            <li>Not be discriminated against for exercising your rights</li>
                        </ul>
                        <p className="mt-4 text-sm italic">These rights may be limited where fulfilling them interferes with legal obligations or essential event operations.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                        <p>We retain personal information only for as long as necessary to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Conduct BECon and related activities</li>
                            <li>Comply with legal, regulatory, or institutional requirements</li>
                            <li>Resolve disputes or enforce policies</li>
                        </ul>
                        <p className="mt-2">Anonymised data may be retained indefinitely.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Do Not Track</h2>
                        <p>The Service does not currently respond to “Do Not Track” signals sent by web browsers.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Links</h2>
                        <p>The Service may contain links to third-party websites, including sponsors, partners, or payment service providers. We are not responsible for the privacy practices or content of such third-party websites. This Privacy Policy applies only to information collected by BECon.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Privacy Policy Updates</h2>
                        <p>We may update this Privacy Policy from time to time. Any material changes will be reflected by updating the “Last Revised” date at the top of this document.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <p className="font-semibold text-lg text-white">Entrepreneurship Development Cell, IIT Delhi</p>
                            <p className="text-purple-400 mb-4">Organisers of BECon</p>
                            <p>For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us through the official BECon website or communication channels.</p>
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
};
