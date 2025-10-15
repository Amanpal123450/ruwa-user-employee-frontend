import React, { useState, useEffect, useRef } from 'react';
import ArogyaCard from "../components/HealthCard";
import Healthcardback from "../components/Healthcardback";
import html2canvas from 'html2canvas';

// --- Helper Components ---

const CardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-slate-500">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

// --- Main App Component ---
export default function GetCard() {
    // --- State Management ---
    const [step, setStep] = useState(1);
    const [applicationNumber, setApplicationNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);
    const [resendTimer, setResendTimer] = useState(0);
    const cardRef = useRef();

    // API Base URL - Update this to your backend URL
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ruwa-backend.onrender.com/api/otp';

    // --- Effects ---
    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    // --- Event Handlers ---

    // Send OTP to user's mobile
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        
        if (applicationNumber.length < 8) {
            setError('Please enter a valid Application Number.');
            return;
        }
        
        if (mobileNumber.length !== 10) {
            setError('Please enter a valid 10-digit Mobile Number.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationNumber,
                    mobileNumber,
                }),
            });

            const data = await response.json();
              console.log(data);
            if (data.success) {
                alert(`Development OTP: ${data.otp}`);
                setStep(2);
                setResendTimer(30);
                // For development - auto-fill OTP if provided
                if (data.otp) {
                    console.log('Development OTP:', data.otp);
                }
            } else {
                setError(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP and get user data
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationNumber,
                    mobileNumber,
                    otp,
                }),
            });

            const data = await response.json();

            if (data.status) {
                setUserData(data.application);
                setStep(3);
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error('Verify OTP error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle resending OTP
    const handleResendOtp = async () => {
        if (resendTimer === 0) {
            setError('');
            setIsLoading(true);

            try {
                const response = await fetch(`${API_BASE_URL}/resend-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        applicationNumber,
                        mobileNumber,
                    }),
                });

                const data = await response.json();
                     console.log(data);
                    //  alert('Development OTP:', data.otp);
                if (data.success) {
                    setResendTimer(30);
                    setOtp('');
                    if (data.otp) {
                       alert(`Development OTP: ${data.otp}`);

                    }
                } else {
                    setError(data.message || 'Failed to resend OTP.');
                }
            } catch (err) {
                console.error('Resend OTP error:', err);
                setError('Network error. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Reset state to go back to the initial screen
    const handleGoBack = () => {
        setStep(1);
        setApplicationNumber('');
        setMobileNumber('');
        setOtp('');
        setError('');
        setUserData(null);
        setResendTimer(0);
    };
    
    // --- Render Logic ---

    const renderLoginForm = () => (
        <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
                <label htmlFor="applicationNumber" className="block text-sm font-medium text-slate-700">
                    Application Number
                </label>
                <div className="mt-1">
                    <input
                        id="applicationNumber"
                        name="applicationNumber"
                        type="text"
                        value={applicationNumber}
                        onChange={(e) => setApplicationNumber(e.target.value)}
                        required
                        className="w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="e.g., APP123456789"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-700">
                    Registered Mobile Number
                </label>
                <div className="mt-1">
                    <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        maxLength="10"
                        required
                        className="w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="10-digit mobile number"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
            </div>
        </form>
    );


const handleDownload = async () => {
  if (!cardRef.current) return;
  await new Promise((resolve) => setTimeout(resolve, 500));
  html2canvas(cardRef.current, {
    useCORS: true,
    allowTaint: true,
    scale: 2,
    backgroundColor: "#ffffff",
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.download = "JanArogyaCard.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch((error) => {
      console.error("Error capturing card:", error);
      alert("Failed to download card. Please try again.");
    });
};


    const renderOtpForm = () => (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
             <p className="text-center text-sm text-slate-600">
                An OTP has been sent to your mobile number
                <br />
                <span className="font-semibold text-slate-800">XXXXXX{mobileNumber.slice(-4)}</span>
            </p>
            <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                    Enter OTP
                </label>
                <div className="mt-1">
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength="6"
                        required
                        className="w-full text-center tracking-[0.5em] rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder="_ _ _ _ _ _"
                    />
                </div>
            </div>
            <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isLoading}
                  className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                   Resend OTP {resendTimer > 0 ? `in ${resendTimer}s` : ''}
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Verifying...' : 'Verify & Proceed'}
                </button>
            </div>
        </form>
    );
    
    const renderUserData = () => (
  <div className="text-center">
    {/* Card Preview */}
    <div
      ref={cardRef}
      className="flex flex-wrap justify-center items-center gap-6 p-6 bg-white rounded-lg shadow-lg border mx-auto"
      style={{
        width: "100%",
        maxWidth: "1000px", // give both cards full space
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ flex: "1 1 450px", display: "flex", justifyContent: "center" }}>
        <ArogyaCard Application={userData} />
      </div>
      <div style={{ flex: "1 1 450px", display: "flex", justifyContent: "center" }}>
        <Healthcardback Application={userData} />
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
      <button
        onClick={handleGoBack}
        className="w-full sm:w-auto px-5 py-2 rounded-md font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Go Back
      </button>

      <button
        onClick={handleDownload}
        className="w-full sm:w-auto px-5 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Download Card
      </button>
    </div>
  </div>
);


    return (
        <>
        <br/>
        <br/>
        <br/>
        <main className="bg-slate-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">Jan Arogya Card Portal</h1>
                    <p className="text-slate-600 mt-2">Powered by RUWA India</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-indigo-700 p-4 flex items-center space-x-3">
                        <CardIcon />
                        <h2 className="text-lg font-semibold text-white">
                            {step < 3 ? 'Card Verification' : 'Your Digital Card'}
                        </h2>
                    </div>

                    <div className="p-6 md:p-8">
                        {step < 3 && (
                            <div className="text-center mb-6">
                                <p className="text-sm text-slate-600">
                                    Welcome to the Jan Arogya Card Portal. A national initiative providing affordable healthcare for every Indian family.
                                </p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4 text-sm" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        
                        {step === 1 && renderLoginForm()}
                        {step === 2 && renderOtpForm()}
                        {step === 3 && renderUserData()}
                    </div>
                </div>
                 <footer className="text-center mt-6 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} RUWA India. All Rights Reserved.</p>
                </footer>
            </div>
        </main>
        </>
    );
}