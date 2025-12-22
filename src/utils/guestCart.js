// 👉 Get guest cart
export const getGuestCart = () => {
  return JSON.parse(localStorage.getItem("guestCart")) || [];
};

// 👉 Add item to guest cart
export const addToGuestCart = (productId) => {
  let cart = getGuestCart();

  const index = cart.findIndex(
    (item) => item.productId === productId
  );

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  localStorage.setItem("guestCart", JSON.stringify(cart));
};

// 👉 Remove item
export const removeFromGuestCart = (productId) => {
  let cart = getGuestCart().filter(
    (item) => item.productId !== productId
  );
  localStorage.setItem("guestCart", JSON.stringify(cart));
};

// 👉 Clear guest cart
export const clearGuestCart = () => {
  localStorage.removeItem("guestCart");
};
