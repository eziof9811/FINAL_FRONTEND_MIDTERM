import React from 'react'
import axios from "axios"
import { createContext } from 'react'

import './HomeView.scss'

class HomeView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCardModal: false,
            product: [],
            selectedItem: {},
            zipcode: '',
            city: '',
            state: '',
            address: '',
            isLoading: false,
            placeOrder: false
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem("role") !== 'User') {
            window.location.href = 'login'
        }
  
        this.setState({
            isLoading: true
        }, () => {
            axios.get(`http://localhost:3007/products`).then((response) => {
                this.setState({
                    product: response.data
                })

            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }

    modalHandler = () => {
        window.scrollTo({ top: 0 })
        this.setState({
            isCardModal: true,
            placeOrder: false
        })
    }

    selectProduct = (selectedItem) => {
        window.scrollTo({ top: 0 })
        this.setState({ selectedItem: { ...selectedItem, count: 1 } }, () => {
            this.setState({ isCardModal: true, placeOrder: false })
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

    handlePlaceOrder = () => {
        window.scrollTo({ top: 0 })
        this.setState({
            isCardModal: false
        })
        const { proName, proCategory, proDescription, imageUrl, proPrice,proQuantity } = this.state.selectedItem
        const { address, city, state, zipcode } = this.state
        let object =
        {
            "pName": proName,
            "pCategory": proCategory,
            "pDescription": proDescription,
            "pQuantity": 1,
            "imageUrl": imageUrl,
            "pPrice": proPrice,
            "totalPrice": (proQuantity * proPrice),
            "address": address,
            "city": city,
            "state": state,
            "pinCode": zipcode
        }
        console.log('object', object)
        this.setState({
            isLoading: true
        }, () => {
            axios.post(`http://localhost:3006/orders/add`, object).then((response) => {
                console.log('response', response)
            }).finally(() => {
                this.setState({
                    isLoading: false,
                    orderCorfirmed: true,
                    placeOrder: false,
                    isCardModal: true,
                    address: '',
                    city: '',
                    state: '',
                    zipcode: ''
                })
            })
        })
    }

    handleUpdateProduct = () => {
        this.setState({
            selectedItem: { ...this.state.selectedItem, proQuantity: this.state.selectedItem.proQuantity + 1 }
        })
    }

    render() {
        let btnDisabled = false
        const { address, city, state, zipcode, isLoading, placeOrder, orderCorfirmed, isCardModal } = this.state
        const { proName, imageUrl, proQuantity, proPrice, proDescription } = this.state.selectedItem
        btnDisabled = !!address && !!city && !!state && !!zipcode
        return (
            <div>
                {isLoading && <div className="spinner"></div>}
                {(!isCardModal && !placeOrder) ? <section className="page-section portfolio" id="portfolio">
                    <div className="container">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Our Products</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="row justify-content-center">
                            {this.state.product.map((value) => (<div className="col-md-6 col-lg-4 mb-5">
                                <div className="portfolio-item mx-auto" onClick={() => { this.selectProduct(value) }}>
                                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                                        <div className="text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <img className="img-fluid" src={value.imageUrl} alt="..." />
                                    <h5 className='footer-text text-center'>Product: {value.proName}</h5>
                                    <h6 className='footer-text text-center'>Brand: {value.proBrand}</h6>
                                    <h6 className='footer-text text-center'>RS. {value.proPrice}</h6>
                                    <button className='btn btn-primary btn align-center'>Add To Cart +</button>
                                </div>
                            </div>))}
                        </div>
                    </div>
                </section> :
                    ((!placeOrder && !orderCorfirmed) && <div className="modal-dialog modal-fullscreen ">
                        <div className="modal-content">
                            <div className="modal-header border-0"><button className="btn-close" type="button"></button></div>
                            <div className="modal-body text-center pb-5">
                                <div className="container">
                                    <div className="row justify-content-center1">
                                        <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Your Order</h2>
                                        <p className='continue-shopping-text footer-text' onClick={() => {
                                            this.setState({
                                                isCardModal: false,
                                                placeOrder: false
                                            })
                                        }}>Continue Shopping
                                        </p>
                                        <div className="col-lg-12">

                                            <div className='cart-box'>
                                                <div className="col-sm-12 mb-1">
                                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" >
                                                        <thead>
                                                            <tr role="row">
                                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" >Sr.</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Name</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Product</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Description</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Unit</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Cost/unit</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Add+</th>
                                                                <th className="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" >Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="odd">
                                                                <td className="sorting_1">1</td>
                                                                <td>{this.state.selectedItem.proName}</td>
                                                                <td>
                                                                    <img className="img-fluid1 rounded mb-1"
                                                                        style={{ 'width': '300px' }}
                                                                        src={this.state.selectedItem.imageUrl} alt="..." />
                                                                </td>
                                                                <td>{this.state.selectedItem.proDescription}</td>
                                                                <td>{this.state.selectedItem.proQuantity}</td>
                                                                <td>{this.state.selectedItem.proPrice}</td>
                                                                <td>   <button className={`btn btn-primary btn`} onClick={() => {
                                                                    this.handleUpdateProduct()
                                                                }}>
                                                                    Add+
                                                                </button></td>
                                                                <td>{proQuantity * proPrice}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='btn btn-primary' onClick={() => {
                                    this.setState({
                                        isCardModal: false,
                                        placeOrder: true
                                    })
                                }}>
                                    Proceed To Checkout
                                </button>
                            </div>
                        </div>
                    </div>)}

                {(placeOrder && <div className="modal-dialog modal-fullscreen ">
                    <div className="modal-content">
                        <div className="modal-header border-0"><button className="btn-close" type="button"></button></div>
                        <div className="modal-body text-center pb-5">
                            <div className="container">
                                <div className="row justify-content-center1">
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Place Your Order</h2>
                                    <p className='continue-shopping-text footer-text' onClick={() => {
                                        this.setState({
                                            isCardModal: false,
                                            isCardModal: true,
                                            placeOrder: false,
                                        })
                                    }}>Back
                                    </p>
                                    <div className="col-lg-8 text-center">
                                        <form id="contactForm">
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="address"
                                                    type="text"
                                                    value={address}
                                                    onChange={this.actionHandler}
                                                    placeholder="Landmark" />
                                                <label for="address">Address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="city" type="text"
                                                    value={city}
                                                    onChange={this.actionHandler}
                                                    placeholder="City Name" />
                                                <label for="city">City</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="state" type="tel"
                                                    value={state}
                                                    onChange={this.actionHandler}
                                                    placeholder="State" />
                                                <label for="phoneNumber">State</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input className="form-control"
                                                    id="zipcode" type="tel"
                                                    value={zipcode}
                                                    onChange={this.actionHandler}
                                                    placeholder="zipcode" />
                                                <label for="zipcode">Zipcode</label>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-4 text-left">
                                        <h4 className='footer-text'>Your Order Details</h4>
                                        <span className='footer-text'>Product Name: <h6 className='footer-text'>{this.state.selectedItem.proName}</h6></span>
                                        <span className='footer-text'>Total Payable Amount: <h6 className='footer-text'>{proQuantity * proPrice}</h6></span>
                                    </div>
                                </div>
                            </div>()
                            <button className={`btn btn-primary  mt-4 ` + (!btnDisabled ? 'disabled' : '')} onClick={() => {
                                this.handlePlaceOrder()
                            }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>)}

                {orderCorfirmed && (<div className="modal-body text-center pb-5">
                    <div className="container">
                        <div className="row justify-content-center1">
                            <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Order Confirmed</h2>
                            <p className='continue-shopping-text footer-text text-center' onClick={() => {
                                this.setState({
                                    isCardModal: false,
                                    isCardModal: false,
                                    placeOrder: false,
                                    orderCorfirmed: false
                                })
                            }}>Contune Shopping
                            </p>
                            <div className="col-lg-12 text-left">
                                <h4 className='footer-text'>Congratulations!</h4>
                                <h3 className='footer-text'>Your Order is Confirmed.</h3>
                            </div>
                        </div>
                    </div>
                </div>)}

            </div>
        )
    }
}

HomeView.propTypes = {
}

export default HomeView