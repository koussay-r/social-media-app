import React from 'react'
import slider from "./../assets/slider-img.png"
export default function Home() {
  return (
    <div className='bg-[#020230] h-[100hv] pt-16 gap-24 lg:justify-center block mx-auto lg:flex'>
        <div className='lg:w-[38%] block mx-auto  lg:mt-[100px]'>
            <p className=' text-center  text-white font-oswald text-4xl font-bold'>Fast & Secure<br/>
Web Hosting </p>
<p className=' text-center px-1 text-white font-semibold mt-5'> Anything embarrassing hidden in the middle of text. All the Lorem Ipsuanything embarrassing hidden in the middle of text. All the Lorem Ipsumm
</p>
<div className='flex justify-center lg:justify-normal mt-5 gap-5'>
    <button className='lg:text-[15px] text-[12px] transition-all duration-300 hover:text-[#03a7d3] hover:bg-transparent  bg-[#03a7d3] rounded px-12 lg:px-16 font-semibold py-3 border border-[#03a7d3] text-white'>Read More</button>
    <button className='lg:text-[15px] text-[12px] transition-all duration-300 hover:text-[#ff4646] hover:bg-transparent  bg-[#ff4646] rounded px-12 lg:px-16 font-semibold py-3 border border-[#ff4646] text-white'>Contact Us</button>
</div>
        </div>
        <img src={slider} className='lg:w-[440px] mt-10 lg:mt-0  h-[390px] w-[390px] lg:h-[440px]'/>
    </div>
  )
}
