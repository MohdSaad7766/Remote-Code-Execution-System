import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, RefreshCw, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RegistrationComponent = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");

  // Strength Validation State
  const requirements = [
    { label: "8+ Characters", test: (pw) => pw.length >= 8 },
    { label: "Uppercase Letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Lowercase Letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "Number", test: (pw) => /[0-9]/.test(pw) },
    { label: "Special Character", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];

  const isPasswordValid = requirements.every(req => req.test(formData.password));

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return; // Guard clause
    
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:8090/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Verification code sent to your email!");
        setErrorType("success");
        setStep(2);
        setTimer(300);
      } else {
        setErrorType("error");
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorType("error");
      setMessage("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:8090/auth/resend-otp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        setMessage("A new code has been sent!");
        setErrorType("success");
        setTimer(300);
      } else {
        setErrorType("error");
        setMessage("Failed to resend OTP.");
      }
    } catch (error) {
      setErrorType("error");
      setMessage("Could not connect to the server.");
    } finally {
      setResending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8090/auth/verify-email`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otpString: otp }),
      });
      if (response.ok) {
        setMessage("Verified! Redirecting to login...");
        setErrorType("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrorType("error");
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorType("error");
      setMessage("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-blue-500/30 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="bg-[#0a0a0a] border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.08)] rounded-[24px] p-8 md:p-10">
          
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              CODE<span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">LAB</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-2 font-medium">
              {step === 1 ? "Create your account to begin." : "Security verification required."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-6 p-3 rounded-xl border text-[12px] flex items-center gap-2 overflow-hidden ${
                  errorType === "success" 
                  ? "bg-green-500/10 border-green-500/20 text-green-400" 
                  : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <AlertCircle size={14} className="shrink-0" />
                <span className="font-medium">{message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleRequestOTP} 
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Email</label>
                  <input 
                    name="email" type="email" required onChange={handleChange} 
                    placeholder="you@example.com" 
                    className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Password</label>
                  <div className="relative">
                    <input 
                      name="password" type={showPassword ? "text" : "password"} 
                      required onChange={handleChange} 
                      placeholder="••••••••" 
                      className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-xl py-3.5 px-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-700" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Password Strength Requirement List */}
                  <div className="grid grid-cols-2 gap-y-2 pt-2 px-1">
                    {requirements.map((req, idx) => {
                      const isValid = req.test(formData.password);
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          {isValid ? (
                            <CheckCircle2 size={12} className="text-green-500" />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-zinc-700" />
                          )}
                          <span className={`text-[10px] font-medium transition-colors ${isValid ? "text-zinc-300" : "text-zinc-600"}`}>
                            {req.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !isPasswordValid} 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-600/20 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Get Started <ChevronRight size={16} strokeWidth={3} /></>}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleVerify} 
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] flex justify-center">Enter 6-digit Code</label>
                  <input
                    type="text" maxLength="6" value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-4 text-center text-3xl font-mono bg-[#0d0d0d] border-2 border-zinc-800 rounded-2xl text-white outline-none focus:border-blue-500 transition-all tracking-[0.2em]"
                    placeholder="000000"
                  />
                </div>
                
                <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify Account"}
                </button>

                <div className="flex justify-between items-center px-1">
                  <button type="button" onClick={() => setStep(1)} className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 hover:text-white uppercase tracking-wider">
                    <ArrowLeft size={14} /> Back
                  </button>

                  <button
                    type="button" onClick={handleResendOTP} disabled={resending || timer > 0}
                    className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-wider ${
                      timer > 0 ? "text-zinc-700" : "text-blue-500 hover:text-blue-400"
                    }`}
                  >
                    <RefreshCw size={14} className={resending ? "animate-spin" : ""} />
                    {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend Code"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <p className="text-zinc-500 text-xs font-medium">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-white font-bold hover:text-blue-400 transition-colors">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationComponent;