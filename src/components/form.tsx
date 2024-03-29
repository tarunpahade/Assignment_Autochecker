'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { XCircle } from 'react-feather'
import axios from 'axios'
import { assignments } from '@/types/interface'
import { RadioOptions } from './miniComponents/mini'
export const Form = ({ closeForm, getFormDetailsAndAppendData }: any) => {

    const { data: session } = useSession()

    const [nameOfAssignment, setnameOfAssignment] = useState('')
    const [description, setdescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(1); // Initialize state for the selected option


    const [sucessfullySentMail, setSucessfullySentMail] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const [userDetails, setUserDetails]: any = useState({
        college: 'Dummy College',
        department: 'CSE',
        university: 'Dummy University',
    })

    const [selectedOption3, setSelectedOption3] = useState<string | null | number>(null);

    const handleRadioChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption3(event.target.value);
    };




    const options2 = [
        { name: 'Image', disabled: false },
        { name: 'Pdf', disabled: false }
    ];
    const addAssignment = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setLoading(true)

        try {
            console.log(userDetails, 'this is user Details');

            setError(false)
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            const data: assignments = {
                name: nameOfAssignment,
                description,
                dateUploaded: formattedDate,
                submissionDate: dueDate,
                uploadedBy: session?.user.name!,
                semester: userDetails.semester,
                department: userDetails.department,
                subject: userDetails.subject!,
                uploadType: options2[selectedOption].name
            }
            console.log(selectedOption);
            

            if (selectedImage) {
                data.image = selectedImage
            }

const data2={
    ...data,

}
            const res = await axios.post('/api/users/assignment', data)
    data2._id=res.data.insertedId
            console.log(res);
            setLoading(false)
            setSucessfullySentMail(true)
            getFormDetailsAndAppendData(data2)
            closeForm()
        } catch (error: any) {
            console.log('Error while Adding Assignments', error);
            setError(true)
        }
    }
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form className='px-14 max-h-[80%] ' onSubmit={addAssignment}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <XCircle className='absolute right-8 top-10' onClick={closeForm} />
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        {loading ? (
                            <label className="block text-sm font-medium leading-6 text-gray-900">Loading</label>

                        ) : null

                        }

                        <div className="col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm   sm:max-w-md">
                                    <input required value={nameOfAssignment} onChange={(e) => setnameOfAssignment(e.target.value)} type="text" name="email" id="email" className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900  focus:ring-0 sm:text-sm sm:leading-6" placeholder="Create a Html Form" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Enter Description</label>
                            <div className="mt-2">
                                <textarea placeholder='A HTML form using html,css In Vscode editor.' value={description} onChange={(e) => setdescription(e.target.value)} id="about" name="about" rows={1} className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                        {/* <div className="col-span-full">
                            <label htmlFor="imageUpload" className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Image
                                <span className='text-gray-400'> (Optional) </span>
                            </label>
                            <div className="mt-2 col-span-full">
                                <div className="flex rounded-md shadow-sm sm:max-w-md">
                                    <input
                                        type="file" // Set the input required type to "file" for image upload
                                        accept="image/*" // Specify the accepted file types (images in this case)
                                        onChange={handleImageUpload} // Handle the change event
                                        name="imageUpload"
                                        id="imageUpload"
                                        className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {selectedImage && (
                                <div className="mt-4">
                                    <p>Image Preview:</p>
                                    <Image width={90} height={85} src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
                        </div> */}
                        <div className="col-span-full">
                            <RadioOptions options={options2} handleRadioChange={handleRadioChange2} selectedOption={selectedOption3} Title={'Select Upload type'} />
                        </div>
                        <div className="col-span-full flex justify-between">
                            <div className="w-1/2">
                                <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Due Date
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                                        <input required
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full flex justify-center">
                            <button type='submit' className="pointer-events-auto w-[90%] pl-[5%] pr-[5%] rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Add Assignment
                            </button>

                        </div>

                    </div>
                    {sucessfullySentMail === true ? <label className="block text-sm font-medium leading-6 mt-5">Assignment added successfully </label> :
                        null}
                    {error && <p className="border border-red-500 p-2 mt-4">Error while Adding Data</p>}



                </div>
            </div>
        </form>

    )
}
