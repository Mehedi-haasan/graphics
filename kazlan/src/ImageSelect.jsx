import React from "react";

const ImageSelect = ({ handleImageChange, imageFile, logo, reset }) => {
    return <div className="bg-[#FFFFFF] rounded-lg w-full">
        <div className="flex justify-start items-center gap-5 px-6">
            <div>
                <img src={imageFile ? imageFile : logo} alt="Preview" className="w-28 h-28 object-cover rounded-lg border border-red-500 p-1" />
            </div>
            <div>
                <div className='flex justify-start items-center gap-2 pt-4'>
                    <div className='border border-blue-400 rounded-lg px-4 py-1'>
                        <label>
                            <h1 className="pt-1 pb-1 text-blue-400 font-thin">Browse</h1>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <button onClick={reset} className='border rounded-lg px-4 py-1'>
                        <h1 className="font-thin py-1 text-[#6B7280]">Reset</h1>
                    </button>

                </div>
                <p className='font-thin py-1 text-sm'>Allowed JPG, GIF or PNG. Max size of 1MB</p>
            </div>
        </div>
    </div>
}

export default ImageSelect