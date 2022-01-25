import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../../utils/utils';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class TotalBayar extends Component {

  submitTotalBayar = (totalBayar) => {
    const pesanan = {
        total_bayar: totalBayar,
        menus: this.props.keranjangs
    }

    if(totalBayar){
        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.navigate('/sukses')
    })}else{
        Swal.fire(
            'Gagal',
            'Anda belum memilih makanan',
            'error'
          )
    }
  };

  render() {
      //hapus keranajang
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
      }, 0);

    return (
        <>
        {/* //web */}
            <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="warning"
              className="mb-2 mt-4 mr-2 col-12"
              size="lg"
              as={Link} to="/sukses"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>

        {/* mobile */}
      <div className=" d-md-none d-sm-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="warning"
              className="mb-2 mt-4 mr-2 col-12"
              size="lg"
              as={Link} to="/sukses"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
        </>
    )
  }
}
