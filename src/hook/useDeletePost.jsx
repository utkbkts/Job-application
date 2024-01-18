import { arrayRemove, deleteDoc, doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

const useDeletePost = () => {
  const deletePostGet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const docRef = doc(db, "Blogs", id);
      await deleteDoc(docRef);

      const applyFormQuery = query(collection(db, "ApplyForm"), where("postId", "==", id));
      const applyFormSnapshot = await getDocs(applyFormQuery);

      applyFormSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      toast.success("Success", "Deleted successfully", "success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { deletePostGet };
};

export default useDeletePost;
