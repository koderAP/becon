import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';
import { TeamHostsGallery, HostMember } from '../../components/TeamHostsGallery';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    img: string;
    linkedin?: string;
    instagram?: string;
}

// OCs and Co-OCs combined for the hero gallery (4 people)
const hostMembers: HostMember[] = [
    {
        id: 1,
        name: "Mai",
        role: "Overall Coordinator",
        img: "https://picsum.photos/id/64/400/600",
        bio: "Leading BECon 2026 with a vision to connect innovators across India.",
    },
    {
        id: 2,
        name: "Tanmay",
        role: "Overall Coordinator",
        img: "https://picsum.photos/id/91/400/400",
        bio: "Driving the entrepreneurship ecosystem at IIT Delhi.",
    },
    {
        id: 3,
        name: "Siddhesh",
        role: "Co-Overall Coordinator",
        img: "https://picsum.photos/id/177/400/400",
        bio: "Coordinating events and partnerships for BECon.",
    },
    {
        id: 4,
        name: "Kunal",
        role: "Co-Overall Coordinator",
        img: "https://picsum.photos/id/338/400/400",
        bio: "Building bridges between startups and investors.",
    },
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
const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
        >
            <div className="aspect-square rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4 bg-white/5">
                <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>
            <h3 className="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 truncate">{member.name}</h3>
            <p className="text-purple-400 font-medium text-xs md:text-base mb-2 md:mb-4 truncate">{member.role}</p>

            <div className="flex gap-2 md:gap-4">
                <a href={member.linkedin || '#'} className="text-gray-400 hover:text-[#0077b5] transition-colors">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href={member.instagram || '#'} className="text-gray-400 hover:text-[#E1306C] transition-colors">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </a>
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

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">

                {/* Hero Section - Meet Our Hosts (Draggable Gallery) */}
                <TeamHostsGallery
                    hosts={hostMembers}
                    title="Meet Our Hosts: The Visionaries Behind BECon Tech Summit"
                    subtitle="Our Host"
                    description="The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation."
                />

                {/* Core Team Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Core Team Members</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                        {coreTeamMembers.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} />
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
