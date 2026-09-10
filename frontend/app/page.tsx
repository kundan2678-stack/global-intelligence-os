'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [status, setStatus] = useState('Connecting to Backend...');

  useEffect(() => {
    // Backend ka status check karna
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setStatus('Online 🟢'))
      .catch(err => setStatus('Offline 🔴'));

    // Database se Workspaces lana
    fetch('http://localhost:5000/api/workspaces')
      .then(res => res.json())
      .then(data => setWorkspaces(data))
      .catch(console.error);

    // Database se Datasets lana
    fetch('http://localhost:5000/api/datasets')
      .then(res => res.json())
      .then(data => setDatasets(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <header className="mb-10 pb-4 border-b border-gray-800 flex justify-between items-end">
        <h1 className="text-3xl font-bold tracking-wider">GLOBAL INTELLIGENCE OS</h1>
        <span className="text-sm text-gray-400">System Status: {status}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Workspaces Box */}
        <div className="border border-gray-800 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Workspaces</h2>
          {workspaces.length === 0 ? (
            <p className="text-gray-500">Loading workspaces...</p>
          ) : (
            workspaces.map((ws: any) => (
              <div key={ws.id} className="p-3 bg-gray-800 rounded border border-gray-700">
                {ws.name}
              </div>
            ))
          )}
        </div>

        {/* Datasets Box */}
        <div className="border border-gray-800 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Datasets</h2>
          <p className="text-gray-400">{datasets.length} datasets</p>
        </div>

        {/* Sources Box */}
        <div className="border border-gray-800 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Sources</h2>
          <p className="text-gray-400">0 sources</p>
        </div>

      </div>
    </div>
  );
}