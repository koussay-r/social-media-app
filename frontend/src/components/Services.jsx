import React from 'react'
import s1 from "./../assets/s11.png"
import s2 from "./../assets/s22.png"
import s3 from "./../assets/s33.png"
import s4 from "./../assets/s44.png"
import s5 from "./../assets/s55.png"
import s6 from "./../assets/s66.png"
import {BiRightArrowAlt} from "react-icons/bi"
export default function Services() {
  const services=[
    {id:0,name:"Shared Hosting",logg:s1},
    {id:1,name:"Dedicated Hosting",logg:s2},
    {id:2,name:"Cloud Hosting",logg:s3},
    {id:3,name:"VPS Hosting",logg:s4},
    {id:4,name:"Wordpress Hosting",logg:s5},
    {id:5,name:"Domain Name",logg:s6},
  ]
  return (
    <div className='mt-24'>
      <p className='text-center text-[35px] font-bold '>Our Services</p>
      <div className='grid mt-12 gap-7 w-[90%] sm:w-[85%] mx-auto lg:grid-cols-2 xl:grid-cols-3'>
        {
          services.map(
            (service)=>{
              return(
                <div key={service.id} className='border group p-10  shadow rounded block mx-auto' >
                  <div className='bg-[#03a7d3] block mx-auto rounded-full w-fit p-3 transition-all duration-300 group-hover:bg-[#ff4646]'>
                  <img src={service.logg} className=' h-[40px]  w-[40px]'/>
                    </div>
                  <p className='text-center font-bold text-[25px] mt-3 mb-3'>{service.name}</p>
                  <p className='text-center mb-3'>
                  Generators on the Internet tend to repeat predefined chunks as necessary
                  </p>
                  <div className='flex cursor-pointer justify-center'>
                  <p className='text-center font-semibold text-[#03a7d3] '>Read More</p>
                  <BiRightArrowAlt size={"20"} className='mt-[4px] font-semibold text-[#03a7d3] ml-2'/>
                    </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}
