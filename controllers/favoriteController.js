import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const addToFavorites = async (restaurantData) => {
  try {
    const userFavoritesRef = doc(
      db,
      `user/${auth.currentUser.email}/favorites`,
      restaurantData.id
    ); // Assuming 'name' is unique for each restaurant

    // Set the restaurant data to the specified document
    await setDoc(userFavoritesRef, restaurantData);

    console.log("Restaurant added to favorites successfully!");
  } catch (error) {
    console.error("Error adding restaurant to favorites: ", error);
  }
};

// Function to remove a restaurant from a user's favorites
export const removeFromFavorites = async (restaurantId) => {
  try {
    const userFavoritesRef = doc(
      db,
      `user/${auth.currentUser.email}/favorites`,
      restaurantId
    );

    // Delete the specified document from the favorites collection
    await deleteDoc(userFavoritesRef);

    console.log("Restaurant removed from favorites successfully!");
  } catch (error) {
    console.error("Error removing restaurant from favorites: ", error);
  }
};
