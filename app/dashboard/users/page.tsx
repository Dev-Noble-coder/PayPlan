'use client';

import React, { useState } from 'react';
import { X, Heart, Check, BadgeCheck } from 'lucide-react';

type TabType = 'All Users' | 'Active Users' | 'Suspended Users';

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('All Users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<TabType>('All Users');

  const tabs: TabType[] = ['All Users', 'Active Users', 'Suspended Users'];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header / Metrics Placeholder */}
        <div className="bg-user-info-bg rounded-xl p-6 border border-gray-800">
          <h1 className="text-2xl font-bold mb-4">Users Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-black/50 border border-gray-800">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-semibold mt-2">1,234</p>
            </div>
            <div className="p-4 rounded-lg bg-black/50 border border-gray-800">
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-3xl font-semibold mt-2 text-green-500">1,100</p>
            </div>
            <div className="p-4 rounded-lg bg-black/50 border border-gray-800">
              <p className="text-gray-400 text-sm">Suspended Users</p>
              <p className="text-3xl font-semibold mt-2 text-red-500">134</p>
            </div>
          </div>
        </div>

        {/* Users List Section */}
        <div className="bg-user-info-bg rounded-xl border border-gray-800 overflow-hidden">
          <div className="flex items-center border-b border-gray-800/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">{activeTab} List</h2>
              <button className="px-4 py-2 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-200 transition-colors">
                Add User
              </button>
            </div>
            
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Joined Date</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50 text-gray-300">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                        Aisha Doe
                      </td>
                      <td className="py-4">zaravibes@example.com</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-4">Oct 24, 2023</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={openModal}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeModal}
        />
      )}

      {/* User Details Modal (Side Sheet) */}
      <div 
        className={`fixed top-0 right-0 h-full w-[450px] max-w-full bg-[] z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-800/50 shadow-2xl flex flex-col ${
          isModalOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6 pb-2">
          <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Profile Header */}
          <div className="flex flex-col items-center px-8 pb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Aisha" 
                  alt="Aisha Doe" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Verified Badge */}
              <div className="absolute bottom-1 right-1 bg-[#1DA1F2] text-white rounded-full p-0.5 flex items-center justify-center h-6 w-6">
                <Check size={14} strokeWidth={4} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">Aisha Doe</h2>
            <p className="text-gray-400 text-sm mb-6">@zaravibes</p>

            {/* Stats */}
            <div className="flex gap-10 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">134</p>
                <p className="text-xs text-gray-400">Videos</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">1.5M</p>
                <p className="text-xs text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">100</p>
                <p className="text-xs text-gray-400">Following</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#1A1F26] hover:bg-[#252B36] text-[#E0E2E6] py-2.5 rounded-full text-sm font-medium transition-colors border border-gray-800">
                <Heart size={16} className="text-[#FF3B30] fill-[#FF3B30]" />
                2.4M total likes
              </button>
              <button className="flex-1 bg-[#042F1C] hover:bg-[#053D24] text-[#00E576] py-2.5 rounded-full text-sm font-medium transition-colors border border-[#00E576]/10">
                Active
              </button>
            </div>
          </div>

          {/* Modal Tabs */}
          <div className="border-b border-gray-800/50 mt-4 px-6">
            <div className="flex w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setModalTab(tab)}
                  className={`py-3 text-sm font-medium transition-colors relative flex-1 text-center ${
                    modalTab === tab
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-400'
                  }`}
                >
                  {tab}
                  {modalTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF3B30]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Tab Content (User Information) */}
          <div className="p-6">
            <div className="bg-[#0C131D] rounded-xl border border-gray-800/60 p-6">
              <h3 className="text-base font-semibold text-white mb-6">User Information</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-800/50">
                  <span className="text-sm font-medium text-gray-300">User ID</span>
                  <span className="text-sm font-bold text-white">1234567890</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-800/50">
                  <span className="text-sm font-medium text-gray-300">Email Address</span>
                  <span className="text-sm font-bold text-white">zara@gmail.com</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-800/50">
                  <span className="text-sm font-medium text-gray-300">Phone Number</span>
                  <span className="text-sm font-bold text-white">08100000000</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">Country/Region</span>
                  <span className="text-sm font-bold text-white">US</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
