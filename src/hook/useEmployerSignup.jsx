import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import toast from "react-hot-toast";
import { addDoc, collection, doc, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const useEmployerSingup = () => {
    const router = useRouter()
  const EmployerSignup = async (data) => {
    if (!data.email || !data.password || !data.name) {
      toast.error("Error", "Please fill all the fields", "error");
      return;
    }
    // Küçük harfe çevirme ve boşlukları silme işlemleri
    const formattedTitle = data.name.toLowerCase().trim();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (!response) {
        toast.error("Something went wrong");
        return;
      }
      if (response) {
        const userDoc = {
          uid: response.user.uid,
          email: data.email,
          companyName: data.companyname,
          name: formattedTitle,
          role:"ADMIN",
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, "admin", response.user.uid), userDoc);
        await updateProfile(response.user, {
          displayName: formattedTitle,
        });
        localStorage.setItem("user-Admin", JSON.stringify(userDoc));
        toast.success("Successfully create")
        router.push("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return { EmployerSignup };
};

export default useEmployerSingup;
