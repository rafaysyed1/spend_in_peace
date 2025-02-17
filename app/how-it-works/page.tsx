import { CheckCircle, LogIn, PieChart, UserCheck, Wallet, MessageSquare, Lightbulb } from "lucide-react";

const steps = [
  {
    title: "Register & Verify",
    description: "Sign up and verify your email to get started.",
    icon: <UserCheck size={40} className="text-primary" />,
  },
  {
    title: "Login & Setup Profile",
    description: "Log in and complete your profile details.",
    icon: <LogIn size={40} className="text-primary" />,
  },
  {
    title: "Manage Expenses & Budget",
    description: "Add, edit, and track your expenses and budget.",
    icon: <Wallet size={40} className="text-primary" />,
  },
  {
    title: "View Insights & Warnings",
    description: "Analyze spending trends and get alerts.",
    icon: <PieChart size={40} className="text-primary" />,
  },
 
  {
    title: "Chat with AI for Financial Improvement",
    description: "Engage in real-time chats to optimize your financial decisions based on your spendings",
    icon: <MessageSquare size={40} className="text-primary" />,
  },
  {
    title: "Stay on Track & Securely Logout",
    description: "Keep finances in check and log out safely.",
    icon: <CheckCircle size={40} className="text-primary" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 border-t border-white/10">
      <div className="w-full max-w-full lg:max-w-screen-xl p-8 rounded-xl shadow-xl mx-auto">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-center">How It Works</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg text-center">
          A simple 6-step process to track and manage your expenses effortlessly as every penny matters!
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-xl border border-gray-700  transition-all transform hover:scale-105 hover:shadow-2xl  flex flex-col items-center justify-center"
            >
              <div className="mb-4 flex justify-center items-center">
                <div className="p-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 rounded-full">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
