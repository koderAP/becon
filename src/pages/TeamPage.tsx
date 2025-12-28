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

// Core Team Members (15)
const coreTeamMembers: TeamMember[] = [
    { id: 1, name: "CTM 1", role: "Tech Lead", img: "https://picsum.photos/id/342/400/400" },
    { id: 2, name: "CTM 2", role: "Design Lead", img: "https://picsum.photos/id/447/400/400" },
    { id: 3, name: "CTM 3", role: "Events Head", img: "https://picsum.photos/id/531/400/400" },
    { id: 4, name: "CTM 4", role: "PR Head", img: "https://picsum.photos/id/619/400/400" },
    { id: 5, name: "CTM 5", role: "Sponsorship Lead", img: "https://picsum.photos/id/433/400/400" },
    { id: 6, name: "CTM 6", role: "Marketing Lead", img: "https://picsum.photos/id/453/400/400" },
    { id: 7, name: "CTM 7", role: "Content Head", img: "https://picsum.photos/id/473/400/400" },
    { id: 8, name: "CTM 8", role: "Social Media Head", img: "https://picsum.photos/id/493/400/400" },
    { id: 9, name: "CTM 9", role: "Outreach Head", img: "https://picsum.photos/id/513/400/400" },
    { id: 10, name: "CTM 10", role: "Logistics Head", img: "https://picsum.photos/id/533/400/400" },
    { id: 11, name: "CTM 11", role: "Speaker Relations", img: "https://picsum.photos/id/553/400/400" },
    { id: 12, name: "CTM 12", role: "Finance Head", img: "https://picsum.photos/id/573/400/400" },
    { id: 13, name: "CTM 13", role: "Web Lead", img: "https://picsum.photos/id/593/400/400" },
    { id: 14, name: "CTM 14", role: "Video Lead", img: "https://picsum.photos/id/613/400/400" },
    { id: 15, name: "CTM 15", role: "Photography Lead", img: "https://picsum.photos/id/633/400/400" },
];

// Coordinators (30)
const coordinators: TeamMember[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Coordinator ${i + 1}`,
    role: ["Tech", "Design", "Events", "PR", "Marketing", "Content", "Outreach", "Logistics", "Finance", "Media"][i % 10],
    img: `https://picsum.photos/id/${200 + i * 5}/400/400`,
}));

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
                    className="w-full h-full object-cover transition-all duration-500"
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

// Skeleton for Core Team Member
const SkeletonTeamMemberCard = () => (
    <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 h-full animate-pulse">
        <div className="aspect-square rounded-lg md:rounded-xl mb-3 md:mb-4 bg-white/10 w-full" />
        <div className="h-5 w-3/4 bg-white/10 rounded mb-2" />
        <div className="h-4 w-1/2 bg-white/10 rounded mb-4" />
        <div className="flex gap-2 md:gap-4">
            <div className="w-5 h-5 bg-white/10 rounded-full" />
            <div className="w-5 h-5 bg-white/10 rounded-full" />
        </div>
    </div>
);

// Skeleton for Coordinator
const SkeletonCoordinatorCard = () => (
    <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 h-full animate-pulse">
        <div className="aspect-square rounded-md md:rounded-lg mb-2 bg-white/10 w-full" />
        <div className="h-3 w-3/4 bg-white/10 rounded mb-1" />
        <div className="h-2 w-1/2 bg-white/10 rounded" />
    </div>
);

export const TeamPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="TEAM"
                badge="Meet the Crew"
                description="The passionate individuals behind BECon 2026."
            />

            {/* Content Visibility Flag - Set to true to show the team grid */}
            {false ? (
                <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">
                    {/* Hero Section - Meet Our Hosts (Draggable Gallery) */}
                    <TeamHostsGallery
                        hosts={hostMembers}
                        title="Meet Our Hosts: The Visionaries Behind BECon Tech Summit"
                        subtitle="Our Host"
                        description="The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation."
                        isLoading={isLoading}
                    />

                    {/* Core Team Section */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-[2px] bg-white"></div>
                            <span className="text-lg text-gray-300 uppercase tracking-widest">Core Team Members</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <SkeletonTeamMemberCard key={i} />
                                ))
                            ) : (
                                coreTeamMembers.map((member, index) => (
                                    <TeamMemberCard key={member.id} member={member} index={index} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Coordinators Section */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-[2px] bg-white"></div>
                            <span className="text-lg text-gray-300 uppercase tracking-widest">Coordinators</span>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                            {isLoading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <SkeletonCoordinatorCard key={i} />
                                ))
                            ) : (
                                coordinators.map((member, index) => (
                                    <motion.div
                                        key={member.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (index % 10) * 0.05 }}
                                        className="group bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                                    >
                                        <div className="aspect-square rounded-md md:rounded-lg overflow-hidden mb-2 bg-white/5">
                                            <img
                                                src={member.img}
                                                alt={member.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-all duration-500"
                                            />
                                        </div>
                                        <h3 className="text-xs md:text-sm font-bold text-white truncate">{member.name}</h3>
                                        <p className="text-purple-400 text-[10px] md:text-xs truncate">{member.role}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* Premium "Coming Soon" State */
                <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center max-w-2xl px-6"
                    >
                        {/* Animated Icon Container */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl opacity-30 animate-pulse" />
                                <div className="relative w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
                                    <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center border border-white/20 shadow-lg">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Visionaries</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto font-light">
                            We are curating a team of exceptional individuals dedicated to orchestrating the future of technology. The full roster will be revealed shortly.
                        </p>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center gap-4 opacity-50">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-500" />
                            <span className="text-purple-400 text-sm uppercase tracking-[0.3em] font-medium">Coming Soon</span>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-purple-500" />
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
