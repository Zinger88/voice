import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export const useLogout = () => {

    const logout = async () => {
        try {
            await signOut(firebaseAuth);
            console.log("user logged out")
        } catch (error) {
            console.log(error.message);
        }
    };

    return { logout };
};
