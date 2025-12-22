import Axios from "../utils/Axios"
import SummaryApi from "../common/SymmaryApi"
const uploadImage = async(image) => {
  try {
    const formData = new FormData()
    formData.append("image", image)
     
     const reponse = await Axios({
         ...SummaryApi.uploadImage,
         data: formData 
     })

     return reponse
  } catch (error) {
    return error
  }
}
export default uploadImage