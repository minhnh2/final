import { useStatevalue } from 'context/StateProvider';
import React, { useEffect } from 'react'
import { deleteItems, getAllFoodItems, saveItem } from '../utils/firebaseFunction'

const EditItems: React.FC = () => {
    const [{ foodItems }, dispatch] = useStatevalue();
    // const handleSave = () => {
    //     const data = {
    //         id: foodItems.id,
    //         imageURl: foodItems.imageURL,
    //         category: foodItems.category,
    //         calories: foodItems.calories,
    //         price: foodItems.price,
    //         title: foodItems.title
    //     }
    //     saveItem(data)
    // }
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        deleteItems(event.currentTarget.id)
        // getAllFoodItems()
    }
    useEffect(() => { }, [foodItems])
    return (
        <table className='w-[100vw]'>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Calories</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {foodItems && foodItems.map((n) => (
                    <tr key={n.id} id={n.id} >
                        <td>
                            <img src={n.imageURL} alt={n.title} className="w-10 h-10" />
                        </td>
                        <td>
                            <p>{n.title}</p>
                        </td>
                        <td>
                            <p>{n.category}</p>
                        </td>
                        <td>
                            <p>{n.calories}</p>
                        </td>
                        <td>
                            <p>{n.price}</p>
                        </td>
                        <td>
                            <button

                                className='py-1 px-2 bg-yellow-500 text-lg text-white rounded-lg mr-2'>Edit</button>
                            <button
                                id={n.id}
                                onClick={handleDelete}
                                className='py-1 px-2 bg-red-600 text-lg text-white rounded-lg'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default EditItems