import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getData, Poststatus } from "../Api/api";
import { useFormik } from "formik";
import Message from "./email-icon.png";

function ProductList() {
  const [single, setSingle] = useState("");
  const [product, setProduct] = useState("");
  const [filterText,setFilterText] =useState("")


  let productStatus = "";

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      status: "0",
    },
    onSubmit: async (values) => {
      console.log(values);
      console.log(product);
      product.status = values.status;
      const postdata = await Poststatus(product);
    },
  });

  let checked = false;

  const { isLoading, error, data } = useQuery("product", getData);
  
  


  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const filtered = data.filter((item) =>{
    const searchTitle =   item.title.toString().toLowerCase().includes(filterText.toLowerCase())
   

    if (searchTitle) {
      return searchTitle
    }else{
      return item.context.toString().toLowerCase().includes(filterText.toLowerCase())

    }
  
    
  })



  const View = (id) => {
    let singleData = data.find((item) => {
      return item.id == id;
    });
    setSingle(singleData);
  };

  const test = (id) => {
    let dataStatusproduct = data.find((item) => {
      return item.id == id;
    });
console.log(dataStatusproduct);
    productStatus = dataStatusproduct;
    setProduct(productStatus);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <input type="text" placeholder="Filter Product" value={filterText} onChange={(e)=>setFilterText(e.target.value)}/>

        </div>

      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Title</th>
            <th scope="col">Context</th>
            <th scope="col">Price</th>
            <th scope="col">Picture</th>
            <th scope="col">Status</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{item.title}</td>
              <td>{item.context}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.image} width="100px" />
              </td>
              <td>
                {item.status == 0 && (
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      test(item.id);
                    }}
                  >
                    Gozlemededir...
                  </button>
                )}

                {item.status == 1 && (
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      test(item.id);
                    }}
                  >
                    Aktivdir
                  </button>
                )}
                {item.status == 2 && (
                  <div className="d-flex align-items-center">
                    <div>
                      {" "}
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          test(item.id);
                        }}
                      >
                        Legv olunub
                      </button>
                    </div>
                    <Link to={`/inform/${item.id}`}>
                      <div className="ms-2">
                      <img src={Message} width="40px" />
                    </div>
                    </Link>
                  </div>
                )}

                {/* <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      defaultChecked={checked}
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={()=>{test(item.id)}}
                    />
                  </div> */}
              </td>
              <td>
                <button
                  onClick={() => {
                    View(item.id);
                  }}
                  className="btn btn-info"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
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
              <h3>Title:{single.title} </h3>
              <h5>Price: {single.price} </h5>
              <p>Context: {single.context} </p>
              <img src={single.image} width="100%" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade "
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Status
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
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="exampleRadios1"
                    type="radio"
                    name="status"
                    value="1"
                    checked={values.status === "1"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" for="exampleRadios1">
                    Aktiv et
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="exampleRadios2"
                    type="radio"
                    name="status"
                    value="0"
                    checked={values.status === "0"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" for="exampleRadios2">
                    Gozleme
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="exampleRadios3"
                    type="radio"
                    name="status"
                    value="2"
                    checked={values.status === "2"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" for="exampleRadios3">
                    Legv et
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    type="submit"
                  >
                    Save changes
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

export default ProductList;
