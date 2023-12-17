import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import './index.css';

function ProductList() {
  const url = 'http://127.0.0.1:5555/product';
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ productid: '', producttitle: '', price: '', stock: '' });
  const [divDisplay, setDivDisplay] = useState('none');

  const FetchProducts = () => {
    axios.get(url)
      .then((result) => {
        setProducts(result.data);
      });
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  const DeleteProduct = (No) => {
    setDivDisplay('none');
    ClearTextBoxes();

    if (No === 1) {
      var finalurl = url + '/' + product.productid;
      axios.delete(finalurl)
        .then((result) => {
          if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
            FetchProducts();
          }
        });
    }
  };

  const ClearTextBoxes = () => {
    setProduct({ productid: '', producttitle: '', price: '', stock: '' });
  };

  const Stock = (No) => {
    if (No === 0) {
      return "Not Available";
    }
    else {
      return No;
    }
  };

  const EditBoxes = (No) => {
    for (var i = 0; i < products.length; i++) {
      if (products[i].productid === No) {
        setProduct(products[i]);
      }
    }
  };

  const OnTextChange = (args) => {
    var copyOfProduct = { ...product, [args.target.name]: args.target.value };
    setProduct(copyOfProduct);
  };

  const AddProduct = () => {
    axios.post(url, product)
      .then((result) => {
        if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
          FetchProducts();
          ClearTextBoxes();
        }
      });
  };

  const UpdateProduct = () => {
    var finalurl = url + '/' + product.productid;
    axios.put(finalurl, product)
      .then((result) => {
        if (result.data.affectedRows !== undefined && result.data.affectedRows > 0) {
          FetchProducts();
          ClearTextBoxes();
        }
      });
  };

  return (
    <div className="container">
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <td>Product Id:</td>
              <td>
                <input type="text" name="productid" id="" value={product.productid} onChange={OnTextChange} />
              </td>
            </tr>
            <tr>
              <td>Product Title:</td>
              <td>
                <input type="text" name="producttitle" id="" value={product.producttitle} onChange={OnTextChange} />
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                <input type="text" name="price" id="" value={product.price} onChange={OnTextChange} />
              </td>
            </tr>
            <tr>
              <td>Stock:</td>
              <td>
                <input type="text" name="stock" id="" value={product.stock} onChange={OnTextChange} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button className='btn btn-info' onClick={ClearTextBoxes}>Reset Product</button>{" "}
                <button className='btn btn-primary' onClick={AddProduct}>Add product</button>{" "}
                <button className='btn btn-warning' onClick={UpdateProduct}>Update Record</button>{" "}
                <button className='btn btn-danger' onClick={() => { setDivDisplay('A') }}>Delete Product</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div className={divDisplay}>
        <h2>Are you Sure?</h2>
        <div className='B'>
          <button className='btn btn-danger' onClick={() => { DeleteProduct(1) }}>Yes</button>{" "}
          <button className='btn btn-warning' onClick={() => { DeleteProduct(0) }}>No</button>
        </div>
      </div>
      <hr />
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="row">
            {
              products.map((product) => {
                return <tr key={product.productid}>
                  <th>{product.productid}</th>
                  <th>{product.producttitle}</th>
                  <th>{product.price}</th>
                  <th>{Stock(product.stock)}</th>
                  <th>
                    <button className='btn btn-warning' onClick={() => { EditBoxes(product.productid) }}>Edit/Delete</button>
                  </th>
                </tr>;
              })
            }
          </tbody>
        </table>
      </div>
    </div>);
};

export default ProductList;