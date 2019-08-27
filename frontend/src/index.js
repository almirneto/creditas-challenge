import * as CONSTANTS from '../const/const.js';
import {checkFormValidity, submit} from './utils.js';
import './styles.css';

//===============================================
/**
 * This handle block below it's necessary to change the variable only if necessary. If listen
 * always in eventListener, we'll have performance problem
 *
 * @param      {<type>}  warrantyOption  The warranty option
 */
// export function handleChangeWarrantyOption(
//   warrantyOption
// ) {
//   // Listen event and change the values
//   warrantyOption.addEventListener('change', (event, value) => {
//     setWarrantyOption(event.target.value)

//     // Update values after insert installments according selector
//     updateInstallments().then(function() {
//       updateLoanAmountInfo(0);
//       updateWarrantyInfo(0);
//       updateQuota();
//     });
//   });
// }

// export function setWarrantyOption(typeWarranty) {
//   // console.log(typeWarranty)
//   typeWarrantyOption = (typeWarranty === CONSTANTS.VEHICLE.TYPE) ?
//     CONSTANTS.VEHICLE : CONSTANTS.PROPERTY;
// };

// export function getWarrantyOption() {
//   return typeWarrantyOption;
// };

// ====================== END ======================


// export function handleChangeInstallments() {
//   // Listen event and change the values
//   document.getElementById('parcelas').addEventListener('change', (event) => {
//     updateQuota();
//   })
// }


// export function handleChangeRangeUnderWarranty() {
//   updateWarrantyInfo(0);

//   // Listen event and change the values
//   document.getElementById('valor-garantia-range').addEventListener('change', (event) => {
//     updateWarrantyInfo(event.target.value);
//     updateAllowedWarrantyRange('warranty');
//     updateQuota();
//   })
// }

// export function handleChangeLoanAmount() {
//   updateLoanAmountInfo(0);

//   // Listen event and change the values
//   getWarrantyElements().loanAmountRangeElement.addEventListener('change', (event) => {
//     updateLoanAmountInfo(event.target.value);
//     updateAllowedWarrantyRange('loan');
//     updateQuota();
//   })
// }

// export function updateWarrantyInfo(
//   boxValue = 0
// ) {
//   let localWarrantyOption = getWarrantyOption(),
//       currentStatusValue;

//   if (Number(boxValue) > 0) {
//     currentStatusValue = (Number(localWarrantyOption.MAX_WARRANTY) * Number(boxValue)) / 100;
//   } else {
//     currentStatusValue = localWarrantyOption.MIN_WARRANTY;
//     document.getElementById('valor-garantia-range').value = 0;
//   }

//   document.getElementById('valor-garantia').value = currentStatusValue;
//   document.getElementById('valor-garantia-min').innerText = localWarrantyOption.MIN_WARRANTY.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
//   document.getElementById('valor-garantia-max').innerText = localWarrantyOption.MAX_WARRANTY.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});

//   // updateQuota();
// };

// export function updateAllowedWarrantyRange(type) {
//   let warranty = Number(document.getElementById('valor-garantia').value);
//   let loan = Number(document.getElementById('valor-emprestimo').value);
  
//   if ((loan / 0.8) >= warranty) {
//     // document.getElementById('valor-garantia').value = loan / 0.8;
//     // console.log(loan / 0.8)
//     if (type === 'loan') {
//       document.getElementById('valor-garantia').value = document.getElementById('valor-emprestimo').value / 0.8;
//       document.getElementById('valor-garantia-range').value = document.getElementById('valor-emprestimo-range').value / 0.8; 
//     } else {
//       document.getElementById('valor-emprestimo').value = document.getElementById('valor-garantia').value * 0.8;
//       document.getElementById('valor-emprestimo-range').value = document.getElementById('valor-garantia-range').value * 0.8; 
//     }
//   }
// }


// Function to update first time and each warranty option.
// export function updateLoanAmountInfo(
//   boxValue = 0
// ) {
//   let localWarrantyOption = getWarrantyOption(),
//       localElements = getWarrantyElements(),
//       currentStatusValue;

//   if (Number(boxValue) > 0) {
//     currentStatusValue = (Number(localWarrantyOption.MAX_VALUE) * Number(boxValue)) / 100;
//   } else {
//     currentStatusValue = localWarrantyOption.MIN_VALUE;
//     localElements.loanAmountRangeElement.value = 0;
//   }

//   localElements.loanAmountElement.value = currentStatusValue;
//   localElements.loanAmountMin.innerText = localWarrantyOption.MIN_VALUE.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
//   localElements.loanAmountMax.innerText = localWarrantyOption.MAX_VALUE.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});

//   // updateQuota();
// };

// export function updateInstallments() {
//   // This promise is necessary because the option values are asynchronous
//   // After add the option values, we are update other values
//   // that depends of this.
//   return new Promise((resolve, reject) => {
//     try {
//       const LOCAL_WARRANTY_TYPE = getWarrantyOption();
//       let optionsList = document.getElementById('parcelas').options;

//       // Avoid enter in while to save performance
//       if (optionsList.length) {
//         while (optionsList.length > 0) {                
//             optionsList.remove(0);
//         }
//       }

//       LOCAL_WARRANTY_TYPE.INSTALLMENTS.forEach(option =>
//         optionsList.add(
//           new Option(option)
//         )
//       );

//       resolve();
//     } catch(error) {
//       reject(error);
//     }
//   });
// };

// export function updateQuota() {
//   let selector = document.getElementById('parcelas');

//   const IOF = 0.0638 // Using direct value to save computational resource
//   const INTEREST_RATE = 0.0234  // Using direct value to save computational resource
//   const TIME = Number(selector[selector.selectedIndex].value) / 1000
//   const VEHICLE_LOAN_AMOUNT = document.getElementById('valor-emprestimo').value

//   console.log("IOF " + IOF)
//   console.log("INTEREST_RATE " + INTEREST_RATE)
//   console.log("Opçao selecionada " + selector[selector.selectedIndex].value / 1000)
//   console.log("VEHICLE_LOAN_AMOUNT " + VEHICLE_LOAN_AMOUNT)

//   console.log("RESULTADO DO TOTAL" + (IOF + INTEREST_RATE + (TIME / 1000) + 1))

//   const valorTotalAPagar = (IOF + INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT;

//   console.log("valorTotalAPagar " + valorTotalAPagar)
//   console.log("TIME " + TIME)

//   // NOTE: This can not be this way, because if we round to 2 decimal places,
//   // the value does not match the total loan. That way we would have to check
//   // with the calculator manager how best to do this: using 3 decimal places,
//   // 2 decimal places, using Math.round, etc.
//   const valorDaParcela = (valorTotalAPagar / TIME) / 1000;
//   console.log(valorDaParcela / 1000)

//   document.getElementById("quota-value").innerText = valorDaParcela.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
//   document.getElementById("amount-total").innerText = valorTotalAPagar.toLocaleString("pt-BR",  {style: 'currency', currency: 'BRL'});
// }

// export function getWarrantyElements() {
//   return {
//       loanAmountRangeElement: document.getElementById('valor-emprestimo-range'),
//       loanAmountElement: document.getElementById('valor-emprestimo'),
//       loanAmountMin: document.getElementById('valor-emprestimo-range-min'),
//       loanAmountMax: document.getElementById('valor-emprestimo-range-max')
//   }
// }

/**
 * Class for creditas challenge.
 *
 * @class      CreditasChallenge (name)
 */
export default class CreditasChallenge {
  constructor(_warranty = CONSTANTS.VEHICLE) {
    this._warranty = _warranty;

    this.registerEvents(); // Register events
    this.updateInstallments(); // Create Installments
    this.updateQuota(); // Update current loan, warranty and price mechanics
    this.updateWarrantyInfo(); // Update Warranty info
    this.updateLoanAmountInfo(); // Update Loan info
  }

  /**
   * Gets warranty selected option
   *
   * @return     {Object}  Warranty selected:
   *                          'Veiculo' | 'Imovel'
   */
  get warranty() {
    return this._warranty;
  }

  /**
   * Sets warranty selected option
   *
   * @param      {string}  _warranty  The warranty option
   * @return     {Object}  Warranty type selected
   */
  set warranty(_warranty) {
    return this._warranty = CONSTANTS.VEHICLE.TYPE === _warranty ?
      CONSTANTS.VEHICLE : CONSTANTS.PROPERTY;
  }

  /**
   * Registers and listen Events
   */
  registerEvents() {
    submit(document.querySelector('.form'));

    this.handleChangeWarrantyOption();
    this.handleChangeRangeUnderWarranty();
    this.handleChangeLoanAmount();
    this.handleChangeInstallments();
  }

  /**
   * Handles Warranty option
   */
  handleChangeWarrantyOption() {
    // Listen event and change the values
    document.getElementById('garantia').addEventListener('change', (event, value) => {
      this.warranty = event.target.value;

      this.updateInstallments();
      this.updateLoanAmountInfo();
      this.updateWarrantyInfo();
      this.updateQuota();
    });
  }

  /**
   * Handles Warranty range
   */
  handleChangeRangeUnderWarranty() {
    // Listen event and change the values
    document.getElementById('valor-garantia-range').addEventListener('change', (event) => {
      this.updateWarrantyInfo(event.target.value);
      this.updateAllowedWarrantyRange(CONSTANTS.ALLOWED_RANGE.WARRANTY);
      this.updateQuota();
    })
  }

  /**
   * Handles Loan amount
   */
  handleChangeLoanAmount() {
    // Listen event and change the values
    document.getElementById('valor-emprestimo-range').addEventListener('change', (event) => {
      this.updateLoanAmountInfo(event.target.value);
      this.updateAllowedWarrantyRange(CONSTANTS.ALLOWED_RANGE.LOAN);
      this.updateQuota();
    })
  }

  /**
   * Handles Installments
   */
  handleChangeInstallments() {
    // Listen event and change the values
    document.getElementById('parcelas').addEventListener('change', (event) => {
      this.updateQuota();
    })
  }

  /**
   * { function_description }
   */
  updateInstallments() {
    // Defines const because can change the properties.
    const optionsList = document.getElementById('parcelas').options;

    // Avoid enter in while to save performance
    if (optionsList.length) {
      while (optionsList.length > 0) {                
        optionsList.remove(0);
      }
    }

    this.warranty.INSTALLMENTS.forEach(option =>
      optionsList.add(
        new Option(option)
      )
    );
  };

  /**
   * Updates quota, price, IOF etc.
   */
  updateQuota() {
    const selector = document.getElementById('parcelas')
    const TIME = Number(selector[selector.selectedIndex].value) / 1000;
    const VEHICLE_LOAN_AMOUNT = document.getElementById('valor-emprestimo').value
    const valorTotalAPagar = (CONSTANTS.IOF + CONSTANTS.INTEREST_RATE + TIME + 1) * VEHICLE_LOAN_AMOUNT;

    // NOTE: This can not be this way, because if we round to 2 decimal places,
    // the value does not match the total loan. That way we would have to check
    // with the calculator manager how best to do this: using 3 decimal places,
    // 2 decimal places, using Math.round, etc.
    const valorDaParcela = (valorTotalAPagar / TIME) / 1000

    document.getElementById("quota-value").innerText = valorDaParcela.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})
    document.getElementById("amount-total").innerText = valorTotalAPagar.toLocaleString("pt-BR",  {style: 'currency', currency: 'BRL'})
  }

  /**
   * Updates loan amount info
   * It was created twice to keep easy the maintenance
   *
   * @param      {number}  [boxValue=0]  The box value
   */
  updateLoanAmountInfo(
    boxValue = 0
  ) {
    const localWarrantyOption = this.warranty // Save in local to access only once
    let currentStatusValue // Change value in the future

    if (boxValue === 0) {
      currentStatusValue = localWarrantyOption.MIN_VALUE;
      document.getElementById('valor-emprestimo-range').value = 0;
    } else {
      currentStatusValue = (localWarrantyOption.MAX_VALUE * Number(boxValue)) / 100;
    }

    document.getElementById('valor-emprestimo').value = currentStatusValue;
    document.getElementById('valor-emprestimo-range-min').innerText = localWarrantyOption.MIN_VALUE.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
    document.getElementById('valor-emprestimo-range-max').innerText = localWarrantyOption.MAX_VALUE.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
  }

  /**
   * Updates warranty info
   * It was created twice to keep easy the maintenance
   *
   * @param      {number}  [boxValue=0]  The box value
   */
  updateWarrantyInfo(
    boxValue = 0
  ) {
    const localWarrantyOption = this.warranty // Save in local to access only once
    let currentStatusValue // Change value in the future

    if (boxValue === 0) {
      currentStatusValue = localWarrantyOption.MIN_WARRANTY;
      document.getElementById('valor-garantia-range').value = 0;
    } else {
      currentStatusValue = (Number(localWarrantyOption.MAX_WARRANTY) * Number(boxValue)) / 100;
    }

    document.getElementById('valor-garantia').value = currentStatusValue;
    document.getElementById('valor-garantia-min').innerText = localWarrantyOption.MIN_WARRANTY.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
    document.getElementById('valor-garantia-max').innerText = localWarrantyOption.MAX_WARRANTY.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
  }

  /**
   * Updates allowed range
   *
   * @param      {string}  ALLOWED_RANGE  The allowed range
   */
  updateAllowedWarrantyRange(ALLOWED_RANGE) {
    let warranty = Number(document.getElementById('valor-garantia').value);
    let loan = Number(document.getElementById('valor-emprestimo').value);
    
    if ((loan / 0.8) >= warranty) {
      if (ALLOWED_RANGE === CONSTANTS.ALLOWED_RANGE.LOAN) {
        document.getElementById('valor-garantia').value = document.getElementById('valor-emprestimo').value / 0.8;
        document.getElementById('valor-garantia-range').value = document.getElementById('valor-emprestimo-range').value / 0.8; 
      } else {
        document.getElementById('valor-emprestimo').value = document.getElementById('valor-garantia').value * 0.8;
        document.getElementById('valor-emprestimo-range').value = document.getElementById('valor-garantia-range').value * 0.8; 
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CreditasChallenge(); // ...After here, run other methods.
})
