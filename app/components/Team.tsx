"use client";

import Image from "next/image";

// Define types for team members and supervisors
interface TeamMember {
  name: string;
  role: string;
  regNo?: string; // Optional for supervisors
  image: string;
  highlight?: boolean; // Optional for special styling
}

interface Supervisor extends Omit<TeamMember, "regNo" | "highlight"> {
  designation: string;
}

// Props for the TeamCard component
interface TeamCardProps {
  name: string;
  role: string;
  regNo?: string;
  image: string;
  highlight?: boolean;
}

// TeamCard component
const TeamCard = ({ name, role, regNo, image, highlight = false }: TeamCardProps) => (
  <div className="relative flex flex-col items-center text-center overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
    <Image src={image} alt={name} width={120} height={120} className="rounded-full object-cover" />
    <h3 className="text-lg font-bold mt-4">{name}</h3>
    <p className={`mt-2 ${highlight ? "bg-red-600 text-white px-2 rounded-md" : "text-muted-foreground"}`}>{role}</p>
    {regNo && <p className="text-sm text-gray-400 mt-2">{regNo}</p>}
  </div>
);

// Team data
const teamMembers: TeamMember[] = [
  {
    name: "Syed M. Rafay Hassni",
    role: "Group Lead",
    regNo: "21-NTU-CS-1374",
    image: "/images/rafay.jpg",
    highlight: true, // To apply special styling
  },
  {
    name: "Manaal Saeed",
    role: "Group Member",
    regNo: "21-NTU-CS-1354",
    image: "/images/manaal.jpg",
  },
  {
    name: "Muhammad Haroon",
    role: "Group Member",
    regNo: "21-NTU-CS-1353",
    image: "/images/haroon.jpg",
  },
];

const supervisors: Supervisor[] = [
  {
    name: "Dr CM Nadeem Faisal",
    role: "Supervisor",
    designation: "Assistant Professor, Department of Computer Science",
    image: "/images/nadeem.jpg",
  },
  {
    name: "Dr Muhammad Shahid",
    role: "Co-Supervisor",
    designation: "Assistant Professor, Department of Computer Science",
    image: "/images/shahid.jpg",
  },
];

// Main component
export default function OurTeam() {
  return (
    <section className="w-full max-w-full border-t border-b border-white/10 py-32">
      <div className="w-full max-w-screen-xl p-8 mx-auto">
        <div className="text-center">
          <h2 className="font-bold text-3xl sm:text-3xl md:text-5xl">Our Team</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Meet the talented individuals behind <strong>Spend in Peace</strong>.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid max-w-5xl mx-auto grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>

        {/* Supervisors */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground sm:text-lg">
            We would like to thank our respected <strong>Supervisor</strong> and <strong>Co-Supervisor</strong> for their support and guidance.
          </p>
        </div>

        <div className="grid max-w-5xl mx-auto grid-cols-1 gap-8 md:grid-cols-2 mt-12">
          {supervisors.map((supervisor, index) => (
            <TeamCard key={index} {...supervisor} regNo={''} />
          ))}
        </div>
      </div>
    </section>
  );
}