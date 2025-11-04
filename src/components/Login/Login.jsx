import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// --- 1. MARQUEE STYLES (Inline CSS) ---
const MarqueeStyles = `
  /* AGGRESSIVE FIX: Ensure the HTML/Body/Root element takes full viewport height */
  html, body, #root {
    height: 100%;
    margin: 0;
  }
  
  /* Marquee container styling */
  .marquee {
    position: relative;
    padding: 3rem 1.5rem;
    border: 12px solid #ffaa00; /* Gold frame border */
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(255, 170, 0, 0.7), 0 0 30px rgba(255, 170, 0, 0.4);
    background: #000000;
    font-family: 'Georgia', serif; 
    animation: flicker 1s infinite alternate;
  }
  
  /* Inner light effect */
  .marquee::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 8px dashed #ffdd55; /* Inner dashed light effect */
    border-radius: 8px;
    pointer-events: none;
    animation: glow-flicker 2s infinite alternate;
  }
  
  /* Keyframes for a subtle flickering light effect */
  @keyframes flicker {
    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
      box-shadow: 0 0 15px rgba(255, 170, 0, 0.7), 0 0 30px rgba(255, 170, 0, 0.4);
    }
    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
      box-shadow: 0 0 5px rgba(255, 170, 0, 0.3), 0 0 10px rgba(255, 170, 0, 0.2);
    }
  }

  @keyframes glow-flicker {
    0% { opacity: 0.95; }
    100% { opacity: 1; }
  }

  /* Text Shadow for 'Neon' Effect */
  .neon-text {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #ffaa00,
      0 0 20px #ffaa00,
      0 0 25px #ffaa00,
      0 0 30px #ffaa00;
  }
`;

/**
 * A styled component rendering the marquee welcome message.
 */
function WelcomeMarquee({ children }) {
  return (
    <>
      <style>{MarqueeStyles}</style>
      
      {/* Ensures the marquee is centered vertically and horizontally */}
      <div className="flex justify-center items-center p-8 min-h-screen bg-gray-900">
        {/* Increased max-w for better spacing */}
        <div className="marquee w-full max-w-2xl md:max-w-3xl text-center"> 
          
          <h1 className="neon-text text-4xl sm:text-5xl font-bold text-yellow-300 tracking-wider mb-6 leading-tight">
            WELCOME TO 
            <br />
            LUCKY'S MOVIE CENTER
          </h1>

          <div className="text-white text-xl sm:text-2xl neon-text font-normal space-y-4 mb-8">
            <p>
              If you are a returning customer, please log in.
            </p>
            <p className="text-yellow-400 font-semibold">
              New to the show? Sign up!
            </p>
          </div>
          
          {/* Children (Form/Login Content) is placed here */}
          <div className="mt-8 flex justify-center w-full"> 
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// --- 2. MAIN LOGIN COMPONENT LOGIC ---
export default function Login({ setUser }) { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const navigate = useNavigate(); // This assumes your parent component provides the Router context.

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: username, passWord: password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          userName: data.user.userName,
          email: data.user.email,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
        navigate("/"); // redirect to home
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  // Placeholder for Signup function (will only display an error until implemented)
  const handleSignupPlaceholder = (e) => {
    e.preventDefault();
    setError("Signup is currently disabled.");
  };

  // Helper function to render either Login or Signup form
  const renderForm = () => {
    // Current Form is Login
    if (isLogin) {
        return (
            <form onSubmit={handleLogin} className="space-y-4 w-full"> 
                {/* Username Input */}
                <div>
                    <label className="block text-left text-yellow-400 mb-1 font-bold">Username</label> 
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                        required
                    />
                </div>
                
                {/* Password Input */}
                <div>
                    <label className="block text-left text-yellow-400 mb-1 font-bold">Password</label> 
                    <div className="flex w-full"> 
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 p-3 rounded-l bg-gray-700 text-white placeholder-gray-400 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-3 bg-gray-600 text-yellow-400 rounded-r hover:bg-gray-500 transition duration-150"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full p-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition duration-150 shadow-md"
                >
                    LOG IN
                </button>
            </form>
        );
    } 
    // Current Form is Signup (Placeholder)
    else {
        return (
            <form onSubmit={handleSignupPlaceholder} className="space-y-4 w-full"> 
                <p className="text-gray-400">
                    Your full signup form would go here.
                </p>
                
                {/* Placeholder input fields */}
                <input 
                    className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400" 
                    type="text" 
                    placeholder="First Name" 
                    required
                />
                <input 
                    className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400" 
                    type="text" 
                    placeholder="Username" 
                    required
                />
                <input 
                    className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400" 
                    type="password" 
                    placeholder="Password" 
                    required
                />
                
                <button 
                    type="submit" 
                    className="w-full p-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-150 shadow-md"
                >
                    SIGN UP
                </button>
            </form>
        );
    }
  };

  return (
    <WelcomeMarquee>
        {/* Outer container ensures the form block itself is centered and sized correctly */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-yellow-500/50 w-full max-w-sm mx-auto text-white"> 
            <h3 className="text-yellow-400 text-3xl mb-6 font-bold text-center">
                {isLogin ? "Customer Login" : "New Account Sign Up"}
            </h3>
            
            <div className="w-full"> {/* Ensure form rendering container takes full width */}
                {renderForm()}
            </div>
            
            {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}
            
            <button 
                onClick={() => {
                    setIsLogin(!isLogin);
                    setError(''); // Clear error on toggle
                    setUsername(''); // Clear fields on toggle
                    setPassword('');
                }}
                className="w-full mt-6 text-sm text-yellow-400 hover:text-yellow-300 transition duration-150"
            >
                {isLogin ? "Need an account? Sign Up!" : "Already have an account? Log In!"}
            </button>
        </div>
    </WelcomeMarquee>
  );
}