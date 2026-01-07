import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Linkedin } from 'lucide-react';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';
import { TeamHostsGallery, HostMember } from '../../components/TeamHostsGallery';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    img: string;
    linkedin?: string;
    phone?: string;
}

// OC for the hero gallery
const hostMembers: HostMember[] = [
    {
        id: 1,
        name: "Ekansh Agarwal",
        role: "Overall Coordinator",
        img: "/Team/ekansh.avif",
        bio: "Leading BECon 2026 with a vision to connect innovators across India.",
        linkedin: "https://www.linkedin.com/in/ekansh-agarwal-689301250/",
        phone: "9530153916",
    },
    {
        id: 20,
        name: "Tanmay Sharma",
        role: "Overall Coordinator",
        img: "/Team/tanmay.avif",
        bio: "Driving the strategic vision and execution of BECon 2026.",
        linkedin: "https://www.linkedin.com/in/tanmay-sharma-966237253",
        phone: "9024788538",
    },
    {
        id: 22,
        name: "Siddhesh Raj",
        role: "Co-Overall Coordinator",
        img: "/Team/siddhesh.avif",
        bio: "Orchestrating operations and synergies for a seamless summit experience.",
        linkedin: "https://www.linkedin.com/in/rajsiddhesh/",
        phone: "7004303797",
    },
];

// Core Team Members from team.json
const coreTeamMembers: TeamMember[] = [
    { id: 21, name: "Vipinsh Mehra", role: "Director", img: "/Team/vipinsh.avif", linkedin: "https://in.linkedin.com/in/vipinsh-mehra-871398260", phone: "8882313137" },
    { id: 23, name: "Chinmay Yadav", role: "Speaker Outreach", img: "/Team/chinmay.avif", linkedin: "https://www.linkedin.com/in/chinmay-yadav-9b7819240/", phone: "+91 82799 22387" },
    { id: 1, name: "Kartik Gupta", role: "Admin and Finance", img: "/Team/kartik.avif", linkedin: "https://www.linkedin.com/in/kartikkguppta", phone: "9116524430" },
    { id: 2, name: "Kushagrah Jain", role: "Marketing", img: "/Team/kushagrah.avif", linkedin: "https://www.linkedin.com/in/kushagrah-jain-b83187286/", phone: "7073543248" },
    { id: 3, name: "Sakshi Sharma", role: "Marketing", img: "/Team/sakshi.avif", linkedin: "https://www.linkedin.com/in/sakshisharma431/", phone: "8448060901" },
    { id: 4, name: "Lakshya Goel", role: "Marketing", img: "/Team/lakshya.avif", linkedin: "https://www.linkedin.com/in/goellakshay/", phone: "9896961502" },
    { id: 5, name: "Mann Agarwal", role: "Media", img: "/Team/mann.avif", linkedin: "https://www.linkedin.com/in/mann-agarwal/" },
    { id: 6, name: "Shreshth Kumar", role: "Events", img: "/Team/shresth.avif", linkedin: "https://www.linkedin.com/in/shreshthkumar-iitdelhi" },
    { id: 7, name: "Archit Tayal", role: "Events", img: "/Team/archit.avif", linkedin: "https://www.linkedin.com/in/archit-tayal485/", phone: "8318640120" },
    { id: 8, name: "Janit Sachdeva", role: "Publicity", img: "/Team/janit.avif", linkedin: "https://www.linkedin.com/in/janit-sachdeva/", phone: "9425775980" },
    { id: 9, name: "Gursheen Kaur", role: "Creative", img: "/Team/gursheen.avif", phone: "9175065641" },
    { id: 10, name: "Pratibha Kashyap", role: "Creative", img: "/Team/pratibha.avif", linkedin: "https://www.linkedin.com/in/pratibha-kashyap/", phone: "8920491285" },
    { id: 11, name: "Kritika Chaudhary", role: "Board Events", img: "/Team/kritika.avif", linkedin: "https://www.linkedin.com/in/kritika-chaudhary1936/", phone: "8448367110" },
    { id: 12, name: "Anubhav Pandey", role: "Tech", img: "/Team/anubhav.avif", phone: null, linkedin: "https://www.linkedin.com/in/anubhavpandeyiitd/" },
    { id: 13, name: "Aditya Jain", role: "Tech", img: "/Team/aditya.avif", phone: "9756195746" },
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
                    className="w-full h-full object-cover transition-all duration-500"
                />
            </div>

            {/* Name, Role and Icons Row */}
            <div className="flex items-center justify-between">
                {/* Name and Role */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 truncate">{member.name}</h3>
                    <p className="text-purple-400 font-medium text-xs md:text-base truncate">{member.role}</p>
                </div>

                {/* Social Icons - Vertical on right */}
                <div className="flex flex-col gap-2 ml-2">
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    )}
                    {member.phone && (
                        <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-green-500 transition-colors">
                            <Phone className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    )}
                </div>
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

export const TeamPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="TEAM"
                badge="Meet the Crew"
                description="The passionate individuals behind BECon 2026."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-[1600px] mx-auto">
                {/* Hero Section - Meet Our Host (OC) */}
                <TeamHostsGallery
                    hosts={hostMembers}
                    title="Meet Our Hosts: The Visionaries Behind BECon Tech Summit"
                    subtitle="Our Hosts"
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
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
