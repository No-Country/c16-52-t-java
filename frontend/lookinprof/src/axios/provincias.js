import axios from "axios";

export const getAllProvince = async () => {
    try {
        const provincesRes = await axios.get("http://localhost:8080/provinces/get");
        return provincesRes.data;
    } catch (error) {
        console.log(error)  
    }
}
