import React from 'react'
import PropTypes from 'prop-types'
import axios from "axios"
class AdminLandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      proName: '',
      proCategory: '',
      proDescription: '',
      proBrand: '',
      proStock: '',
      proPrice: '',
      isAddProductModal: false,
      masterProducts: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem("role") !== 'Admin') {
      window.location.href = 'login'
    }
    this.setState({
      isLoading: true
    }, () => {
      axios.get(`http://localhost:3007/products`).then((response) => {
        this.setState({
          masterProducts: response.data
        })
      }).finally(() => {
        this.setState({
          isLoading: false
        })
      })
    })

  }

  actionHandler = (e) => {
    if (e.target) {
      if (e.target.value !== '') {
        this.setState({
          [e.target.id]: e.target.value
        })
      } else {
        this.setState({
          [e.target.id]: ''
        })
      }
    }
  }

  handleAddProduct = () => {
    window.scrollTo({ top: 0 })
    const { proName, proCategory, proDescription, proBrand, proStock, proPrice } = this.state
    let object = {
      "proName": proName,
      "proCategory": proCategory,
      "proDescription": proDescription,
      "proBrand": proBrand,
      "proStock": proStock,
      "proQuantity": 1,
      "proPrice": proPrice,
      "imageUrl": "https://mibbles.in/wp-content/uploads/2022/06/combo6.png"
    }
    this.setState({
      isLoading: true
    }, () => {
      axios.post(`http://localhost:3007/products/add`, object).then((res) => {
        axios.get(`http://localhost:3007/products`, object).then((response) => {
          this.setState({
            masterProducts: response.data
          })
        })
      }).finally(() => {
        this.setState({
          isLoading: false,
          proName: '',
          proCategory: '',
          proDescription: '',
          proBrand: '',
          proStock: '',
          proQuantity: '',
          isAddProductModal: false
        })
      })
    })
  }

  handleUpdateProduct = (proId) => {
    window.scrollTo({ top: 0 })
    const { proName, proCategory, proDescription, proBrand, proStock, proQuantity } = this.state
    let object = {
      "proName": proName,
      "proCategory": proCategory,
      "proDescription": proDescription,
      "proBrand": proBrand,
      "proStock": proStock,
      "proQuantity": 1,
      "proPrice": proQuantity
    }

    this.setState({
      isLoading: true
    }, () => {
      axios.put(`http://localhost:3007/products/update/${proId}`, object).then((res) => {
        axios.get(`http://localhost:3007/products`).then((response) => {
          this.setState({
            masterProducts: response.data
          })
        })
      }).finally(() => {
        this.setState({
          isLoading: false,
          proName: '',
          proCategory: '',
          proDescription: '',
          proBrand: '',
          proStock: '',
          proQuantity: '',
          isAddProductModal: false
        })
      })
    })
  }

  handleDeleteProduct = (proId) => {
    window.scrollTo({ top: 0 })
    this.setState({
      isLoading: true
    }, () => {
      axios.delete(`http://localhost:3007/products/delete/${proId}`).then((response) => {
        axios.get(`http://localhost:3007/products`).then((response) => {
          this.setState({
            masterProducts: response.data
          })
        })
      }).finally(() => {
        this.setState({
          isLoading: false
        })
      })
    })
  }


  render () {
    const { proName, proCategory, proDescription, proBrand, proStock, proPrice, isAddProductModal, isLoading, masterProducts } = this.state
    let btnDisabled = false
    btnDisabled = !!proName && !!proCategory && !!proDescription && !!proBrand && !!proStock && !!proPrice
    console.log('masterProducts', masterProducts)
    return (
      <div style={{ margin: '0 auto' }} >
        {isLoading && <div className="spinner"></div>}
        {!isAddProductModal && <div className="col-sm-12">
          <button className="btn btn-primary btn float-right mb-2"
            id="submitButton"
            type="submit"
            onClick={() => {
              this.setState({
                isAddProductModal: true
              })
            }}>Add +</button>
          <table className="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" >
            <thead>
              <tr><th rowspan="1" colspan="1">Sr.</th>
                <th rowspan="1" colspan="1">Product</th>
                <th rowspan="1" colspan="1">Category</th>
                <th rowspan="1" colspan="1">Description</th>
                <th rowspan="1" colspan="1">Brand</th>
                <th rowspan="1" colspan="1">Stock</th>
                <th rowspan="1" colspan="1">Price</th>
                </tr>
            </thead>
            <tbody>
            
                {masterProducts.map((v,i) => 
                <tr className="odd">
                  <td className="sorting_1" key={i}>{i+1}</td>
                  <td>{v.proName}</td>
                  <td>{v.proCategory}</td>
                  <td>{v.proDescription}</td>
                  <td>{v.proBrand}</td>
                  <td>{v.proStock}</td>
                  <td>{v.proPrice}</td>

                  <button className={`btn btn-primary btn  ml-4 footer-text`} onClick={() => {
                    this.handleUpdateProduct()
                  }}>
                    Edit
                  </button>
                  <button className={`btn btn-primary  ml-4 btn footer-text`} onClick={() => {
                    this.handleDeleteProduct(v.proId)
                  }}>
                    Delete
                  </button>
                  </tr>)}
            </tbody>
          </table>
        </div>}

        {isAddProductModal && <div className="modal-dialog modal-fullscreen ">
          <div className="modal-content">
            <div className="modal-header border-0"><button className="btn-close" type="button"></button></div>
            <div className="modal-body text-center pb-5">
              <div className="container">
                <div className="row justify-content-center1">
                  <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Add Prodct</h2>
                  <p className='continue-shopping-text footer-text' onClick={() => {
                    this.setState({
                      isAddProductModal: false,
                    })
                  }}>Back
                  </p>
                  <div className="col-lg-6 text-center">
                    <form id="contactForm">
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proName"
                          type="text"
                          value={proName}
                          onChange={this.actionHandler}
                          placeholder="Product Name" />
                        <label for="proName">Product Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proCategory" type="text"
                          value={proCategory}
                          onChange={this.actionHandler}
                          placeholder="Category Name" />
                        <label for="proCategory">Category</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proDescription" type="tel"
                          value={proDescription}
                          onChange={this.actionHandler}
                          placeholder="proDescription" />
                        <label for="proDescription">Description</label>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 text-center">
                    <form id="contactForm">
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proBrand"
                          type="text"
                          value={proBrand}
                          onChange={this.actionHandler}
                          placeholder="Brand" />
                        <label for="proBrand">Brand</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proStock" type="text"
                          value={proStock}
                          onChange={this.actionHandler}
                          placeholder="Stock" />
                        <label for="proStock">Stock</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control"
                          id="proPrice" type="tel"
                          value={proPrice}
                          onChange={this.actionHandler}
                          placeholder="proPrice" />
                        <label for="proPrice">Price</label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <button className={`btn btn-primary  mt-4 ` + (!btnDisabled ? 'disabled' : '')} onClick={() => {
                this.handleAddProduct()
              }}>
                Add Product
              </button>
            </div>
          </div>
        </div>}

      </div>
    )
  }
}

AdminLandingPage.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default AdminLandingPage

