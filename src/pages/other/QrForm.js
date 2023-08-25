import React, { Component } from 'react';
import { QrFormErrors } from './QrFormErrors';
import './QrForm.css';

class QrForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      qrFormErrors: {celular: ''},
      celularValid: false,      
      formValid: false,
      cart: props.cart,
      total: props.total
    }
    console.log("QR EN LA FORMA EL ID DEL CARRITO ES");
    console.log(this.state.cart);
    console.log("QR EL TOTAL ES");
    console.log(this.state.total);
  }

  generateQRCodiPayment() {
    //alert('A form was submitted: ' + this.state);
    var desc = ("PAGO TICKET "+this.state.cart).substring(0, 39)
    var number = Number(this.state.total.replace(/[^0-9.-]+/g,""));
    const myCodiPaymentObject = {
      descripcion: desc,
      monto: number,
      referencia: 0
    };
    fetch(window._env_.APP_CODI_URL_QR, {
        method: 'POST',        
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          'X-Gravitee-Api-Key': window._env_.APP_GRAVITEE_KEY_QR
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(myCodiPaymentObject)
      }).then( r => r.blob() ) // consume as a Blob
      .then( blob => { 
        const url = URL.createObjectURL( blob );
        const img = document.getElementById( 'img' );
        img.src = url;
        // in case you don't need the blob anymore
        img.onload = e => URL.revokeObjectURL( url );        
      } );
  }
  
  render () {
    return (      
      <div>                
        {console.log(this.generateQRCodiPayment())}  
        <img id="img" alt=""></img>      
      </div>    
    )
  }
}

export default QrForm;