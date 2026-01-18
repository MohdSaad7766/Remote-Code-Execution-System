import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8090/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok && data.authenticated) {
                // 1. Store the JWT Token
                localStorage.setItem("token", data.token);

                // 2. Logic: Check if profile is null
                // If null, it's their first login; send to setup-profile
                if (data.profile === null) {
                    navigate("/setup-profile");
                } else {
                    // Otherwise, send to the main dashboard
                    navigate("/");
                }
            } else {
                setMessage(data.message || "Invalid credentials");
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-blue-500/30">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[420px]"
            >
                {/* BLUE-BORDERED BOX */}
                <div className="bg-[#0a0a0a] border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.08)] rounded-[24px] p-8 md:p-10">
                    
                    {/* Brand Header */}
                    <div className="mb-8 text-left">
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                            CODE<span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">LAB</span>
                        </h2>
                        <p className="text-zinc-500 text-sm mt-2 leading-relaxed font-medium">
                            Enter your credentials to access your workspace.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Error Handling */}
                        <AnimatePresence mode="wait">
                            {message && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] flex items-center gap-2 overflow-hidden mb-2"
                                >
                                    <AlertCircle size={14} className="shrink-0" /> 
                                    <span className="font-medium">{message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 transition-all placeholder:text-zinc-700"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em]">Password</label>
                                <Link to="/forgot" className="text-[10px] text-blue-500 hover:text-blue-400 transition-colors font-bold uppercase tracking-wider">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 transition-all placeholder:text-zinc-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-lg shadow-blue-600/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ChevronRight size={16} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
                        <p className="text-zinc-500 text-xs font-medium">
                            New to the platform?{" "}
                            <Link to="/sign-up" className="text-white font-bold hover:text-blue-400 transition-colors">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginComponent;