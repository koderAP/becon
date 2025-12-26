import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    img: string;
    linkedin?: string;
    instagram?: string;
}

// Overall Coordinators
const overallCoordinators: TeamMember[] = [
    { id: 1, name: "Mai", role: "Overall Coordinator", img: "https://picsum.photos/id/64/400/400" },
    { id: 2, name: "Tanmay", role: "Overall Coordinator", img: "https://picsum.photos/id/91/400/400" },
];

// Co-Overall Coordinators
const coOverallCoordinators: TeamMember[] = [
    { id: 1, name: "Siddhesh", role: "Co-Overall Coordinator", img: "https://picsum.photos/id/177/400/400" },
    { id: 2, name: "Kunal", role: "Co-Overall Coordinator", img: "https://picsum.photos/id/338/400/400" },
];

// Core Team Members
const coreTeamMembers: TeamMember[] = [
    { id: 1, name: "Team Member 1", role: "Tech Lead", img: "https://picsum.photos/id/342/400/400" },
    { id: 2, name: "Team Member 2", role: "Design Lead", img: "https://picsum.photos/id/447/400/400" },
    { id: 3, name: "Team Member 3", role: "Events Head", img: "https://picsum.photos/id/531/400/400" },
    { id: 4, name: "Team Member 4", role: "PR Head", img: "https://picsum.photos/id/619/400/400" },
    { id: 5, name: "Team Member 5", role: "Sponsorship Lead", img: "https://picsum.photos/id/433/400/400" },
    { id: 6, name: "Team Member 6", role: "Marketing Lead", img: "https://picsum.photos/id/453/400/400" },
];

// Reusable Team Member Card
const TeamMemberCard: React.FC<{ member: TeamMember; index: number; size?: 'large' | 'medium' | 'small' }> = ({ member, index, size = 'medium' }) => {
    const sizeClasses = {
        large: 'p-8',
        medium: 'p-6',
        small: 'p-4',
    };

    const imageClasses = {
        large: 'aspect-square rounded-2xl',
        medium: 'aspect-square rounded-xl',
        small: 'w-24 h-24 rounded-full mx-auto',
    };

    const nameClasses = {
        large: 'text-2xl',
        medium: 'text-xl',
        small: 'text-lg',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group bg-white/5 border border-white/10 rounded-2xl ${sizeClasses[size]} hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300`}
        >
            <div className={`${imageClasses[size]} overflow-hidden mb-4 bg-white/5`}>
                <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <h3 className={`${nameClasses[size]} font-bold text-white mb-1 ${size === 'small' ? 'text-center' : ''}`}>
                {member.name}
            </h3>
            <p className={`text-purple-400 font-medium mb-4 ${size === 'small' ? 'text-center text-sm' : ''}`}>
                {member.role}
            </p>

            <div className={`flex gap-4 ${size === 'small' ? 'justify-center' : ''}`}>
                {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                        <Linkedin size={size === 'small' ? 16 : 20} />
                    </a>
                )}
                {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                        <Instagram size={size === 'small' ? 16 : 20} />
                    </a>
                )}
                {!member.linkedin && !member.instagram && (
                    <>
                        <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin size={size === 'small' ? 16 : 20} /></a>
                        <a href="#" className="text-gray-400 hover:text-[#E1306C] transition-colors"><Instagram size={size === 'small' ? 16 : 20} /></a>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export const TeamPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="TEAM"
                badge="Meet the Crew"
                description="The passionate individuals behind BECon 2026."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

                {/* Hero Section - Meet Our Hosts */}
                <div className="mb-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-[2px] bg-white"></div>
                                <span className="text-lg text-gray-300 uppercase tracking-widest">Our Host</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Meet Our Hosts: The Visionaries Behind{' '}
                                <span className="text-purple-400">BECon Tech Summit</span>
                            </h1>

                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders.
                                Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds
                                in AI, automation, and digital transformation.
                            </p>

                            <p className="text-gray-500 italic font-serif text-xl">Signature</p>
                        </motion.div>

                        {/* Right: Bento Grid of Host Images */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {/* Large image spanning left column */}
                            <div className="row-span-2 rounded-2xl overflow-hidden">
                                <img
                                    src="https://picsum.photos/id/64/400/600"
                                    alt="Host"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Top right */}
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="https://picsum.photos/id/91/400/400"
                                    alt="Host"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Bottom right */}
                            <div className="rounded-2xl overflow-hidden">
                                <img
                                    src="https://picsum.photos/id/177/400/400"
                                    alt="Host"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* OC Section - Overall Coordinators */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-purple-500"></div>
                        <span className="text-lg text-purple-400 uppercase tracking-widest font-semibold">Overall Coordinators</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {overallCoordinators.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} size="large" />
                        ))}
                    </div>
                </div>

                {/* Co-OC Section - Co-Overall Coordinators */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-blue-500"></div>
                        <span className="text-lg text-blue-400 uppercase tracking-widest font-semibold">Co-Overall Coordinators</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {coOverallCoordinators.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} size="large" />
                        ))}
                    </div>
                </div>

                {/* Core Team Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Core Team Members</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreTeamMembers.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} size="medium" />
                        ))}
                    </div>
                </div>

            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
