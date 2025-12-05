import React, { useState } from 'react';
import { findDoctors } from '../services/geminiService';
import { MapPin, Search, Star, ExternalLink, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AccessFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [results, setResults] = useState<any>(null);
  const [textResponse, setTextResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResults(null);
    setTextResponse('');

    try {
      // Simple Geolocation request for current location if user leaves location field empty
      let locCoords = undefined;
      
      if (!locationStr && navigator.geolocation) {
         try {
           const pos: any = await new Promise((resolve, reject) => {
             navigator.geolocation.getCurrentPosition(resolve, reject);
           });
           locCoords = {
             lat: pos.coords.latitude,
             lng: pos.coords.longitude
           };
         } catch (e) {
           console.warn("Geolocation denied or failed");
         }
      }

      const fullQuery = locationStr ? `${query} near ${locationStr}` : query;
      
      const response = await findDoctors(fullQuery, locCoords);
      
      // Extract grounding chunks
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const text = response.text || "No summary provided.";

      setTextResponse(text);
      setResults(chunks);

    } catch (err) {
      console.error(err);
      alert("Failed to find doctors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
       <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">Find Healthcare Access</h2>
        <p className="text-slate-500 mt-2">Locate specialists, clinics, and hospitals near you instantly.</p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 border border-slate-100">
           <div className="flex-grow flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500">
             <Search className="text-slate-400 mr-2" />
             <input 
               type="text" 
               placeholder="Specialty (e.g. Cardiologist)" 
               className="bg-transparent w-full outline-none text-slate-800"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
             />
           </div>
           <div className="flex-grow flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:ring-2 focus-within:ring-teal-500">
             <MapPin className="text-slate-400 mr-2" />
             <input 
               type="text" 
               placeholder="City or Zip (Optional if loc enabled)" 
               className="bg-transparent w-full outline-none text-slate-800"
               value={locationStr}
               onChange={(e) => setLocationStr(e.target.value)}
             />
           </div>
           <button 
             type="submit" 
             disabled={loading}
             className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
           >
             {loading ? <Loader2 className="animate-spin" /> : "Search"}
           </button>
        </form>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        
        {/* Results List */}
        <div className="md:col-span-8 space-y-4">
          {textResponse && (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 prose prose-slate max-w-none">
                <ReactMarkdown>{textResponse}</ReactMarkdown>
             </div>
          )}

          {results && results.length > 0 ? (
            results.map((chunk: any, i: number) => {
              // Only render if it looks like a map result (has web uri or maps uri)
              const uri = chunk.web?.uri || chunk.maps?.uri;
              const title = chunk.web?.title || chunk.maps?.title;

              if (!uri || !title) return null;

              return (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all flex justify-between items-center group">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{title}</h3>
                    {chunk.maps?.placeAnswerSources?.reviewSnippets && (
                       <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                         "{chunk.maps.placeAnswerSources.reviewSnippets[0]?.snippet}"
                       </p>
                    )}
                  </div>
                  <a 
                    href={uri} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-shrink-0 bg-emerald-50 text-emerald-600 p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              );
            })
          ) : !loading && textResponse ? (
            <div className="text-center text-slate-500 py-10">
               Specific map locations might be embedded in the text above.
            </div>
          ) : null}
        </div>

        {/* Sidebar / Tip */}
        <div className="md:col-span-4">
           <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" /> Why use AI Search?
             </h3>
             <p className="text-slate-300 text-sm leading-relaxed mb-4">
               Our integration with Google Maps Grounding allows you to find real-time, verified locations derived directly from your natural language queries.
             </p>
             <ul className="text-sm space-y-2 text-slate-300">
               <li>• Highly rated specialists</li>
               <li>• Real patient reviews</li>
               <li>• Distance calculated for you</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};
