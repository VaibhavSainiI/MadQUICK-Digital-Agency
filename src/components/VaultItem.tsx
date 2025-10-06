'use client';

import { useState } from 'react';
import { VaultItemData } from '@/types/vault';
import { Eye, EyeOff, Copy, Edit, Trash2, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '@/lib/clientCrypto';

interface VaultItemProps {
  item: VaultItemData & { _id: string };
  onEdit: (item: VaultItemData & { _id: string }) => void;
  onDelete: (id: string) => void;
}

export default function VaultItem({ item, onEdit, onDelete }: VaultItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: string }>({});

  const handleCopy = async (text: string, field: string) => {
    try {
      await copyToClipboard(text);
      setCopyStatus({ ...copyStatus, [field]: 'Copied!' });
      setTimeout(() => {
        setCopyStatus({ ...copyStatus, [field]: '' });
      }, 2000);
    } catch (error) {
      setCopyStatus({ ...copyStatus, [field]: 'Failed' });
      setTimeout(() => {
        setCopyStatus({ ...copyStatus, [field]: '' });
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              {item.url}
              <ExternalLink size={12} />
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {item.username && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 w-20">Username:</span>
            <span className="flex-1 font-mono text-sm text-gray-200">{item.username}</span>
            <button
              onClick={() => handleCopy(item.username, 'username')}
              className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Copy size={14} />
            </button>
            {copyStatus.username && (
              <span className="text-xs text-green-400">{copyStatus.username}</span>
            )}
          </div>
        )}

        {item.password && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 w-20">Password:</span>
            <span className="flex-1 font-mono text-sm text-gray-200">
              {showPassword ? item.password : '••••••••••••'}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={() => handleCopy(item.password, 'password')}
              className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Copy size={14} />
            </button>
            {copyStatus.password && (
              <span className="text-xs text-green-400">{copyStatus.password}</span>
            )}
          </div>
        )}

        {item.notes && (
          <div className="mt-3">
            <span className="text-sm text-gray-400">Notes:</span>
            <p className="text-sm text-gray-300 mt-1 p-2 bg-gray-700 rounded">{item.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}