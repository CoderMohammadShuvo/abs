"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        organization: "",
        interest: "",
        message: "",
        agree: false
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        //@ts-ignore
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-3xl mt-8 mx-auto px-6 py-12 flex flex-col items-center">
            <h2 className="text-[68px] font-base font-mono text-center mb-10 text-[#2c2f3a]">
                Be Part of ABS Research Academy
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 w-2/3">
                <FormLabel label="Full Name" />
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="border px-4 py-2 w-full border px-4 py-2 w-full"
                />

                <FormLabel label="Email Address" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="border px-4 py-2 w-full"
                />

                <FormLabel label="Organization / Institution" />
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Enter your organization / institution name"
                    className="border px-4 py-2 w-full"
                />

                <FormLabel label="Select Your Interest" />
                <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="border px-4 py-2 w-full cursor-pointer"
                >
                    <option value="">Select your interest</option>
                    <option value="research">Research</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="projects">Projects</option>
                    <option value="internship">Internship</option>
                </select>

                <FormLabel label="Message" />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={4}
                    className="border px-4 py-2 w-full"
                ></textarea>

                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                    />
                    <p className="text-sm text-gray-600">
                        I agree to the terms and privacy policy
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#393F50] text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#23252f] transition"
                >
                    <svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33333 13.3333H14.6667L17.3333 10.6667H5.33333V13.3333ZM5.33333 8H13.3333V5.33333H5.33333V8ZM2.66667 2.66667V16H12L9.33333 18.6667H0V0H26.6667V4H24V2.66667H2.66667ZM27.8667 9.73333C27.9778 9.84445 28.0333 9.96667 28.0333 10.1C28.0333 10.2333 27.9778 10.3556 27.8667 10.4667L26.6667 11.6667L24.3333 9.33333L25.5333 8.13333C25.6444 8.02222 25.7667 7.96667 25.9 7.96667C26.0333 7.96667 26.1556 8.02222 26.2667 8.13333L27.8667 9.73333ZM14.6667 21.3333V19L23.5333 10.1333L25.8667 12.4667L17 21.3333H14.6667Z" fill="white" />
                    </svg>
                    Register Now
                </button>
            </form>

            <div className="max-w-3xl flex flex-col items-right">
                <h2 className="text-[68px] font-base font-mono text-center mt-16 text-[#2c2f3a]">
                    Newsletter
                </h2>
                <p className="text-center text-base w-2/3 mx-auto">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                {/* <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="border px-4 py-2 w-2/3 mt-6" 
                /> */}
                <input type="text" placeholder="enter your email" className="border px-4 py-2 w-2/3 mx-auto my-10" />
                <button
                    type="submit"
                    className="w-[180px] mx-auto bg-[#393F50] text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#23252f] transition"
                >

                    Contact Us

                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.86732 17.3333L14.6673 4.53333V16H17.334V0H1.33398V2.66667H12.8007L0.000650406 15.4667L1.86732 17.3333Z" fill="white" />
                    </svg>

                </button>
            </div>
        </div>
    );
}

// COMPONENT: Label
function FormLabel({ label }: { label: string }) {
    return <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>;
}
