"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DebugPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSessionInfo({ data, error, timestamp: new Date().toISOString() });
    setLoading(false);
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0b0a] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#efe7d2] mb-8">Session Debug</h1>

        <div className="bg-[#1a1b1a] border border-[rgba(239,231,210,0.15)] rounded-lg p-6 mb-6">
          <h2 className="text-xl text-[#efe7d2] mb-4">Session Status</h2>
          <div className="space-y-2 text-[#efe7d2] font-mono text-sm">
            <div>
              <strong>Has Session:</strong> {sessionInfo?.data?.session ? "✅ Yes" : "❌ No"}
            </div>
            {sessionInfo?.data?.session && (
              <>
                <div>
                  <strong>User ID:</strong> {sessionInfo.data.session.user.id}
                </div>
                <div>
                  <strong>Email:</strong> {sessionInfo.data.session.user.email}
                </div>
                <div>
                  <strong>Expires At:</strong> {new Date(sessionInfo.data.session.expires_at * 1000).toLocaleString()}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-[#1a1b1a] border border-[rgba(239,231,210,0.15)] rounded-lg p-6">
          <h2 className="text-xl text-[#efe7d2] mb-4">Raw Data</h2>
          <pre className="text-[#efe7d2] text-xs overflow-auto">
            {JSON.stringify(sessionInfo, null, 2)}
          </pre>
        </div>

        <div className="mt-6 space-x-4">
          <button
            onClick={checkSession}
            className="bg-[#efe7d2] text-[#0a0b0a] px-6 py-3 rounded-lg hover:bg-[#d4ccb8]"
          >
            Refresh Session
          </button>
          <a
            href="/admin-x7k9p2/login"
            className="inline-block border border-[rgba(239,231,210,0.3)] text-[#efe7d2] px-6 py-3 rounded-lg hover:bg-[rgba(239,231,210,0.05)]"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
