import React from "react";
import banner from "../assets/images/Paan-Corner.webp";
import mobilebanner from "../assets/images/mobileBannerSigret.avif";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/ValidUrlConvert";
import {useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from "../component/CategoryWiseProductDisplay";

const Home = () => {

  const navigate = useNavigate()
   
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
 
  const categoryData = useSelector(state => state.product.allCategory)
  const SubcategoryData = useSelector(state => state.product.allSubCategory)


 

  const handleRedirectProductListPage = (id , name)=>{
          const subCategory = SubcategoryData.find(sub => {
              const  filterData = sub.category.some(c => {
                return c._id == id
              })

              return filterData ? true : null
          }) 

        
          const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory.name)}-${subCategory._id}`

          navigate(url)
  }

   

   return(
    <section className="bg-white">
    <div className='container mx-auto '>
        <div className={`w-full h-full p-2  min-h-36 bg-white-100 rounded ${!banner && "animate-pulse "} overflow-hidden`}>
             <img src={banner}
             className="w-full h-full hidden lg:block"
              alt="banner" />

             <img src={mobilebanner}
                className="w-full h-full lg:hidden "
              alt="banner" />
        </div>
    </div>

  <div className="container mx-auto px-4 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
  {loadingCategory ? (
    new Array(12).fill(null).map((c, index) => {
      return(
          <div
            key={`skeleton-${index} + "nullArray"`}
            className="bg-white grid gap-2 rounded p-4 min-h-36 shadow animate-pulse"
          >
            <div className="bg-blue-100 min-h-24 rounded"></div>
            <div className="bg-blue-100 h-8 rounded"></div>
          </div>
      )
     })
  ) : (
    categoryData.map((el, index) => 
      {
        return (
          <div key={el._id + "allCategoryData" || item.id} className="w-full h-full" onClick={()=>handleRedirectProductListPage(el._id , el.name)}>
            <div >
              <img
                className="w-full h-full object-scale-down "
                src={el.image}
                alt={el.name || `Category ${index}`}
              />
            </div>
     
          </div>
        );
      })
    
  )}
   </div>

   {/* display category product */}

   {
      categoryData.map((c , index)=>{
        return(
           <CategoryWiseProductDisplay key={index + "categoryWiseProduct"} id={c?._id} name= {c?.name}/>
        )
      })
   }

  

  </section>
  
   )

  
};

export default Home;
