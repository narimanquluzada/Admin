
import axios from "axios";


export const LoginAdmin = async (admin)=>{
    const {data} = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUzoww3SMteRi0DbtEasSpgNEmue7-nIQ", 
       {email : admin.email, password : admin.password, returnSecureToken : true}
       );
       return data;
   }



   export const getData = async ()=>{
    const {data}= await axios.get( 'https://react-project-50ee5-default-rtdb.firebaseio.com/products.json');
const dataList=[]
    for(let key in data){
data[key].id=key
dataList.push(data[key])
    }
return dataList ;

}



export const Poststatus = async (product)=>{
    console.log(product);
    const data= await axios.put( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${product.id}.json`, 
    product
       );
       console.log(data);

       return data;
   }


   export const PostCategory= async (category)=>{
    const data= await axios.post( 'https://react-project-50ee5-default-rtdb.firebaseio.com/category.json', 
    category 
       );

       return data;
   }


   export const GetCategory = async () =>{
       const {data} = await axios.get('https://react-project-50ee5-default-rtdb.firebaseio.com/category.json');
       const categoryList=[]
    for(let key in data){
data[key].id=key
categoryList.push(data[key])
    }
       return categoryList;
   }


   export const DeleteCategory = async (id)=>{
    const data= await axios.delete( `https://react-project-50ee5-default-rtdb.firebaseio.com/category/${id}.json`);

       return data;
   }
   export const DeleteAltCategory = async (altkateqoriya)=>{
    for (let i = 0; i < altkateqoriya.length; i++) {
        const data= await axios.delete( `https://react-project-50ee5-default-rtdb.firebaseio.com/category/${altkateqoriya[i].id}.json`);

        return data;
    }
    }
   
    export const UpdateproductWithCatId = async (cat)=>{
        console.log(cat);
        let mainData= '';
        for (let i = 0; i < cat.length; i++) {
            const data= await axios.put( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${cat[i].id}.json`,cat[i]);
            mainData =data;
        }
        return mainData
      
        }
       



   export const getDatawithId = async (id)=>{
    const {data}= await axios.get( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${id}.json`);

    return data;
 
      
   }

   export const Postabout = async (product)=>{
    console.log(product);
    const data= await axios.put( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${product.id}.json`, 
    product
       );
   

       return data;
   }

