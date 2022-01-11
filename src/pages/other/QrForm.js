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
      }).then(function(response) {
        console.log("INICIO IMAGEN DE RETORNO DE QR");
        console.log(response)
        console.log("FIN IMAGEN DE RETORNO DE QR");
        return response;
      });
  }

  render () {
    return (      
      <div>        
        {console.log("SE OBTIENE")}
        {console.log(this.generateQRCodiPayment())}
        
        <img src={`data:image/png;base64,${this?.generateQRCodiPayment() ?? "Not loaded yet"}`} alt=""/>
      </div>    
    )
  }
}

export default QrForm;