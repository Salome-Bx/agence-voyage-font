"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormProps, TravelProps } from '../Utils/types'

import axios from 'axios'



export const home = () => {

    const { push } = useRouter()
    const [travelsList, setTravelsList] = useState([])

    useEffect(() => {

      
      axios.get("https://127.0.0.1:8000/api/av/travel/index").then((res: any) => {
      setTravelsList(res.data); 
      console.log(travelsList);
      console.log(res.data);
      
      });     
       
    }, [])





    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-2 bg-white">
            <div>
                <div className="flex items-center justify-center flex-wrap w-5/6 my-4 m-auto text-center" >
                    <h2 className="text-gray-500 text-xl font-semibold pt-6 flex w-full text-center justify-center">Notre philosophie</h2>
                    <p className="text-gray-500 text-m pt-2 flex w-full text-center justify-center">AllTravels est une agence de voyage unique en son genre. Nous organisons tout pour vous, vous n'avez qu'à réserver.</p>

                    <button 
                        type="submit"
                        className="text-center py-3 px-4 border-4 text-yellow-400 border-yellow-400 hover:text-yellow-500 focus:outline-none m-5"
                        onClick={() => {
                            push(`/Travel`)
                            }}
                        
                        >
                        Tous nos voyages
                    </button>
                </div>

                <h2 className="text-yellow-400 text-xl font-bold pt-8 text-center">Nouveautés</h2>

                <div className="flex items-center justify-center flex-wrap w-5/6 my-4 m-auto">

                    {travelsList &&
                        travelsList
                     
                        .sort((a, b) => b.id - a.id) // Trie la liste par ordre décroissant de id
                        .slice(0, 4) // Sélectionne les 4 premiers éléments après le tri
                        .map((travel: any) => {
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
                                    <div className="Price flex">
                                        <p className="text-right py-1 text-2xl">
                                           {travel.price_travel} €
                                        </p>
                                    </div>
                                  
                                </div>
                            </div>
                            )
                        })}
                </div>

                <div  className="flex items-center justify-center flex-wrap w-5/6 my-4 m-auto text-center">
                    <h2 className="text-gray-500 text-xl italic font-semibold pt-8 block w-full">Envie de voyager ?</h2>
                    <p className="text-gray-500 text-m pt-4  w-full">Dites nous quel voyage vous fait rêver, nous nous occupons du reste.</p>
                    <button 
                        type="submit"
                        className="text-center py-4 px-4 mb-12 bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none m-3"
                        onClick={() => {
                            push(`/form`)
                            }}
                        
                        >
                        Nous Contacter
                    </button>
                </div>
            </div>
        </main>
    )
      

}
export default home