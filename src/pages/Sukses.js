import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {

  componentDidMount(){
    axios.get(API_URL+"keranjangs")
    .then((res) => {
      const keranjangs = res.data;
      keranjangs.map(function(item) {
          return axios
          .delete(API_URL+"keranjangs/"+item.id)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
    <div className='mt-4 text-center'>
        <Image src="images/sukses.png" width="400"/>
        <h2>Sukses Pesan</h2>
        <p>Terima kasih sudah memesan</p>
        <Button variant="success" as={Link} to="/">
            Kembali
        </Button>
    </div>
    )
  }
}
