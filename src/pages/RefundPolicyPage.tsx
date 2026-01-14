
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { Footer } from '../../components/Footer';

export const RefundPolicyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans">
            <PageHeader title="REFUND POLICY" subtitle="BECon Summit" />

            <div className="relative z-20 py-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
                <div className="space-y-12 text-gray-300 leading-relaxed">
                    <p className="text-lg">At BECon, we aim to ensure a smooth and valuable experience for all participants. Please read our refund policy carefully before making any purchase or registration.</p>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Event Registration Fees</h2>
                        <p>
                            All registration fees for BECon (including passes, workshops, masterclasses, or special access tickets) are <strong className="text-white">non-refundable</strong> once the registration is confirmed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Transfer of Tickets</h2>
                        <p>
                            If you are unable to attend the event, your ticket may be transferred to another individual by informing the organizing team at least <strong className="text-white">72 hours prior</strong> to the event date, subject to approval.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Event Changes or Cancellation</h2>
                        <p>
                            In the unlikely event that BECon is postponed or cancelled by the organizers, registered participants will be informed promptly.
                        </p>
                        <p className="mt-2">
                            Refunds or alternative options (such as access to rescheduled dates or virtual sessions) will be communicated on a case-by-case basis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. No-Show Policy</h2>
                        <p>
                            Failure to attend the event after successful registration will be treated as a no-show, and no refund or compensation will be provided.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Contact</h2>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <p>For any questions regarding this refund policy or ticket-related concerns, please contact us at:</p>
                            <a href="mailto:team@edciitd.com" className="text-purple-400 hover:text-purple-300 font-semibold text-lg transition-colors mt-2 inline-block">team@edciitd.com</a>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </div>
    );
};
