import React from "react";

const ImageSelect = ({ handleImageChange, imageFile, image_url, logo, reset }) => {
    return <div className="bg-[#FFFFFF] rounded-lg w-full">
        <div className="flex justify-start items-center gap-5">
            <div>
                <img src={imageFile ? imageFile : logo} alt="Preview" className="w-56 h-56 object-cover rounded-lg border border-red-500 p-1" />
            </div>
            <div>
                <div className='flex justify-start items-center gap-2 pt-4'>
                    <div className='border border-blue-400 rounded-lg px-4 py-1 cursor-pointer'>
                        <label className="cursor-pointer">
                            <h1 className="pt-1 pb-1 text-blue-400 font-thin cursor-pointer">Browse</h1>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden cursor-pointer"
                            />
                        </label>
                    </div>
                    <button onClick={reset} className='border rounded-lg px-4 py-1'>
                        <h1 className="font-thin py-1 text-[#6B7280]">Reset</h1>
                    </button>

                </div>
                <p className='font-thin py-1 text-sm'>Allowed JPG, GIF or PNG. Max size of 10MB</p>
                <p className='font-thin py-1 text-sm'>Before Compresed your file size is {(image_url?.size / 1024).toFixed(2)}KB</p>
            </div>
        </div>
    </div>
}

export default ImageSelect