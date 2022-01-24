import { Col, Container, Row } from 'react-bootstrap';
import Hasil from './components/Hasil';
import ListCategories from './components/ListCategories';
import NavbarComponents from './components/NavbarComponents';
import React, { Component } from 'react';
import { API_URL } from './utils/constants';
import axios from 'axios';
import Menus from './components/Menus';
import Swal from 'sweetalert2';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       categoryYangDiPilih: 'Makanan', //default
       keranjangs : []
    }
  }
  
  //default tampil menu
  componentDidMount() {
    axios.get(API_URL+"products?category.nama="+this.state.categoryYangDiPilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error)
      })

    axios.get(API_URL+"keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error)
      })
  }

  //code supaya tambah menu tidak reload halaman
  componentDidUpdate(prevState){
    if(this.state.keranjangs !== prevState.keranjangs){
      axios.get(API_URL+"keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  //tampil menu sesuai category
  changeCategory = (value) => {
    this.setState({
      categoryYangDiPilih: value,
      menus: []
    })

    axios.get(API_URL+"products?category.nama="+value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error)
      })
  }

  //masuk menu ke keranjang
  masukKeranjang = (value) => {

    //get keranjang
    axios.get(API_URL+"keranjangs?product.id=" + value.id)
      .then((res) => {
        if(res.data.length === 0){
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
      
          //post keranjang
          axios.post(API_URL+"keranjangs",keranjang)
            .then((res) => {
              Swal.fire(
                'Berhasil',
                keranjang.product.nama+' masuk ke dalam keranjang ',
                'success'
              )
            })
            .catch(error => {
              console.log(error)
            })

        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }

          //put keranjang
          axios.put(API_URL+"keranjangs/"+res.data[0].id,keranjang)
            .then((res) => {
              Swal.fire(
                'Berhasil',
                keranjang.product.nama+' masuk ke dalam keranjang ',
                'success'
              )
            })
            .catch(error => {
              console.log(error)
            })

        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const {menus, categoryYangDiPilih, keranjangs} = this.state
    return (
      <div className="App">
      <NavbarComponents/>
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoryYangDiPilih={categoryYangDiPilih}/>
            <Col>
              <h4><strong>Daftar Menu</strong></h4>
              <hr/>
              <Row>
                {menus && menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs}/>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

