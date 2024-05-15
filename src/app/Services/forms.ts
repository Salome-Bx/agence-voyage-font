import axios from "axios"
import { FormProps } from '../Utils/types'

export async function formInfos(formProps: FormProps) {
  let url = `https://127.0.0.1:8000/api/av/form`
  

  let axiosConfig = {
    headers: {
      'content-type': 'application/json',
    },
  }

  
  return axios
    .post(
      url,
     
      {
        lastname_user: formProps.lastname,
        firstname_user: formProps.firstname,
        phone_user: formProps.phone,
        email: formProps.email,
        password: formProps.password,
        message_form: formProps.message,
        travel:formProps.travel,
        status:formProps.status,
        id: formProps.id
      },
      
      axiosConfig
    )
    .then((res) => {
            return res
    })

}

