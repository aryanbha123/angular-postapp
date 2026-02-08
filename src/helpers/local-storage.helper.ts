/**
 * A helper object for safe access to `localStorage`.
 * It checks for the availability of `localStorage` and handles potential errors.
 */
export const localStorageHelper = {
  /**
   * Retrieves an item from `localStorage`.
   * @param key The key of the item to retrieve.
   * @returns The item's value, or `null` if the item does not exist or `localStorage` is not available.
   */
  getItem: (key: string): string | null => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
    return null;
  },
  /**
   * Adds an item to `localStorage`.
   * @param key The key of the item to add.
   * @param value The value of the item to add.
   */
  setItem: (key: string, value: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  },
  /**
   * Removes an item from `localStorage`.
   * @param key The key of the item to remove.
   */
  removeItem: (key: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  },
  /**
   * Clears all items from `localStorage`.
   */
  clear: (): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
    } catch (e) {
      console.error('Error accessing localStorage', e);
    }
  }
};
