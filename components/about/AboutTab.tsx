"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import DepartmentTabContent from "./DepartmentTab";
import OurTeam from "./OurTeam";
import PublicationPage from "./Publications";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("departments");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDept, setSelectedDept] = useState("All Departments");

  const departments = ["Business Research", "IT & Innovation", "Consulting"];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="relative h-[400px] w-full mt-[40px]">
        <Image
          src="/about-hero-bg.png"
          alt="Header Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-[84px] font-base font-mono">
            About ABS Research Academy
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center mt-6 border-b relative top-[-50px] max-w-[700px] shadow-md  mx-auto  bg-white">

      {/* Departments Tab + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setActiveTab("departments")}
          className={`px-6 py-3 text-lg flex items-center gap-2 ${
            activeTab === "departments"
              ? "border-b-2 border-gray-900 font-medium"
              : "text-gray-500"
          }`}
        >
          {selectedDept}
          <ChevronDown
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(!openDropdown);
            }}
            className="cursor-pointer"
          />
        </button>

        {openDropdown && (
          <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md border z-20">
            {departments.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedDept(item);
                  setOpenDropdown(false);
                  setActiveTab("departments");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Our Team tab */}
      <button
        onClick={() => setActiveTab("team")}
        className={`px-6 py-3 text-lg ${
          activeTab === "team"
            ? "border-b-2 border-gray-900 font-medium"
            : "text-gray-500"
        }`}
      >
        Our Team
      </button>

      {/* Publications tab */}
      <button
        onClick={() => setActiveTab("publications")}
        className={`px-6 py-3 text-lg ${
          activeTab === "publications"
            ? "border-b-2 border-gray-900 font-medium"
            : "text-gray-500"
        }`}
      >
        Publications
      </button>
    </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-10">

        {activeTab === "departments" && (
          <>
            <DepartmentTabContent/>
          </>
        )}

        {activeTab === "team" && (
         <>
            <OurTeam/>
         </>
        )}

        {activeTab === "publications" && (
          <>
            <PublicationPage/>
          </>
        )}
      </div>
    </div>
  );
}
