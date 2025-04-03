import { memo } from "react";
import { useCartStore } from "../store/useCartStore";

const CartSidebar = memo(() => {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside className="w-64 p-4 border-r border-gray-200 h-screen sticky top-0 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4">Cart</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="text-sm">
              <div className="flex justify-between">
                <span>
                  {item.title.slice(0, 15)} × {item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
              <div className="text-xs text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-semibold">Total: ${total.toFixed(2)}</div>
    </aside>
  );
});

export default CartSidebar;
