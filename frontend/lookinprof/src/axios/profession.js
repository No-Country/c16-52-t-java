import axios from "axios"

const url = "http://localhost:8080/profession/"


export const getProfession = async () => {
    try {
        const response = await axios.get(`${url}get`)
    } catch (error) {
        console.log(error)
    }
}

export const getProfessionById = async (id) => {
    try {
        const response = await axios.get(`${url}get/${id}`)
    } catch (error) {
        console.log(error)
    }
}