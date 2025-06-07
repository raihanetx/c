
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { PAYMENT_METHODS } from '../constants';
import { Order } from '../types';
import { PageTitle } from '../components/PageTitle';
import { UserIcon, MailIcon, PhoneIcon, CheckCircleIcon, InfoIcon } from '../components/icons'; // Added InfoIcon

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, placeOrder } = useAppContext();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<"Nagad" | "bKash" | "">("");
  const [transactionId, setTransactionId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalAmount = getCartTotal();

  if (cart.length === 0 && process.env.NODE_ENV !== 'development') { // Allow direct access in dev for styling
    navigate('/cart'); 
    return null;
  }
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = "Full name is required.";
    if (!customerEmail.trim()) newErrors.customerEmail = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(customerEmail)) newErrors.customerEmail = "Please enter a valid email address.";
    if (!customerPhone.trim()) newErrors.customerPhone = "Phone number is required.";
    // Basic phone validation (e.g., Bangladeshi numbers) - can be more complex
    else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(customerPhone.replace(/[\s-]/g, ''))) newErrors.customerPhone = "Please enter a valid phone number.";
    if (!paymentMethod) newErrors.paymentMethod = "Please select a payment method.";
    if (paymentMethod && !transactionId.trim()) newErrors.transactionId = "Transaction ID is required for the selected payment method.";
    else if (paymentMethod && transactionId.trim().length < 5) newErrors.transactionId = "Transaction ID seems too short.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    const orderDetails: Omit<Order, 'id' | 'items' | 'totalAmount' | 'orderDate' | 'status'> = {
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod: paymentMethod as "Nagad" | "bKash", 
      transactionId,
    };
    
    const newOrder = placeOrder(orderDetails);
    if (newOrder) {
      navigate(`/order-confirmation/${newOrder.id}`);
    } else {
      setErrors(prev => ({ ...prev, form: 'An unexpected error occurred. Could not place order. Please try again.'}))
    }
  };

  const selectedPaymentMethodDetails = PAYMENT_METHODS.find(pm => pm.name === paymentMethod);

  const InputField: React.FC<{
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: React.ReactNode;
    placeholder?: string;
  }> = ({ id, label, type, value, onChange, error, icon, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative rounded-md shadow-sm">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <input 
          type={type} 
          id={id} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          className={`form-input block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border rounded-md transition duration-150 ease-in-out sm:text-sm 
            ${error ? 'border-gray-500 text-gray-800 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-400' 
                   : 'border-gray-300 placeholder-gray-400 focus:ring-[#8F87F1] focus:border-[#8F87F1]'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs text-gray-600 flex items-center"><InfoIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0"/>{error}</p>}
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 min-h-screen">
        <PageTitle title="Complete Your Purchase" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Order Summary (Right column on Desktop, Top on Mobile) */}
          <div className="lg:col-span-1 lg:order-last">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-3">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded-md"/>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
               {cart.length === 0 && process.env.NODE_ENV === 'development' && ( // Placeholder for dev styling
                <div className="py-3 text-sm text-gray-500">Cart is empty (dev mode).</div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-black">
                  <span>Total:</span>
                  <span>৳{totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Includes all taxes and fees.</p>
              </div>
            </div>
          </div>

          {/* Checkout Form (Left column on Desktop, Bottom on Mobile) */}
          <div className="lg:col-span-2 lg:order-first">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information Card */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">Contact Information</h3>
                <div className="space-y-5">
                  <InputField 
                    id="customerName" 
                    label="Full Name" 
                    type="text" 
                    value={customerName} 
                    onChange={e => setCustomerName(e.target.value)} 
                    error={errors.customerName}
                    icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                    placeholder="e.g. Jannatul Ferdous"
                  />
                  <InputField 
                    id="customerEmail" 
                    label="Email Address" 
                    type="email" 
                    value={customerEmail} 
                    onChange={e => setCustomerEmail(e.target.value)} 
                    error={errors.customerEmail}
                    icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                    placeholder="you@example.com"
                  />
                  <InputField 
                    id="customerPhone" 
                    label="Phone Number" 
                    type="tel" 
                    value={customerPhone} 
                    onChange={e => setCustomerPhone(e.target.value)} 
                    error={errors.customerPhone}
                    icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
                    placeholder="+8801XXXXXXXXX"
                  />
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">Payment Method</h3>
                <div className="space-y-4">
                  {PAYMENT_METHODS.map(method => (
                    <label 
                      key={method.id} 
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-150 ease-in-out
                        ${paymentMethod === method.name 
                          ? 'border-[#8F87F1] ring-2 ring-[#8F87F1] bg-[#8F87F1]/5' 
                          : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.name} 
                        checked={paymentMethod === method.name} 
                        onChange={() => { setPaymentMethod(method.name as "Nagad" | "bKash"); setErrors(e => ({...e, paymentMethod: undefined})); }}
                        className="h-4 w-4 text-[#8F87F1] focus:ring-[#8F87F1] border-gray-300 form-radio"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-800">{method.name}</span>
                      {paymentMethod === method.name && <CheckCircleIcon className="h-5 w-5 text-[#8F87F1] ml-auto" />}
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="mt-2 text-xs text-gray-600 flex items-center"><InfoIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0"/>{errors.paymentMethod}</p>}
                
                {selectedPaymentMethodDetails && (
                  <div className="mt-5 p-4 bg-gray-100 border border-gray-200 text-gray-700 rounded-md text-sm space-y-1">
                    <p className="font-medium">Instructions for {selectedPaymentMethodDetails.name}:</p>
                    <p className="whitespace-pre-line">{selectedPaymentMethodDetails.instructions.replace("Use your Order ID as reference.", `Use your unique Order ID (provided after completion) as reference.`)}</p>
                  </div>
                )}

                {paymentMethod && (
                  <div className="mt-6">
                    <InputField 
                      id="transactionId" 
                      label={`Your ${paymentMethod} Transaction ID (TrxID)`}
                      type="text" 
                      value={transactionId} 
                      onChange={e => setTransactionId(e.target.value)} 
                      error={errors.transactionId}
                      placeholder="e.g. ABC123XYZ789"
                    />
                  </div>
                )}
              </div>
              
              {errors.form && <p className="text-sm text-black bg-gray-200 p-3 rounded-md flex items-center"><InfoIcon className="h-5 w-5 mr-2 text-gray-600 flex-shrink-0"/>{errors.form}</p>}
              
              <button 
                type="submit" 
                className="w-full bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={(cart.length === 0  && process.env.NODE_ENV !== 'development') || !paymentMethod || !customerName || !customerEmail || !customerPhone }
              >
                Place Order & Pay ৳{totalAmount.toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
