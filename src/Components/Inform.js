import {useState,useEffect} from 'react'
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getDatawithId,Postabout } from '../Api/api';


function Inform() {
  let {id} = useParams();
  const Navigate =useNavigate()
  const { isLoading, error, data } = useQuery(['Products', id], () => getDatawithId(id))
  console.log(data);
  const [product,setProduct] = useState(data)
  

  useEffect(()=>{
setProduct(data)

  },[data])

 

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;


  
  
    
  return (
 <div>
  <div className='container mt-5'>
    <div className="row">
      <div className="col-6 offset-3">
      <Formik
       initialValues={
           {
        about:"",
        
        }
        }
     
       onSubmit={async (values) => {
         console.log(values);
        product.about = values.about;
         const postnewabout= await Postabout(product);
         Navigate('/list')
      
       }}
     >
       {({
         values,
         handleChange,
         handleSubmit,
      
       }) => (
      <form onSubmit={handleSubmit}>
     <textarea name="about" cols="60" rows="10" value={values.about} onChange={handleChange}></textarea>
    <div> <button className='btn btn-success ' type='submit'>Send</button></div>
   </form>
      )}
    </Formik>
      </div>
    </div>
  </div>
 </div>
  );
}


export default Inform