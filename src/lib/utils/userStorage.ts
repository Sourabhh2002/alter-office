export const getUserDetails = () => {
  const userDetailsStr = sessionStorage.getItem("userDetails");
  if (userDetailsStr) {
    try {
      return JSON.parse(userDetailsStr);
    } catch (error) {
      console.error("Error parsing userDetails from sessionStorage:", error);
      return null;
    }
  }
  return null;
};

export const updateUserDetails = (updates: Partial<any>) => {
  // Get existing user details or create empty object if none exists
  const existingDetails = getUserDetails() || {};

  // Merge the existing details with the updates
  const updatedDetails = { ...existingDetails, ...updates };

  // Store updated object back to sessionStorage
  sessionStorage.setItem("userDetails", JSON.stringify(updatedDetails));

  console.log("User details updated in sessionStorage:", updatedDetails);
  return updatedDetails;
};
