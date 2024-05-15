export interface TravelProps  {
    id: number
    title_travel: string
    picture_travel: string
    description_travel: string
    datestart_travel: string
    dateend_travel: string
    price_travel: number
    AvCategory:{
        id:string 
        name_category:string
    }
}

export type SingleTravelProps = {
    id:number
    title_travel: string
    picture_travel: string
    description_travel: string
    datestart_travel: string
    dateend_travel: string
    price_travel: number
    AvCategory:{
        id:string 
        name_category:string
    }
}

export interface FormProps {
    lastname: string
    firstname: string
    phone:number
    email: string
    password: string
    message:string
    travel:string
    status:number
    id:number
}