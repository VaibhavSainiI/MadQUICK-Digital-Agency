'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Shield, Lock, Key } from 'lucide-react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Password Vault</h1>
            </div>
            
            <div className="flex gap-4">
              <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 rounded-full p-6">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Secure Password<br />
            <span className="text-blue-400">Management</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Generate strong passwords and store them securely with client-side encryption.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Start Securing Your Passwords
            </Link>
            <Link href="/login" className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 text-center">
            <div className="bg-blue-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Key className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Strong Password Generation</h3>
            <p className="text-gray-300">Generate cryptographically secure passwords with customizable options.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Lock className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Client-Side Encryption</h3>
            <p className="text-gray-300">Your passwords are encrypted on your device before storage.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 text-center">
            <div className="bg-purple-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Secure Storage</h3>
            <p className="text-gray-300">Zero-knowledge architecture ensures your data remains private.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
