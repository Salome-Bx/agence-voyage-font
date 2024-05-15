'use client'

import { getTravelById } from '@/app/Services/travels'
import { SingleTravelProps } from '@/app/Utils/types'
import { useRouter } from 'next/navigation'
import  { useEffect, useState } from 'react'

const Page = ({params}: {params: {id: number} }) => {

    const [travelData, setTravelData] = useState<SingleTravelProps>()

    useEffect(() => {
        getTravelById(params.id).then((res) => {
           setTravelData(res)
           console.log(res)
        })
    }, [])

    const { push } = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 bg-white text-black">
            {travelData && (
                <div className="flex-col justifiy-center text-center">
                    <div>
                        <img
                            src={travelData.picture_travel}
                            className="object-contain w-screen max-h-96 rounded-md"
                        />
                        <h1 className="my-8 text-center font-bold text-3xl text-gray-500">
                            {travelData.title_travel}
                        </h1>
                    </div>

                    <div className="w-1/3 m-auto text-center justify-center">
                        <p className="my-1">
                                {travelData.AvCategory.map((category:any) => (
                                    <li className='text-yellow-400 font-bold list-none text-2xl' key={category.id}>{category.name_category}</li>
                                ))}  
                            </p>
                        <div className="grid grid-cols-2 grid-rows-1 text-gray-500 pt-1">
                            <div>
                                <p className="text-left my-1 text-xl font-extralight">
                                    du {new Date(travelData.datestart_travel).toLocaleDateString(
                                            'FR')} 
                                </p> 
                                <p className="text-left my-1 text-xl font-extralight">           
                                            au {new Date(travelData.dateend_travel).toLocaleDateString(
                                            'FR')}
                                </p>
                            </div>
                            <p className="my-1 text-xl font-semibold text-right">
                                    {travelData.price_travel} €
                            </p>
                            
                        </div>
                        <div className="flex my-8 text-center font-bold text-xl text-gray-800 m-1/3"> {travelData.description_travel}
                        </div>
                        <div className="pt-6 text-xl text-bold text-center text-gray-700">
                            <p className="text-ml text-bold text-center italic ">Cette destination vous tente ?</p> 
                            <p className=" text-sm text-semibold text-center">Faites-en nous part et nous nous occupons du reste.</p>
                            <button 
                                type="submit"
                                className="text-center py-2 mt-4 px-4 bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none m-1"
                                onClick={() => {
                                    push(`/form`)
                                    }}
                                
                                >
                                Nous Contacter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
  )
}
export default Page