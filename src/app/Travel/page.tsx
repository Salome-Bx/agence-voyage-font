
"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import { getAllTravels } from '../Services/travels'

const Travel = () => {
  const [travelsList, setTravelsList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const { push } = useRouter()

  useEffect(() => {

      
      axios.get("https://127.0.0.1:8000/api/av/travel/index").then((res: any) => {
      setTravelsList(res.data);
      setCategoryList(res.data);
      console.log(travelsList);
      console.log(res.data);
      
      });     
       
    }, [])


 return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2 bg-white">

            <h1 className="my-4 text-2xl pt-10 font-bold text-gray-500">
                Tous nos voyages
            </h1>

            

            <div className="grid grid-cols-4 grid-rows-1 text-gray-500 pt-1" >
                <p className="text-sm inline pt-1 text-gray-400">Trier par :</p>
                <button className="text-lg flex-1 hover:font-bold hover:text-yellow-400">Catégories</button> 
                <button className="flex-1 text-lg hover:font-bold hover:text-yellow-400">Pays</button> 
                <button className="text-lg flex-1 hover:font-bold hover:text-yellow-400">Voyages</button>
            </div> 

            <div className="flex flex-raw items-center justify-center flex-wrap w-5/6 my-4"> 
                {travelsList &&
                    travelsList.map((travel: any) => {
                        return (
                            <div
                                key={travel.id}
                                className="flex relative m-6 w-2/5 h-56 rounded-md text-white hover:cursor-pointer hover:saturate-150"
                            >
                                <img src={travel.picture_travel} className="flex absolute w-full h-56 object-cover rounded-t-md " onClick={() => {
                                        push(`/Travel/view/${travel.id}`)
                                    }}/>
                       

                                <div className="bg-black flex w-full bg-opacity-60 absolute pl-4 pt-2 pb-4 top-28">
                                    <div className="TitleAndDate flex flex-col w-3/4">
                                        <h3 className="flex w-full text-left py-1 text-2xl">
                                            {travel.title_travel}
                                        </h3>

                                        <p className="flex text-left text-sm italic font-light">
                                            du {new Date(travel.datestart_travel).toLocaleDateString('FR')} au {new Date(travel.dateend_travel).toLocaleDateString('FR')}
                                        </p>
                                    </div>

                                    <div className="CategoryAndPrice">

                                        {travel.AvCategory.map((category: any) => (
                                            <div className="Category flex px-2 pt-1" >
                                                <p className="flex text-right text-sm text-yellow-400" key={category.id}>
                                                    {category.name_category}
                                                </p>
                                            </div>
                                        ))}
                                    
                            

                                        <div className="Price flex">
                                            <p className="text-right py-1 text-2xl">
                                            {travel.price_travel} €
                                            </p>
                                        </div>
                                    </div>
                                    


                                  
                                </div>
                            </div>
                        )
                    })}
            </div>
            <button
                type="submit" 
                onClick={() => {
                    push(`/home`)
                }}
                className="flex text-center py-3 border-2 border-gray-400 text-gray-400 hover:border-gray-500 focus:outline-none my-6 p-1"
                >Retour Accueil
            </button>
            
        </main>
    )

}

export default Travel;




