import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beaker, CheckCircle, XCircle, Play, Users, Search } from 'lucide-react';

interface Trial {
  id: number;
  name: string;
  phase: string;
  status: string;
  sponsor: string;
}

const App: React.FC = () => {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trials');
      setTrials(response.data);
    } catch (error) {
      console.error('Error fetching trials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrials = trials.filter(trial => 
    trial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trial.sponsor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <Play className="text-green-500" size={18} />;
      case 'completed': return <CheckCircle className="text-blue-500" size={18} />;
      case 'terminated': return <XCircle className="text-red-500" size={18} />;
      case 'recruiting': return <Users className="text-orange-500" size={18} />;
      default: return <Beaker className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Beaker className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">TrialVault Dashboard</h1>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search trials, sponsors..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Clinical Trial Overview</h2>
          <p className="text-gray-500">Monitor and manage all current clinical research programs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Trials', value: trials.filter(t => t.status === 'Active').length, color: 'border-green-500' },
            { label: 'Recruiting', value: trials.filter(t => t.status === 'Recruiting').length, color: 'border-orange-500' },
            { label: 'Completed', value: trials.filter(t => t.status === 'Completed').length, color: 'border-blue-500' },
            { label: 'Terminated', value: trials.filter(t => t.status === 'Terminated').length, color: 'border-red-500' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color} hover:shadow-md transition-shadow`}>
              <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Trial Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Phase</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Sponsor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading trial data...</td>
                  </tr>
                ) : filteredTrials.length > 0 ? (
                  filteredTrials.map((trial) => (
                    <tr key={trial.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 text-gray-400 font-mono text-sm">#{trial.id}</td>
                      <td className="px-6 py-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{trial.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                          {trial.phase}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-medium">
                          {getStatusIcon(trial.status)}
                          <span className="capitalize">{trial.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{trial.sponsor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No trials found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-gray-400 text-sm border-t border-gray-100 mt-12 bg-white">
        &copy; 2026 TrialVault Clinical Systems. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
