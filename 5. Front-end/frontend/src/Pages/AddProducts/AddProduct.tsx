import './AddProduct.css'

export default function AddProduct() {
    return (
        <>
            <div className="w-screen h-screen gap-10 bg-linear-to-t from-bg-primary via-bg-secondary from-10% via-30% to-60% to-bg-terciary flex-col flex justify-center items-center">
                <p className='font-sans font-bold text-5xl'>NEW PRODUCT</p>
                <div className="bg-white p-10 rounded-2xl flex flex-col gap-8">
                    <input type="text" placeholder='Product Name' className=' p-2 border-0 border-b focus:border-bg-primary focus:outline-none transition w-100' />
                    <input type="text" placeholder='Price' className='border-0 p-2 border-b focus:border-bg-primary focus:outline-none transition w-100' />
                    <input type="text" placeholder='Stock' className='border-0 p-2 border-b focus:border-bg-primary focus:outline-none transition w-100' />
                    <button className='p-2 bg-bg-primary '>Submit</button>
                </div>
            </div>
        </>
    )
}