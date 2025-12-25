import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from '../../components/HeroBackground';
import { Footer } from '../../components/Footer';

export const TermsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <HeroBackground />

            <div className="relative z-20 pt-32 px-4 sm:px-6 md:px-12 lg:px-20 max-w-5xl mx-auto pb-32">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 tracking-tighter"
                    >
                        T<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">&</span>C
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        <p><strong>Effective Date:</strong> 18/04/2025</p>
                        <p><strong>Last Updated:</strong> 18/04/2025</p>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-12"
                >
                    <section>
                        <p>
                            Welcome to <strong>Becon</strong>, an entrepreneurial summit organized by <strong>Entrepreneurship Development Cell (EDC), IIT Delhi</strong>. Becon is designed to bring together innovators, founders, investors, students, and industry leaders through talks, workshops, exhibitions, and networking sessions.
                        </p>
                        <p>
                            These Terms & Conditions ("Terms") govern your access to and participation in the Becon website, registration platform, events, and related services ("Services"). By accessing, registering for, or attending Becon, you agree to be bound by these Terms. If you do not agree, please do not use the Services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing the Becon platform or participating in any Becon-related event, you confirm that you have read, understood, and agreed to these Terms, along with our Privacy Policy and any additional guidelines communicated by EDC IIT Delhi.
                        </p>
                        <p>
                            These Terms apply to all users, including visitors, registered attendees, speakers, sponsors, partners, exhibitors, volunteers, and organizers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">2. Changes to Terms</h2>
                        <p>
                            EDC IIT Delhi reserves the right to modify or update these Terms at any time. Changes will become effective immediately upon posting on the official Becon platform. Continued use of the Services after such changes constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">3. Eligibility and Registration</h2>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.1 Eligibility</h3>
                        <p>Participation in Becon is open to individuals who are at least 18 years of age or have obtained consent from a parent or legal guardian.</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.2 Registration Information</h3>
                        <p>Users must provide accurate, complete, and up-to-date information during registration. Any false or misleading information may result in cancellation of registration without refund.</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.3 Account Responsibility</h3>
                        <p>You are responsible for maintaining the confidentiality of your registration details and for all activities conducted under your registration.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">4. Event Participation</h2>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.1 Event Details</h3>
                        <p>Schedules, speakers, sessions, and formats are subject to change due to unforeseen circumstances. Becon does not guarantee the accuracy or completeness of all published event information.</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.2 Tickets and Access</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>All registrations and tickets are non-transferable unless explicitly stated.</li>
                            <li>Entry may require valid identification and confirmation of registration.</li>
                            <li>EDC IIT Delhi reserves the right to deny entry if eligibility requirements are not met.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.3 Refunds and Cancellations</h3>
                        <p>Refund and cancellation policies, if applicable, will be communicated clearly during registration. Becon is not responsible for refunds due to changes in schedule, speakers, or event format unless stated otherwise.</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.4 Right to Refuse Admission</h3>
                        <p>Organizers reserve the right to refuse entry or remove any participant whose conduct is deemed disruptive, safe, or in violation of these Terms or institutional guidelines of IIT Delhi.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">5. Code of Conduct</h2>
                        <p>All participants are expected to maintain a respectful, inclusive, and professional environment. Prohibited behavior includes, but is not limited to::</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Harassment, discrimination, or abusive conduct</li>
                            <li>Disruption of sessions or activities</li>
                            <li>Misrepresentation or impersonation</li>
                            <li>Unauthorized promotions or solicitation</li>
                            <li>Violation of IIT Delhi campus rules</li>
                        </ul>
                        <p className="mt-4">Violation of the Code of Conduct may result in immediate removal from the event without refund.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">6. Intellectual Property</h2>
                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">6.1 Ownership</h3>
                        <p>All content associated with Becon—including logos, branding, website content, designs, and event material—is the intellectual property of EDC IIT Delhi or its partners and may not be used without prior written permission.</p>

                        <h3 className="text-xl font-semibold text-white mt-6 mb-3">6.2 Media & Content Usage</h3>
                        <p>By attending Becon, you consent to being photographed, recorded, or filmed. Such media may be used by EDC IIT Delhi for promotional, educational, or archival purposes without compensation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">7. Privacy and Data Usage</h2>
                        <p>Personal information collected during registration will be handled in accordance with our Privacy Policy. Data may be used for event communication, analytics, security, and future EDC IIT Delhi initiatives. You may opt out of promotional communications at any time.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">8. Third-Party Associations</h2>
                        <p>Becon may involve third-party speakers, sponsors, exhibitors, or service providers. EDC IIT Delhi is not responsible for the actions, content, or services provided by any third party.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">9. Disclaimers</h2>
                        <p>Becon and its Services are provided on an "as is" basis. EDC IIT Delhi makes no warranties regarding uninterrupted access, error-free services, or specific outcomes from event participation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, EDC IIT Delhi shall not be liable for any indirect, incidental, or consequential damages arising from participation in Becon, including loss of personal belongings, data, or opportunities.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">11. Indemnification</h2>
                        <p>You agree to indemnify and hold harmless EDC IIT Delhi, its members, volunteers, and partners from any claims or liabilities arising from your participation, misconduct, or violation of these Terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">12. Termination</h2>
                        <p>EDC IIT Delhi reserves the right to suspend or terminate participation at any stage for violation of these Terms, institutional policies, or applicable laws.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">13. Governing Law and Jurisdiction</h2>
                        <p>These Terms shall be governed by and interpreted in accordance with the laws of <strong>India</strong>. Any disputes shall fall under the exclusive jurisdiction of the courts of <strong>New Delhi, India</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">14. Entire Agreement</h2>
                        <p>These Terms, together with the Privacy Policy and official Becon communications, constitute the entire agreement between participants and EDC IIT Delhi.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">15. Contact Information</h2>
                        <p>For any questions or concerns regarding these Terms, please contact the Becon organizing team through the official EDC IIT Delhi communication channels.</p>
                    </section>

                </motion.div>
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
