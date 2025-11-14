"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, ArrowRight, Users, Settings, BarChart3, BookOpen, GraduationCap } from "lucide-react";

export default function AdminAccessPage() {
  const [isAccessing, setIsAccessing] = useState(false);
  const router = useRouter();

  const handleAdminAccess = () => {
    setIsAccessing(true);
    // Direct redirect to instructor dashboard
    setTimeout(() => {
      window.location.href = '/dashboard/instructor';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 animate-bounce">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Admin Access
          </h1>
          <p className="text-slate-300 text-lg">
            Secure access to the admin dashboard
          </p>
        </div>

        {/* Main Card */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Admin Portal
            </CardTitle>
            <CardDescription className="text-slate-300">
              Access the instructor dashboard to manage courses and students
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Admin Features Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-white">Manage Students</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-sm text-white">Create Courses</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-white">View Analytics</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                <Settings className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-white">System Settings</span>
              </div>
            </div>

            {/* Access Button */}
            <Button 
              onClick={handleAdminAccess}
              disabled={isAccessing}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAccessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Accessing Dashboard...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Access Admin Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-slate-400">
                🔒 This is a secure admin access point
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            NCLEX Keys International Academy
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Professional Healthcare Education
          </p>
        </div>
      </div>
    </div>
  );
}
