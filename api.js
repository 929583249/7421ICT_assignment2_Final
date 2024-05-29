// api.js
// export const fetchCategories = async () => {
//     const response = await fetch('https://fakestoreapi.com/products/categories');
//     return await response.json();
//   };
  
// api.js
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data; // 假设这里直接返回分类数据数组
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};







  export const fetchProductsForCategory = async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await response.json();
  };
  
  export const fetchProductDetails = async (productId) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    return await response.json();
  };
  