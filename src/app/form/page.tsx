"use client"

import React, { useEffect, useState } from 'react'
import { formInfos } from '../Services/forms'

import { useRouter } from 'next/navigation'
import { FormProps, TravelProps } from '../Utils/types'
import toast from 'react-hot-toast'
import axios from 'axios'

const Form = () => {
    
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [travel, setTravel] = useState('')
    const [travelsList, setTravelsList] = useState<TravelProps[]>([])

    const { push } = useRouter()

     useEffect(() => {

      axios.get("https://127.0.0.1:8000/api/av/travel/index").then((res: any) => {
      setTravelsList(res.data["travel"]); 
      });     
       
    }, [])
    
function handleSubmit() {
        if (
            !lastname ||
            !firstname ||
            !phone ||
            !password ||
            !email ||
            !message ||
            !travel 
            
        ) {
            alert('merci de remplir tous les champs')
        } else {
            let formData = {
                lastname: lastname,
                firstname: firstname,
                phone: phone,
                password : password,
                email: email,
                message: message,
                travel: travel,
                status:1,
                id: 1
            }
            console.log(formData);
            formInfos(formData).then((res) => {
                console.log(formData)
                console.log(res.status)
                if (res.status === 200) {
                    toast.success('Demande envoyée')
                    push('/form')
                }
            })
        }
    }

return (
    <main className="bg-white">

      <h1 className="text-yellow-400 text-center pt-12 text-3xl font-bold">Formulaire de réservation</h1>

      <button
          type="submit" 
          onClick={() => {
          push(`/home`)
          }}
          className="flex text-center py-3 ml-16 border-2 border-gray-400 text-gray-400 hover:border-gray-500 focus:outline-none my-6 p-1"
          >Retour Accueil
       </button>
        
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded text-black w-full">
                            
                            <label className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Nom</label>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setLastname(e.target.value)}
                                name="lastname"
                                placeholder="Nom" />

                            <label  className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Prénom</label>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setFirstname(e.target.value)}
                                name="firstname"
                                placeholder="Prénom" />

                            <label className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Téléphone</label>    
                            <input 
                                type="tel"
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setPhone(e.target.value)}
                                name="phone"
                                placeholder="Téléphone" />

                            <label className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Email</label>    
                            <input 
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                placeholder="Email" />

                            <label className="inline-block w-40 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Mot de passe</label>    
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                placeholder="Mot de passe" />

                            <label className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Voyage</label>

                            <select 
                                required
                                className="block border border-grey-light w-full p-3 rounded mb-4 font-extralight text-gray-600"
                                onChange={(e) => setTravel(e.target.value)}
                            >
                                {travelsList &&
                                    travelsList.map(
                                        (travel: TravelProps) => {
                                        return (
                                            <option 
                                                key={travel.id}
                                                value={travel.id}
                                                
                                            >
                                              {travel.title_travel} du {new Date(travel.datestart_travel).toLocaleDateString('FR')} au {new Date(travel.dateend_travel).toLocaleDateString('FR')} - {travel.price_travel} €
                                            
                                            </option>
                                        )
                                    }
                                )}

                            </select>

                            <label className="inline-block w-20 mr-6 text-left 
                                 font-light text-gray-600 mt-4 pl-3">Message</label>  
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                onChange={(e) => setMessage(e.target.value)}
                                name="message"
                                placeholder="Souhaitez vous nous apporter des précisions ?" />
                            

                            <button
                                onClick={() => handleSubmit()}
                                type="submit"
                                className="w-full text-center py-3 bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none my-6"
                                >Envoyer ma demande
                            </button>
                            

                            
                        </div>

                    </div>
               

    </main>

)
}


export default Form