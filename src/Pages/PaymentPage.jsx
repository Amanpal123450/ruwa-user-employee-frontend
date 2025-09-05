import { useState } from 'react';
import { CreditCard, Shield, CheckCircle, Clock, Award, FileCheck } from 'lucide-react';

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate Razorpay integration
    const options = {
      key: 'rzp_test_your_key_here', // Replace with your actual Razorpay key
      amount: 25000, // ₹250 in paise (250 * 100)
      currency: 'INR',
      name: 'Janarogya Kendra',
      description: 'Application Fee for Janarogya Kendra Registration',
      image: 'https://via.placeholder.com/100x100?text=JK',
      handler: function (response) {
        console.log('Payment Success:', response);
        console.log('Payment ID:', response.razorpay_payment_id);
        setPaymentSuccess(true);
        setIsProcessing(false);
      },
      prefill: {
        name: 'Applicant Name',
        email: 'applicant@example.com',
        contact: '+919999999999'
      },
      notes: {
        address: 'Janarogya Kendra Application Fee'
      },
      theme: {
        color: '#059669'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    // In real implementation, load Razorpay SDK:
    // const rzp = new window.Razorpay(options);
    // rzp.open();

    // For demo purposes, simulate payment success after 2 seconds
    setTimeout(() => {
      setPaymentSuccess(true);
      setIsProcessing(false);
    }, 2000);
  };

  const resetPayment = () => {
    setPaymentSuccess(false);
    setIsProcessing(false);
  };

  if (paymentSuccess) {
    return (
      <>
        <style>
          {`
            .success-container {
              min-height: 100vh;
              background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .success-card {
              max-width: 400px;
              width: 100%;
              background: white;
              border-radius: 20px;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              padding: 32px;
              text-align: center;
            }
            .success-icon {
              width: 80px;
              height: 80px;
              background: #dcfce7;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 24px;
            }
            .success-title {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 8px;
            }
            .success-description {
              color: #6b7280;
              margin-bottom: 24px;
            }
            .transaction-details {
              background: #dcfce7;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 24px;
            }
            .transaction-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 16px;
            }
            .transaction-row:last-child {
              margin-bottom: 0;
            }
            .amount-label {
              color: #374151;
              font-weight: 500;
            }
            .transaction-amount {
              font-size: 20px;
              font-weight: bold;
              color: #16a34a;
            }
            .transaction-id {
              font-family: monospace;
              font-size: 12px;
            }
            .success-features {
              text-align: left;
              margin-bottom: 24px;
            }
            .success-feature {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 8px;
            }
            .success-feature svg {
              width: 16px;
              height: 16px;
              color: #16a34a;
              margin-right: 12px;
            }
            .new-payment-button {
              width: 100%;
              background: linear-gradient(135deg, #059669 0%, #16a34a 100%);
              color: white;
              border: none;
              padding: 12px;
              border-radius: 12px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .new-payment-button:hover {
              background: linear-gradient(135deg, #047857 0%, #15803d 100%);
              transform: translateY(-1px);
            }
          `}
        </style>
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">
              <CheckCircle size={48} color="#16a34a" />
            </div>
            
            <h1 className="success-title">Payment Successful!</h1>
            <p className="success-description">Your payment of ₹250 has been processed successfully.</p>
            
            <div className="transaction-details">
              <div className="transaction-row">
                <span className="amount-label">Transaction Amount</span>
                <span className="transaction-amount">₹250</span>
              </div>
              <div className="transaction-row">
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Transaction ID</span>
                <span className="transaction-id">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>

            <div className="success-features">
              <div className="success-feature">
                <CheckCircle size={16} />
                <span>Payment confirmation sent to your email</span>
              </div>
              <div className="success-feature">
                <CheckCircle size={16} />
                <span>Application processing will begin shortly</span>
              </div>
              <div className="success-feature">
                <CheckCircle size={16} />
                <span>You will receive updates via SMS/Email</span>
              </div>
            </div>

            <button className="new-payment-button" onClick={resetPayment}>
              Make Another Payment
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .payment-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .payment-card {
            max-width: 500px;
            width: 100%;
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #059669 0%, #16a34a 100%);
            color: white;
            text-align: center;
            padding: 30px;
          }
          .header-icon {
            width: 64px;
            height: 64px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
          }
          .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .header p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin: 0;
          }
          .content {
            padding: 32px;
          }
          .payment-summary {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
          }
          .amount-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .amount-label {
            color: #374151;
            font-weight: 600;
            font-size: 18px;
          }
          .amount-value {
            font-size: 32px;
            font-weight: bold;
            color: #059669;
          }
          .amount-description {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
          }
          .features-section {
            margin-bottom: 24px;
          }
          .features-title {
            display: flex;
            align-items: center;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 16px;
            font-size: 16px;
          }
          .features-title svg {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            color: #059669;
          }
          .feature-item {
            display: flex;
            align-items: center;
            padding: 12px;
            background: #f9fafb;
            border-radius: 8px;
            margin-bottom: 12px;
          }
          .feature-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            flex-shrink: 0;
          }
          .feature-content h4 {
            font-weight: 500;
            color: #1f2937;
            font-size: 14px;
            margin: 0 0 2px 0;
          }
          .feature-content p {
            font-size: 12px;
            color: #6b7280;
            margin: 0;
          }
          .pay-button {
            width: 100%;
            background: linear-gradient(135deg, #059669 0%, #16a34a 100%);
            color: white;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.2s ease;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          }
          .pay-button:hover {
            background: linear-gradient(135deg, #047857 0%, #15803d 100%);
            transform: translateY(-1px);
          }
          .pay-button:disabled {
            opacity: 0.75;
            cursor: not-allowed;
            transform: none;
          }
          .spinner {
            width: 24px;
            height: 24px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .security-info {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
          }
          .security-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 24px;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .security-badge {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .security-description {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 16px;
          }
          .payment-methods {
            text-align: center;
          }
          .payment-methods p {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .method-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .method-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
          }
          .upi { background: #dbeafe; color: #1e40af; }
          .cards { background: #dcfce7; color: #16a34a; }
          .netbanking { background: #fae8ff; color: #a21caf; }
          .wallets { background: #fed7aa; color: #ea580c; }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 640px) {
            .payment-card {
              margin: 10px;
            }
            .content {
              padding: 24px;
            }
            .method-badges {
              gap: 4px;
            }
          }
        `}
      </style>
      
      <div className="payment-container">
        <div className="payment-card">
          <div className="header">
            <div className="header-icon">
              <Shield size={32} />
            </div>
            <h1>Janarogya Kendra</h1>
            <p>Healthcare Center Registration</p>
          </div>

          <div className="content">
            <div className="payment-summary">
              <div className="amount-row">
                <span className="amount-label">Application Fee</span>
                <span className="amount-value">₹250</span>
              </div>
              <p className="amount-description">
                One-time registration fee for Janarogya Kendra application processing
              </p>
            </div>

            <div className="features-section">
              <h3 className="features-title">
                <Award />
                What's Included
              </h3>
              
              <div className="feature-item">
                <FileCheck className="feature-icon" color="#16a34a" />
                <div className="feature-content">
                  <h4>Application Processing</h4>
                  <p>Complete verification and approval process</p>
                </div>
              </div>

              <div className="feature-item">
                <Shield className="feature-icon" color="#3b82f6" />
                <div className="feature-content">
                  <h4>Digital Certificate</h4>
                  <p>Official Janarogya Kendra registration certificate</p>
                </div>
              </div>

              <div className="feature-item">
                <Clock className="feature-icon" color="#f59e0b" />
                <div className="feature-content">
                  <h4>Quick Processing</h4>
                  <p>Application reviewed within 7-10 working days</p>
                </div>
              </div>
            </div>

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard size={24} />
                  <span>Pay ₹250 Securely</span>
                </>
              )}
            </button>

            <div className="security-info">
              <div className="security-badges">
                <div className="security-badge">
                  <Shield size={16} />
                  <span>256-bit SSL Encrypted</span>
                </div>
                <span>•</span>
                <span>Powered by Razorpay</span>
              </div>
              <p className="security-description">
                Your payment information is secure and encrypted
              </p>

              <div className="payment-methods">
                <p>Accepted Payment Methods</p>
                <div className="method-badges">
                  <span className="method-badge upi">UPI</span>
                  <span className="method-badge cards">Cards</span>
                  <span className="method-badge netbanking">Net Banking</span>
                  <span className="method-badge wallets">Wallets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}