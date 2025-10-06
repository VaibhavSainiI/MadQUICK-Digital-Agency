'use client';

import { useState, useCallback } from 'react';
import { Copy, RefreshCw, Settings } from 'lucide-react';

interface PasswordGeneratorProps {
  onPasswordGenerated?: (password: string) => void;
}

export default function PasswordGenerator({ onPasswordGenerated }: PasswordGeneratorProps) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeLookalikes, setExcludeLookalikes] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeLookalikes) {
      charset = charset.replace(/[0O1lI]/g, '');
    }

    if (charset === '') {
      charset = 'abcdefghijklmnopqrstuvwxyz'; // fallback
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    onPasswordGenerated?.(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeLookalikes, onPasswordGenerated]);

  const copyToClipboard = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Password Generator</h2>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generated password will appear here"
            className="flex-1 px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors text-gray-300"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={generatePassword}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Generate
          </button>
        </div>

        {copyStatus && (
          <p className="text-sm text-green-400">{copyStatus}</p>
        )}

        {showOptions && (
          <div className="border-t border-gray-700 pt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Length: {length}
              </label>
              <input
                type="range"
                min="8"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Numbers (0-9)</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Symbols (!@#$%)</span>
              </label>

              <label className="flex items-center space-x-2 col-span-2">
                <input
                  type="checkbox"
                  checked={excludeLookalikes}
                  onChange={(e) => setExcludeLookalikes(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Exclude look-alikes (0, O, 1, l, I)</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}