export const getUserIdFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { userId } = JSON.parse(userData);
      return userId;
    }
    return null;
  };
  