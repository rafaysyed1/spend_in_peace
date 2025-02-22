"use client";

import { PieChart, Smartphone, HeartHandshake, TrendingUp } from "lucide-react";

const missionItems = [
  {
    name: "Simple Expense Tracking",
    description: "We make tracking expenses effortless, even for those less familiar with technology.",
    icon: PieChart,
  },
  {
    name: "Accessible for Everyone",
    description: "Designed with simplicity in mind, so anyone can manage their finances with ease.",
    icon: Smartphone,
  },
  {
    name: "AI-Powered Insights",
    description: "Get personalized financial advice based on your spending habits.",
    icon: HeartHandshake,
  },
  {
    name: "Controlled Spending",
    description: "Helping you manage your finances better and spend wisely.",
    icon: TrendingUp,
  },
];

export default function OurMission() {
  return (
    <section className="py-32 border-t border-white/10">
      <div className="w-full max-w-full lg:max-w-screen-xl p-8 rounded-xl shadow-xl mx-auto">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Our Mission</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            By building <strong>Spend in Peace</strong>, our aim is to provide the following:
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
          {missionItems.map((item) => (
            <div key={item.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
              <div className="flex items-center gap-4">
                <item.icon className="h-8 w-8" />
                <h3 className="font-bold">{item.name}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}