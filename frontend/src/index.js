import * as CONSTANTS from '../const/const.js';
import {checkFormValidity, submit} from './utils.js';
import './styles.css';

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
