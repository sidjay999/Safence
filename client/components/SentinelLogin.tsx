import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SentinelLogo } from "./ui/sentinel-logo";
import { SentinelInput } from "./ui/sentinel-input";
import { SentinelDropdown } from "./ui/sentinel-dropdown";
import { SentinelButton } from "./ui/sentinel-button";

export function SentinelLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Operator");

  const roleOptions = [
    { value: "Operator", label: "Operator" },
    { value: "Administrator", label: "Administrator" },
    { value: "Supervisor", label: "Supervisor" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { username, password, role });

    // For demo purposes, navigate to dashboard on any login attempt
    // In a real app, this would be after successful authentication
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-sentinel-bg relative flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/d548cf72d4ce0aa29583d86516911f63ed996ffd?width=2880')`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Login container */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-6">
        <div className="bg-sentinel-container border border-sentinel-border rounded-[10px] p-6 sm:p-8 shadow-xl">
          {/* Logo and header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <SentinelLogo className="text-sentinel-green" size={40} />
              <h1 className="font-fira-sans text-[28px] sm:text-[38px] font-bold italic text-sentinel-green leading-none">
                SentinelGuard
              </h1>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-sentinel-text text-center mb-1 tracking-tight">
              Login to SentinelGuard
            </h2>

            <p className="text-xs sm:text-sm text-sentinel-muted text-center px-2">
              Secure access for military operators and administrators.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <SentinelInput
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <SentinelInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <SentinelDropdown
              label="Role"
              value={role}
              options={roleOptions}
              onChange={setRole}
              placeholder="Select your role"
            />

            <div className="pt-2">
              <SentinelButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-base font-semibold"
              >
                Login Securely
              </SentinelButton>
            </div>

            <div className="text-center">
              <SentinelButton
                type="button"
                variant="ghost"
                className="text-sm font-medium"
              >
                Forgot Password?
              </SentinelButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
