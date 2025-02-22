"use client";

import Image from "next/image"; // If using Next.js, otherwise use <img>
import { GraduationCap, BookOpen } from "lucide-react";

export default function OurTeam() {
  return (
    <section className="w-full max-w-full border-t border-b border-white/10 py-32">
      <div className="w-full max-w-full lg:max-w-screen-xl p-8 rounded-xl shadow-xl mx-auto">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Our Team</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Meet the talented individuals behind <strong>Spend in Peace</strong>.
          </p>
        </div>

        {/* Team Members (Students) */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          {/* Team Lead */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-8 text-center shadow-lg">
            <div className="flex justify-center">
              <Image
                src="/images/rafay.jpg"
                alt="Syed Muhammad Rafay Hassni"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mt-4 text-primary">Syed Muhammad Rafay Hassni</h3>
            <p className="bg-red-600 text-white px-2 py-1 font-semibold">Group Lead</p>
            <p className="text-sm text-gray-400 mt-2">Reg No: 21-NTU-CS-1374</p>
          </div>

          {/* Member 1 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-8 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/manaal.jpg" // Replace with actual path
                alt="Muhammad Manaal Saeed"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Manaal Saeed</h3>
            <p className="text-muted-foreground">Team Member</p>
            <p className="text-sm text-gray-400 mt-2">Reg No: 21-NTU-CS-1354</p>
          </div>

          {/* Member 2 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-8 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/haroon.jpg" // Replace with actual path
                alt="Muhammad Haroon"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Muhammad Haroon</h3>
            <p className="text-muted-foreground">Team Member</p>
            <p className="text-sm text-gray-400 mt-2">Reg No: 21-NTU-CS-1353</p>
          </div>
        </div>

        {/* Teachers Section */}
        <div className="mx-auto max-w-[58rem] text-center mt-16">
          <p className="text-muted-foreground sm:text-lg">
            We would like to thank our respected teachers for their support and guidance.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
          {/* Teacher 1 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-8 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/dr-ali.jpg" // Replace with actual path
                alt="Dr. Muhammad Ali"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Dr CM Nadeem Faisal</h3>
            <p className="text-muted-foreground">Assistant Professor</p>
            <p className="text-sm text-gray-400 mt-2">Department of Computer Science</p>
          </div>

          {/* Teacher 2 */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-8 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/ayesha-khan.jpg" // Replace with actual path
                alt=""
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mt-4">Dr Muhammad Shahid</h3>
            <p className="text-muted-foreground">Assistant Professor</p>
            <p className="text-sm text-gray-400 mt-2">Department of Computer Science</p>
          </div>
        </div>
      </div>
    </section>
  );
}