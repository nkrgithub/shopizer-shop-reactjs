import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      celular: '',      
      formErrors: {celular: ''},
      celularValid: false,      
      formValid: false,
      cart: props.cart,
      total: props.total
    }
    console.log("EN LA FORMA EL ID DEL CARRITO ES");
    console.log(this.state.cart);
    console.log("EL TOTAL ES");
    console.log(this.state.total);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let celularValid = this.state.celularValid;    

    switch(fieldName) {
      case 'celular':
        celularValid = value.match(/^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){2}\d{3}|(\d{2}[\*\.\-\s]){3}\d{2}|(\d{4}[\*\.\-\s]){1}\d{4})|\d{8}|\d{10}|\d{12}$/);
        fieldValidationErrors.celular = celularValid ? '' : ' es invalido';
        break;      
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    celularValid: celularValid                    
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.celularValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  sendCodiPayment = (event) => {
    //alert('A form was submitted: ' + this.state);
    var desc = ("PAGO DE CARRITO "+this.state.cart).substring(0, 39)
    var number = Number(this.state.total.replace(/[^0-9.-]+/g,""));
    const myCodiPaymentObject = {
      telefono: this.state.celular,
      descripcion: desc,
      monto: number,
      referencia: 0
    };
    console.log("***BODY BEGIN***");
    console.log(JSON.stringify(myCodiPaymentObject));
    console.log("***BODY END***");
    console.log("***URL CODI Y LLAVE***");
    console.log(window._env_.APP_CODI_URL_MC);
    console.log(window._env_.APP_GRAVITEE_KEY);
    fetch(window._env_.APP_CODI_URL_MC, {
        method: 'POST',        
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
          'X-Gravitee-Api-Key': window._env_.APP_GRAVITEE_KEY
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(myCodiPaymentObject)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
  }

  render () {
    return (
      <form className="demoForm" onSubmit={this.sendCodiPayment}>
        <h2>Pago con Cobro Digital</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.celular)}`}>
          <label htmlFor="Celular">Número Celular</label>
          <input type="number" required className="form-control" name="celular"
            placeholder="Número Celular (10 dígitos) registrado con CoDi®"
            value={this.state.celular}
            onChange={this.handleUserInput}  />
        </div>        
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Pagar</button>
      </form>
    )
  }
}

export default Form;
