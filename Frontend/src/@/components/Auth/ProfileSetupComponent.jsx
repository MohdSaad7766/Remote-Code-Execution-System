import React, { useState, useEffect } from "react";
import { User, ChevronRight, AlertCircle, MapPin, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileSetupComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [profileData, setProfileData] = useState({
    name: "",
    gender: "MALE",
    preferredLanguage: "JAVA",
    location: { city: "", state: "", country: "" }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const field = name.split(".")[1];
      setProfileData(prev => ({
        ...prev,
        location: { ...prev.location, [field]: value }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8090/app-user/user/add-profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to save profile details.");
      }
    } catch (err) {
      setError("Connection lost. Is the backend service running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-blue-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px]"
      >
        <div className="bg-[#0a0a0a] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] rounded-[32px] p-8 md:p-12">
          
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <User className="text-blue-500" size={32} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Complete <span className="text-blue-500">Profile</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-2 font-medium">Almost there! We just need a few more details.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Gender */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Gender</label>
                <select 
                  name="gender" 
                  onChange={handleChange} 
                  className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 text-nowrap">Primary Stack</label>
                <select 
                  name="preferredLanguage" 
                  onChange={handleChange} 
                  className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="JAVA">JAVA</option>
                  <option value="CPP">C++</option>
                  <option value="C">C</option>
                  <option value="JAVA_SCRIPT">JAVASCRIPT</option>
                  <option value="PYTHON">PYTHON</option>
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 px-1">
                <MapPin size={12} className="text-blue-500" />
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Location Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="location.city" required onChange={handleChange} placeholder="City" className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" />
                <input name="location.state" required onChange={handleChange} placeholder="State" className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" />
              </div>
              <input name="location.country" required onChange={handleChange} placeholder="Country" className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Finish Setup <ChevronRight size={16} strokeWidth={3} /></>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSetupComponent;