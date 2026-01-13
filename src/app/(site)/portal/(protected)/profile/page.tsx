"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Building,
  Phone,
  Lock,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Larry Fields",
    email: "larry.fields@example.com",
    phone: "+1 (555) 019-2834",
    company: "Fields Cosmetics, LLC",
    address: "1200 Industrial Parkway\nSuite 400\nChicago, IL 60614",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile changes saved successfully.");
  };

  const handlePasswordReset = () => {
    alert("Password reset link sent to your email.");
  };

  return (
    <div className="w-full h-full p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-industrial-900 uppercase mb-8">
        Account Information
      </h1>

      <div className="bg-white border border-industrial-200 rounded-sm overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-industrial-50 px-8 py-6 border-b border-industrial-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-berlin-red rounded-full flex items-center justify-center text-white text-xl font-bold">
              {formData.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-xl font-bold text-industrial-900">
                {formData.fullName}
              </h2>
              <p className="text-industrial-500 text-sm">
                Customer ID: 882910-PIF
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
              <User className="w-3 h-3" /> Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-sm border border-industrial-300 text-industrial-900 font-medium focus:outline-none focus:border-berlin-blue"
              />
            ) : (
              <div className="p-3 bg-industrial-50 rounded-sm border border-industrial-100 text-industrial-800 font-medium">
                {formData.fullName}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <div
              className="p-3 bg-industrial-100 rounded-sm border border-industrial-200 text-industrial-500 font-medium cursor-not-allowed"
              title="Contact support to change email"
            >
              {formData.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
              <Phone className="w-3 h-3" /> Phone Number
            </label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-sm border border-industrial-300 text-industrial-900 font-medium focus:outline-none focus:border-berlin-blue"
              />
            ) : (
              <div className="p-3 bg-industrial-50 rounded-sm border border-industrial-100 text-industrial-800 font-medium">
                {formData.phone}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
              <Building className="w-3 h-3" /> Company
            </label>
            {isEditing ? (
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-sm border border-industrial-300 text-industrial-900 font-medium focus:outline-none focus:border-berlin-blue"
              />
            ) : (
              <div className="p-3 bg-industrial-50 rounded-sm border border-industrial-100 text-industrial-800 font-medium">
                {formData.company}
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-industrial-400 uppercase tracking-widest">
              <MapPin className="w-3 h-3" /> Shipping Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 bg-white rounded-sm border border-industrial-300 text-industrial-900 font-medium focus:outline-none focus:border-berlin-blue min-h-[100px]"
              />
            ) : (
              <div className="p-3 bg-industrial-50 rounded-sm border border-industrial-100 text-industrial-800 font-medium min-h-[100px] whitespace-pre-wrap">
                {formData.address}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-industrial-50 px-8 py-4 border-t border-industrial-200 flex justify-end gap-4">
          {!isEditing ? (
            <>
              <button
                onClick={handlePasswordReset}
                className="px-6 py-2 border border-industrial-300 rounded-sm font-bold text-sm text-industrial-600 hover:bg-white transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-industrial-900 text-white rounded-sm font-bold text-sm hover:bg-berlin-red transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-industrial-300 rounded-sm font-bold text-sm text-industrial-600 hover:bg-white transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-berlin-blue text-white rounded-sm font-bold text-sm hover:bg-berlin-blue/90 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
