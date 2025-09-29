import React, { useState, useEffect } from 'react';
import { Wallet, CreditCard, Send, RefreshCw, History, Plus, Minus, ArrowUpRight, ArrowDownLeft, CheckCircle, AlertCircle, Clock, DollarSign } from 'lucide-react';

const WalletApp = () => {

  const userId = localStorage.getItem('token');
//   const [userId, setUserId] = useState('user123'); // Default user ID
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [addAmount, setAddAmount] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [debitReason, setDebitReason] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferUserId, setTransferUserId] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionFilter, setTransactionFilter] = useState('');

  const API_BASE = 'http://localhost:8000/api/wallet';

  useEffect(() => {
    if (userId) {
      fetchBalance();
      fetchTransactions();
    }
  }, [userId, currentPage, transactionFilter]);

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError('');
    } else {
      setError(message);
      setSuccess('');
    }
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 5000);
  };

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/balance`,{
         headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setWallet(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(transactionFilter && { type: transactionFilter })
      });
      
      const response = await fetch(`${API_BASE}/transactions/?${queryParams}`,{
         headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const createWallet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/create`, {
        method: 'POST',

        headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.message) {
        showMessage('Wallet created successfully!');
        fetchBalance();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAddMoney = async () => {
    if (!addAmount || addAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      
      // Create Razorpay order
      const orderResponse = await fetch(`${API_BASE}/create-order`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(addAmount) })
      });
      
      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        setError(orderData.error);
        return;
      }

      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        setError('Failed to load payment gateway');
        return;
      }

      // Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'My Wallet App',
        description: 'Add money to wallet',
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${API_BASE}/verify-payment`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: orderData.amount
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              showMessage(`₹${addAmount} added successfully to your wallet!`);
              setAddAmount('');
              fetchBalance();
              fetchTransactions();
            } else {
              setError('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function() {
            setError('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      setError('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  const handleDebitMoney = async () => {
    if (!debitAmount || debitAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/debit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${userId}`,'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: parseFloat(debitAmount),
          reason: debitReason || 'Withdrawal'
        })
      });

      const data = await response.json();
      if (data.message) {
        showMessage(`₹${debitAmount} debited successfully!`);
        setDebitAmount('');
        setDebitReason('');
        fetchBalance();
        fetchTransactions();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to debit amount');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferMoney = async () => {
    if (!transferAmount || transferAmount <= 0 || !transferUserId) {
      setError('Please enter valid transfer details');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUserId: userId,
          toUserId: transferUserId,
          amount: parseFloat(transferAmount)
        })
      });

      const data = await response.json();
      if (data.success) {
        showMessage(`₹${transferAmount} transferred successfully to ${transferUserId}!`);
        setTransferAmount('');
        setTransferUserId('');
        fetchBalance();
        fetchTransactions();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to transfer amount');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type, method) => {
    if (type === 'CREDIT') {
      return method === 'RAZORPAY' ? <CreditCard className="h-4 w-4 text-green-600" /> : <ArrowDownLeft className="h-4 w-4 text-green-600" />;
    }
    return method === 'WALLET_TRANSFER' ? <Send className="h-4 w-4 text-red-600" /> : <ArrowUpRight className="h-4 w-4 text-red-600" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'FAILED': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
                {/* <p className="text-gray-600">User ID: {userId}</p> */}
              </div>
            </div>
            <button
              onClick={fetchBalance}
              disabled={loading}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <RefreshCw className={`h-5 w-5 text-blue-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Balance Card */}
        {wallet ? (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-2">Available Balance</p>
                <h2 className="text-4xl font-bold">₹{wallet.balance?.toFixed(2) || '0.00'}</h2>
              </div>
              <DollarSign className="h-16 w-16 text-blue-200" />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
            <p className="text-gray-600 mb-4">No wallet found</p>
            <button
              onClick={createWallet}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Create Wallet
            </button>
          </div>
        )}

        {wallet && (
          <>
            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Add Money */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Plus className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Add Money</h3>
                </div>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddMoney}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  Add via Razorpay
                </button>
              </div>

              {/* Debit Money */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Minus className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold">Debit Money</h3>
                </div>
                <input
                  type="number"
                  value={debitAmount}
                  onChange={(e) => setDebitAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={debitReason}
                  onChange={(e) => setDebitReason(e.target.value)}
                  placeholder="Reason (optional)"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleDebitMoney}
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  Debit Amount
                </button>
              </div>

              {/* Transfer Money */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Send className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Transfer Money</h3>
                </div>
                <input
                  type="text"
                  value={transferUserId}
                  onChange={(e) => setTransferUserId(e.target.value)}
                  placeholder="Recipient User ID"
                  className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleTransferMoney}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <History className="h-6 w-6 text-gray-600 mr-2" />
                  <h3 className="text-lg font-semibold">Transaction History</h3>
                </div>
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Transactions</option>
                  <option value="CREDIT">Credits Only</option>
                  <option value="DEBIT">Debits Only</option>
                </select>
              </div>

              {transactions.transactions?.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {transactions.transactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type, transaction.method)}
                          <div>
                            <p className="font-medium">
                              {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount}
                            </p>
                            <p className="text-sm text-gray-600">
                              {transaction.reason || transaction.method}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(transaction.status)}
                            <span className="text-sm text-gray-600">
                              {transaction.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {transactions.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {currentPage} of {transactions.totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(Math.min(transactions.totalPages, currentPage + 1))}
                        disabled={currentPage === transactions.totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No transactions found</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletApp;