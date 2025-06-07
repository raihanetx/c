import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Order, OrderStatus } from '../types';
import { PageTitle } from '../components/PageTitle';
import { PAYMENT_METHODS } from '../constants';
import { ArrowLeftIcon, CartIcon } from '../components/icons';

const getStatusColorChip = (status: OrderStatus) => {
  let colorClasses = '';
  switch (status) {
    case OrderStatus.PENDING_PAYMENT: colorClasses = 'bg-gray-200 text-gray-700 border-gray-300'; break; // Was yellow
    case OrderStatus.PAYMENT_VERIFICATION: colorClasses = 'bg-gray-200 text-gray-700 border-gray-300'; break; // Was blue
    case OrderStatus.PROCESSING: colorClasses = 'bg-[#8F87F1]/30 text-[#8F87F1] border-[#8F87F1]/50'; break; // Was indigo, now primary variant
    case OrderStatus.COMPLETED: colorClasses = 'bg-[#8F87F1]/20 text-[#8F87F1] border-[#8F87F1]/50'; break; // Was green, now primary variant
    case OrderStatus.CANCELLED: colorClasses = 'bg-gray-500 text-white border-gray-600'; break; // Was red
    default: colorClasses = 'bg-gray-100 text-gray-700 border-gray-300'; // Was slate
  }
  return `px-3 py-1 text-sm font-medium rounded-full border ${colorClasses}`;
};


export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderByID } = useAppContext();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderByID(orderId);
      setOrder(foundOrder || null);
    }
     window.scrollTo(0, 0);
  }, [orderId, getOrderByID]);

  if (!order) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12 text-center min-h-screen">
        <PageTitle title="Order Not Found" />
        <p className="text-gray-500 mb-6">We couldn't find an order with that ID.</p> {/* text-slate-500 to text-gray-500 */}
        <Link
          to="/orders"
          className="bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors" // hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1]
        >
          View Your Orders
        </Link>
      </div>
    );
  }
  
  const paymentInstructions = PAYMENT_METHODS.find(pm => pm.name === order.paymentMethod)?.instructions;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 min-h-screen">
      <Link
        to="/orders"
        className="mb-6 inline-flex items-center text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1] transition-colors" // hover:text-[#7c71d0] to hover:text-opacity-80 hover:text-[#8F87F1]
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Order History
      </Link>

      <PageTitle title="Order Confirmation" subtitle={`Thank you, ${order.customerName}! Your order has been received.`} />

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6 pb-6 border-b border-gray-200"> {/* border-slate-200 to border-gray-200 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Order ID:</h3> {/* text-slate-700 to text-gray-700 */}
            <p className="font-mono text-gray-600">#{order.id}</p> {/* text-slate-600 to text-gray-600 */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Order Date:</h3> {/* text-slate-700 to text-gray-700 */}
            <p className="text-gray-600">{new Date(order.orderDate).toLocaleString()}</p> {/* text-slate-600 to text-gray-600 */}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Order Status:</h3> {/* text-slate-700 to text-gray-700 */}
            <p><span className={getStatusColorChip(order.status)}>{order.status}</span></p>
          </div>
           <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Amount:</h3> {/* text-slate-700 to text-gray-700 */}
            <p className="text-xl font-bold text-[#8F87F1]">৳{order.totalAmount.toLocaleString()}</p> {/* text-[#6A60B5] to text-[#8F87F1] */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information:</h3> {/* text-slate-700 to text-gray-700 */}
                <p className="text-gray-600"><strong>Name:</strong> {order.customerName}</p> {/* text-slate-600 to text-gray-600 */}
                <p className="text-gray-600"><strong>Email:</strong> {order.customerEmail}</p> {/* text-slate-600 to text-gray-600 */}
                <p className="text-gray-600"><strong>Phone:</strong> {order.customerPhone}</p> {/* text-slate-600 to text-gray-600 */}
            </div>
             <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Details:</h3> {/* text-slate-700 to text-gray-700 */}
                <p className="text-gray-600"><strong>Method:</strong> {order.paymentMethod}</p> {/* text-slate-600 to text-gray-600 */}
                {order.transactionId && <p className="text-gray-600"><strong>Transaction ID:</strong> {order.transactionId}</p>} {/* text-slate-600 to text-gray-600 */}
             </div>
        </div>


        {order.status === OrderStatus.PENDING_PAYMENT && paymentInstructions && (
          <div className="mb-8 p-4 bg-gray-100 border border-gray-300 text-gray-700 rounded-md"> {/* Was yellow-theme */}
            <h4 className="font-semibold mb-2">Payment Instructions:</h4>
            <p className="text-sm whitespace-pre-line">{paymentInstructions.replace("Use your Order ID as reference.", `Use Order ID #${order.id.substring(0,8)} as reference.`)}</p>
            <p className="text-sm mt-2">After payment, please allow some time for manual verification. Your order status will be updated accordingly.</p>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Items Ordered:</h3> {/* text-slate-700 to text-gray-700 */}
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50"> {/* border-slate-200 to border-gray-200, bg-slate-50 to bg-gray-50 */}
                <img src={item.imageUrl} alt={item.name} className="h-20 w-20 object-cover rounded-md shadow-sm flex-shrink-0" />
                <div className="flex-grow">
                  <Link to={`/products/${item.id}`} className="font-medium text-black hover:text-[#8F87F1] block">{item.name}</Link> {/* text-slate-800 to text-black */}
                  <p className="text-xs text-gray-500 mb-1">{item.category}</p> {/* text-slate-500 to text-gray-500 */}
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p> {/* text-slate-600 to text-gray-600 */}
                </div>
                <p className="text-sm font-semibold text-gray-700 whitespace-nowrap">৳{(item.price * item.quantity).toLocaleString()}</p> {/* text-slate-700 to text-gray-700 */}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center"> {/* border-slate-200 to border-gray-200 */}
          <p className="text-gray-600 mb-4">If you have any questions about your order, please contact us.</p> {/* text-slate-600 to text-gray-600 */}
          <Link
            to="/products"
            className="bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors inline-flex items-center space-x-2" // hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1]
          >
            <CartIcon className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};