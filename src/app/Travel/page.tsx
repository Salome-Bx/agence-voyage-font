
"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import { getAllTravels } from '../Services/travels'

const Travel = () => {
  const [travelsList, setTravelsList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const [filterCategory, setFilterCategory] = useState([])
  const { push } = useRouter()

  useEffect(() => {
      
      axios
      .get("https://127.0.0.1:8000/api/av/travel/index")
      .then((res: any) => {
        
        setTravelsList(res.data["travel"]);
        setCategoryList(res.data["categories"]);
      }); 
      
  }, [])

    function filterBy() {
        
        axios
        .get(`https://127.0.0.1:8000/api/av/travel/categoriesFilter/${categoryId}`)
        .then((res: any) => {
            
            setFilterCategory(res.data);
            
        });
    }

    function deleteFilter() {

         setFilterCategory([]);
    }


 return (
          
   
    

        <main className="flex min-h-screen flex-col items-center justify-between p-2 bg-white">

            <h1 className="my-4 text-2xl pt-10 font-bold text-gray-500">
                Tous nos voyages
            </h1>


            <div className="grid grid-cols-1 grid-rows-1 text-gray-500 pt-2" >
                <p className="text-sm inline text-gray-400 text-left pr-2 pb-2">Trier par :</p>
                
            <div className="text-sm flex-1 hover:font-bold font-semibold pb-2">Catégories
                <div>
                    {categoryList &&
                                categoryList.map((categories: any) => {
                                    return (
                                    
                                        <div key={categories.id}>
                                                
                                                    <input 
                                                    onChange={() => setCategoryId(categories.id)}
                                                    className="categories text-sm font-normal pt-1"
                                                    id={categories.id}
                                                    type="checkbox"
                                                    value={categories.name_category}
                                                    
                                                    />  
                                                    <label htmlFor={categories.id} className="pl-2 text-sm font-normal pt-1">{categories.name_category}</label>   
                                        </div>
                                    
                                    );
                                })}

                </div> 
            </div> 
                <div className="flex-col"> 
                    <button onClick={filterBy} className="border-2 border-gray-400 w-fit h-fit p-1 text-sm m-1">Appliquer le tri</button>
                    <button onClick={deleteFilter} className="border-2 border-gray-400 w-fit h-fit p-1 mt-1 text-sm m-1">Effacer les filtres</button>
                </div> 
            </div> 
            
           
            <div className="flex flex-raw items-center justify-center flex-wrap w-5/6 my-4"> 
                
                
                {filterCategory[0] ? filterCategory.map((travel: any) => {
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
                    })

    :  travelsList &&

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




