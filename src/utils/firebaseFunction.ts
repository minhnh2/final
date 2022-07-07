// saving new items

import { async } from "@firebase/util";
import { fireStore } from "firebase.config"
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"


export const saveItem = async (data) => {
    await setDoc(doc(fireStore, 'foodItems', `${Date.now()}`), data, { merge: true })
};

export const saveOrder = async (data) => {
    await setDoc(doc(fireStore, 'orders', `${Date.now()}`), data, { merge: true })
};



export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(fireStore, 'foodItems'), orderBy("id", "desc"))
    )
    return items.docs.map((doc) => doc.data())

}


export const deleteItems = async (id: string) => {
    await deleteDoc(doc(fireStore, 'foodItems', id))
}
// export default saveItem