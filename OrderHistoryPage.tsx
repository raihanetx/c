import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Order, OrderStatus } from '../types';
import { PageTitle } from '../components/PageTitle';
import { ListIcon as EmptyOrderIcon } from '../components/icons';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING_PAYMENT: return 'text-gray-700 bg-gray-200'; // Was yellow
    case OrderStatus.PAYMENT_VERIFICATION: return 'text-gray-700 bg-gray-200'; // Was blue
    case OrderStatus.PROCESSING: return 'text-white bg-[#8F87F1]/70'; // Was indigo, now primary variant
    case OrderStatus.COMPLETED: return 'text-white bg-[#8F87F1]'; // Was green, now primary
    case OrderStatus.CANCELLED: return 'text-white bg-gray-500'; // Was red, now gray
    default: return 'text-gray-700 bg-gray-100'; // Was slate
  }
};

export const OrderHistoryPage: React.FC = () => {
  const { orders } = useAppContext();

  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  if (sortedOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <EmptyOrderIcon className="h-24 w-24 text-gray-300 mb-6" /> {/* text-slate-300 to text-gray-300 */}
        <PageTitle title="No Orders Yet" />
        <p className="text-gray-500 mb-6">You haven't placed any orders with us.</p> {/* text-slate-500 to text-gray-500 */}
        <Link
          to="/products"
          className="bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors" // hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1]
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 min-h-screen">
      <PageTitle title="Your Orders" subtitle={`You have placed ${sortedOrders.length} order(s).`} />
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50"> {/* bg-slate-50 to bg-gray-50 */}
              <tr>
                <th className="text-left font-semibold text-gray-600 p-4">Order ID</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-left font-semibold text-gray-600 p-4">Date</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-center font-semibold text-gray-600 p-4">Status</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-right font-semibold text-gray-600 p-4">Total</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-center font-semibold text-gray-600 p-4">Actions</th> {/* text-slate-600 to text-gray-600 */}
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"> {/* border-slate-200 to border-gray-200, hover:bg-slate-50 to hover:bg-gray-50 */}
                  <td className="p-4">
                    <Link to={`/order-confirmation/${order.id}`} className="font-mono text-sm text-[#8F87F1] hover:underline">
                      #{order.id.substring(0, 8)}...
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</td> {/* text-slate-600 to text-gray-600 */}
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-700 font-medium">৳{order.totalAmount.toLocaleString()}</td> {/* text-slate-700 to text-gray-700 */}
                  <td className="p-4 text-center">
                    <Link 
                      to={`/order-confirmation/${order.id}`} 
                      className="text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1]" // hover:text-[#7c71d0] to hover:text-opacity-80 hover:text-[#8F87F1]
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {sortedOrders.map(order => (
            <div key={order.id} className="p-4 border-b border-gray-200 last:border-b-0"> {/* border-slate-200 to border-gray-200 */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link to={`/order-confirmation/${order.id}`} className="font-mono text-sm text-[#8F87F1] hover:underline block">
                    Order #{order.id.substring(0, 8)}...
                  </Link>
                  <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p> {/* text-slate-500 to text-gray-500 */}
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-md font-semibold text-black">৳{order.totalAmount.toLocaleString()}</p> {/* text-slate-800 to text-black */}
                <Link 
                  to={`/order-confirmation/${order.id}`} 
                  className="text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1]" // hover:text-[#7c71d0] to hover:text-opacity-80 hover:text-[#8F87F1]
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};