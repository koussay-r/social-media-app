import React from 'react'
import computer from "./../assets/about-img.png"
export default function About() {
  return (
    <div className='lg:flex pb-24 gap-24 b w-[90%] lg:w-[85%] mx-auto mt-24'>
        <div className=' pt-16 block mx-auto '>
            <p className='text-[35px] font-bold mb-5 '>About Us</p>
            <p className='text-gray-400 font-semibold '>Words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks </p>
            <button className='lg:text-[15px] mt-9 text-[12px] transition-all duration-300 hover:text-[#ff4646] hover:bg-transparent  bg-[#ff4646] rounded px-12 lg:px-16 font-semibold py-3 border border-[#ff4646] text-white'>Read More</button>
        </div>
        <img src={computer} className='xl:w-[550px] block mx-auto md:w-[550px] md:h-[400px] w-[350px] mt-16 lg:mt-0 lg:w-[500px] lg:h-[350px] h-[250px] xl:h-[400px] '/>
    </div>
  )
}
