import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import swal from "sweetalert";
import { PostCategory,GetCategory } from "../Api/api";
import "../../src/App.css";
import { DeleteCategory,DeleteAltCategory ,getData,UpdateproductWithCatId} from "../Api/api";


function CategoryAdd() {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      category: "",
      topMenu:0,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const data = await PostCategory(values);
      swal({
        title: "Ugurlu emeliyyat!",
        text: "Kateqoriyaniz ugurla elave edildi. ",
        icon: "success",
        button: "Ok!",
      });

      resetForm((values = { category: "" }));
    },
  });

  const { isLoading, error, data } = useQuery("repoData", GetCategory);
  const [category,setCategory] = useState(data);
  const { data: dataR, error: errorR, loading: loadingR } = useQuery("returnproduct", getData);
  console.log(dataR);



  useEffect(()=>{
    setCategory(data)
    
      },[data])
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;



  
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;



  const Delete =(id) => {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        let categorys = category.filter((item)=>{
          return item.id == id
          
        });
        console.log(categorys);
        
        if (categorys[0].topMenu == 0) {
          console.log('if isledi');
         DeleteCategory(id)
         const altkateqoriya = category.filter((item)=>{
           return item.topMenu == id
        });
        DeleteAltCategory(altkateqoriya);
     
        const Stkateqoriya = category.filter((item)=>{
         return item.topMenu != id && item.id != id
      });
      setCategory(Stkateqoriya);
     
     const upProductWithMainCategory = dataR.filter((item)=>{
       return id == item.mainCategory
     })
     
     
     for (let i = 0; i < upProductWithMainCategory.length; i++) {
       upProductWithMainCategory[i].status = 0;
      
     }
     console.log(upProductWithMainCategory);
     
     UpdateproductWithCatId(upProductWithMainCategory);
        
       }else{
         DeleteCategory(id);
         let Atcategorys = category.filter((item)=>{
           return item.id != id
           
         });
         setCategory(Atcategorys);
         const upProductWithdownCategory = dataR.filter((item)=>{
           return id == item.downCategory
         })
         for (let i = 0; i < upProductWithdownCategory.length; i++) {
           upProductWithdownCategory[i].status = 0;
          
         }
         UpdateproductWithCatId(upProductWithdownCategory);
      
      
     
       }
       
      } 
    });
  
  
  }

 
  return (
    <div>
      <div className="container">
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Kind</th>
                <th scope="col">Operation</th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    id="Add"
                  >
                    Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
                {
                  category &&
                  category.map((item,i)=>(
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{item.category}</td>
                        <td>{item.topMenu==0 && <p>Ust Kateqoriyadir</p>}
                        {item.topMenu!=0 && <p>Alt Kateqoriyadir</p>}
                        
                        </td>
                        <td>
                            <button className="btn btn-warning"   data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                            <button className="btn btn-danger ms-2" onClick={()=>{Delete(item.id,i)}}>Delete</button>
                        </td>
                 
                    </tr>

                ))}

            
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    placeholder="Ad"
                    type="text"
                    className="form-control "
                    name="category"
                    onChange={handleChange}
                  />
                </div>
                <div id="Select">
                  <select className="form-control " 
                   name="topMenu"
                    onChange={handleChange}>
                    <option value="0">Ust Kateqoriyadir</option>
                    {data.map((item,i)=>(
                      item.topMenu ==0 &&
                        <option value={item.id} key={i}>{item.category}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary"  data-bs-dismiss="modal">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryAdd;
