/**
 * Debounces a function, ensuring it is not called until after a specified delay has elapsed since the last time it was
 * invoked.
 *
 * @param {Function} fn - the function to debounce
 * @param {number} delay - the delay in milliseconds
 * @returns {function(...[*]): Promise<unknown>} - the output of the function
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => new Promise((resolve, reject) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        resolve(fn(...args));
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};