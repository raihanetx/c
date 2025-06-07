import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { CartItem } from '../types';
import { TrashIcon, ArrowLeftIcon, CartIcon as EmptyCartIcon } from '../components/icons';
import { PageTitle } from '../components/PageTitle';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useAppContext();
  const navigate = useNavigate();

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  const totalAmount = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <EmptyCartIcon className="h-24 w-24 text-gray-300 mb-6" /> {/* text-slate-300 to text-gray-300 */}
        <PageTitle title="Your Cart is Empty" />
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p> {/* text-slate-500 to text-gray-500 */}
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
      <PageTitle title="Your Shopping Cart" subtitle={`You have ${cart.length} item(s) in your cart.`} />
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50"> {/* bg-slate-50 to bg-gray-50 */}
              <tr>
                <th className="text-left font-semibold text-gray-600 p-4">Product</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-center font-semibold text-gray-600 p-4">Price</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-center font-semibold text-gray-600 p-4">Quantity</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-right font-semibold text-gray-600 p-4">Total</th> {/* text-slate-600 to text-gray-600 */}
                <th className="text-center font-semibold text-gray-600 p-4">Remove</th> {/* text-slate-600 to text-gray-600 */}
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="border-b border-gray-200 last:border-b-0"> {/* border-slate-200 to border-gray-200 */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-md shadow-sm" />
                      <div>
                        <Link to={`/products/${item.id}`} className="font-medium text-black hover:text-[#8F87F1]">{item.name}</Link> {/* text-slate-800 to text-black */}
                        <p className="text-xs text-gray-500">{item.category}</p> {/* text-slate-500 to text-gray-500 */}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-700">৳{item.price.toLocaleString()}</td> {/* text-slate-700 to text-gray-700 */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="px-2 py-1 border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50" disabled={item.quantity <= 1}>-</button> {/* border-slate-300, hover:bg-slate-100 */}
                      <input type="number" value={item.quantity} readOnly className="w-12 text-center border-t border-b border-gray-300 py-1 focus:outline-none" /> {/* border-slate-300 */}
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="px-2 py-1 border border-gray-300 rounded-r hover:bg-gray-100">+</button> {/* border-slate-300, hover:bg-slate-100 */}
                    </div>
                  </td>
                  <td className="p-4 text-right text-gray-700 font-medium">৳{(item.price * item.quantity).toLocaleString()}</td> {/* text-slate-700 to text-gray-700 */}
                  <td className="p-4 text-center">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-gray-700 p-1"> {/* text-red-500 to text-gray-500, hover:text-red-700 to hover:text-gray-700 */}
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {cart.map(item => (
            <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0"> {/* border-slate-200 to border-gray-200 */}
              <div className="flex items-start space-x-3 mb-3">
                <img src={item.imageUrl} alt={item.name} className="h-20 w-20 object-cover rounded-md shadow-sm" />
                <div className="flex-grow">
                  <Link to={`/products/${item.id}`} className="font-medium text-black hover:text-[#8F87F1] block mb-0.5">{item.name}</Link> {/* text-slate-800 to text-black */}
                  <p className="text-xs text-gray-500 mb-1">{item.category}</p> {/* text-slate-500 to text-gray-500 */}
                  <p className="text-sm text-gray-700">৳{item.price.toLocaleString()}</p> {/* text-slate-700 to text-gray-700 */}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-gray-700 p-1"> {/* text-red-500 to text-gray-500, hover:text-red-700 to hover:text-gray-700 */}
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="px-3 py-1.5 border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50 text-lg" disabled={item.quantity <= 1}>-</button> {/* border-slate-300, hover:bg-slate-100 */}
                  <input type="number" value={item.quantity} readOnly className="w-12 text-center border-t border-b border-gray-300 py-1.5 focus:outline-none" /> {/* border-slate-300 */}
                  <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="px-3 py-1.5 border border-gray-300 rounded-r hover:bg-gray-100 text-lg">+</button> {/* border-slate-300, hover:bg-slate-100 */}
                </div>
                <p className="text-md font-semibold text-black">৳{(item.price * item.quantity).toLocaleString()}</p> {/* text-slate-800 to text-black */}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"> {/* bg-slate-50 to bg-gray-50 */}
        <div>
           <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-sm font-medium text-[#8F87F1] hover:text-opacity-80 hover:text-[#8F87F1] transition-colors" // hover:text-[#7c71d0] to hover:text-opacity-80 hover:text-[#8F87F1]
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </div>
        <div className="text-right">
          <p className="text-lg text-gray-600">Subtotal: <span className="font-bold text-xl text-black">৳{totalAmount.toLocaleString()}</span></p> {/* text-slate-600 to text-gray-600, text-slate-800 to text-black */}
          <p className="text-xs text-gray-500 mt-1">Shipping & taxes calculated at checkout.</p> {/* text-slate-500 to text-gray-500 */}
          <button
            onClick={() => navigate('/checkout')}
            className="mt-4 w-full md:w-auto bg-[#8F87F1] hover:bg-opacity-90 hover:bg-[#8F87F1] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors text-lg" // hover:bg-[#7c71d0] to hover:bg-opacity-90 hover:bg-[#8F87F1]
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};