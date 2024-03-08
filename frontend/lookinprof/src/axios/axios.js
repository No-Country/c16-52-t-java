import axios from 'axios'

export const getUser =async()=>{
    try {
        const response = await axios.get('http://localhost:8080/user/'    )
        return response
    } catch (error) {
        console.error(error)
        
    }
}


export const LoginUser = async (username, password)=>{
    try {
        const response = await axios.post('http://localhost:8080/auth/login',(
            username,
            password
        ))
        return response
    } catch (error) {
        console.log(error)
    }
}