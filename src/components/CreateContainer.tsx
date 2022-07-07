import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { Categories } from '../utils/data'
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebase.config';
import { getAllFoodItems, saveItem } from '../utils//firebaseFunction';
import { useStatevalue } from 'context/StateProvider';
import { actionType } from 'context/reducer';
import EditItems from './EditItems'
import EditOder from './EditOder';



function CreateContainer() {
    const [title, setTitle] = React.useState<string>("");
    const [calories, setCalories] = React.useState<any>("");
    const [price, setPrice] = React.useState<any>(null);
    const [imageAsset, setImageAsset] = React.useState<any>(null);
    const [category, setCategory] = React.useState<string>("");
    const [fields, setFields] = React.useState<boolean>(false);
    const [alertStatus, setAlertStatus] = React.useState<string>("danger");
    const [msg, setMsg] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [show, setShow] = React.useState<boolean>(true);

    const [{ }, dispatch] = useStatevalue();



    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Image/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg('Try uploading again');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false)
                }, 4000);

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setMsg('Upload Successfully');
                    setAlertStatus('done');
                    setTimeout(() => {
                        setFields(false)
                    }, 4000);

                })
            } // if nothing happend
        )
    }
    const clearData = () => {
        setTitle('');
        setImageAsset(null);
        setCalories('');
        setPrice('');
        setCategory('Select Category')
    }

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            })
        })

    }

    const deleteImg = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('Delete Successfully');
            setAlertStatus('done');
            setTimeout(() => {
                setFields(false);

            }, 4000);
        })
    }

    const saveDetails = () => {
        setIsLoading(true);
        try {
            if (!title && !calories && !imageAsset && !price && !category) {
                setFields(true);
                setMsg('Required fields can not be empty !');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false)
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    quantities: 1,
                    price: price

                }
                saveItem(data);
                setIsLoading(false)
                setFields(true);
                setMsg('Upload Successfully');
                clearData()
                setAlertStatus('succsess');
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg('Try uploading again');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false)
            }, 4000);


        };
        fetchData();
    }

    return (<>

        <div className='w-full min-h-screeen flex items-center justify-center md:mt-20    '>
            <div className='w-[90%] md:w-[75%] border font-semibold border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center '>
                {
                    fields && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`w-full p-2 rounded-lg text-center ${alertStatus === 'danger' ? 'bg-red-500 text-red-800 ' : 'bg-emerald-500 text-emerald-800'
                                }`}>
                            {msg}
                        </motion.p>
                    )
                }
                <div className='w-full py-2 border-gray-300 flex items-center gap-2'>
                    < MdFastfood className='text-xl text-gray-700 mr-4 ' />
                    <input type='text'
                        required value={title}
                        placeholder='Enter this ...'
                        className=' w-full h-full text-lg bg-transparent font-semibold pl-4 outline-none border-none py-1'
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='w-full '>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='outline-none w-full text-base border-b-2 border-gray-200 rounded-md cursor-pointer gap-4'
                    >
                        <option value='other' className='bg-white'>Select Category</option>
                        {Categories && Categories.map(item => (
                            <option
                                key={item.id}
                                className='text-base border-0 outline-none capitalize bg-white text-headingColor cursor-pointer '
                                value={item.urlParaName}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='group mt-10 flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
                    {isLoading ? <Loader /> : <>
                        {!imageAsset ? <>
                            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col items-center justify-center'>
                                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                                    <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
                                </div>
                                <input
                                    type='file'
                                    name='uploadImage'
                                    accept='image/*'
                                    onChange={uploadImage}
                                    className='w-0 h-0'
                                />
                            </label>
                        </> : (
                            <>
                                <div className='relative h-full'>
                                    <img src={imageAsset} alt='upload image' className='w-full h-full object-conver' />
                                    <button
                                        type='button'
                                        className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                                        onClick={deleteImg}
                                    >
                                        <MdDelete className='text-white' />
                                    </button>
                                </div>
                            </>
                        )}

                    </>}
                </div>
                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdFoodBank className='text-gray-700' />
                        <input
                            type='text'
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            required
                            placeholder=' Calories'
                            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
                        />
                    </div>
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdAttachMoney className='text-gray-700' />
                        <input
                            type='text'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder=' Price'
                            className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400'
                        />
                    </div>
                </div>
                <div className='flex w-full items-center'>
                    <button
                        type='button'
                        className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold '
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
        <div>

        </div>
        <div className='flex w-full items-center justify-center '>
            <span className={show ? 'text-orange-600' : ''}
                onClick={() => setShow(true)}
            >Edit Items</span>
            <span className={!show ? 'text-orange-600' : ''}
                onClick={() => setShow(false)}
            >Edit Orders</span>

            {show ? (
                <EditItems />

            ) : (
                <EditOder />
            )}
        </div>


    </>
    )
}

export default CreateContainer