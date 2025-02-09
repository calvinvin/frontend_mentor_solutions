import { useState, useRef } from 'react';
import './App.css';
import iconCalculator from '../../assets/images/icon-calculator.svg';
import illustrationEmpty from '../../assets/images/illustration-empty.svg';

interface IData {
  amount: string,
  term: string,
  interestRate: string,
  type: "repayment" | "interest-only" | "",
};

function Form({
  data, submitted, setAmount, setTerm, setInterestRate, setType, setSubmitted, setSubmittedData, resultRef,
}: {
  data: IData,
  submitted: boolean,
  setAmount: React.Dispatch<React.SetStateAction<string>>,
  setTerm: React.Dispatch<React.SetStateAction<string>>,
  setInterestRate: React.Dispatch<React.SetStateAction<string>>,
  setType: React.Dispatch<React.SetStateAction<IData['type']>>,
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setSubmittedData: React.Dispatch<React.SetStateAction<IData|null>>,
  resultRef: React.RefObject<HTMLElement|null>,
}
) {
  function clearAll() {
    setAmount("");
    setTerm("");
    setInterestRate("");
    setType("");
    setSubmitted(false);
    setSubmittedData(null);
  }
  function enteredInputStringValid(string: string|null) {
    return (string === null) || (/[0-9.]/.test(string));
  }
  function duplicatedPeriod(string: string) {
    return /.*\..*\..*/.test(string);
  }
  function decimalPlacesMoreThanTwo(string: string) {
    return /\.[0-9]{3,}/.test(string)
  }
  function trimLeadingZero(string: string) {
    return string.replace(/^0+/, '');
  }
  function scrollResultSectionToTheView() {
    const resultSection = resultRef.current;
    resultSection?.scrollIntoView({behavior: "smooth"});
  }

  function handledNumberInputs(e: React.SyntheticEvent<HTMLInputElement, InputEvent>) {
    const enteredInputString = e.nativeEvent.data;
    if (!enteredInputStringValid(enteredInputString)) return;
    const newInput = (e.target as HTMLInputElement).value;
    if (duplicatedPeriod(newInput)) return;
    if (decimalPlacesMoreThanTwo(newInput)) return;
    return trimLeadingZero(newInput);
  }
  function handleAmount(e: React.SyntheticEvent<HTMLInputElement, InputEvent>) {
    const newInput = handledNumberInputs(e);
    if (newInput !== undefined) setAmount(newInput);
  }
  function handleTerm(e: React.SyntheticEvent<HTMLInputElement, InputEvent>) {
    const newInput = handledNumberInputs(e);
    if (newInput !== undefined) setTerm(newInput);
  }
  function handleInterestRate(e: React.SyntheticEvent<HTMLInputElement, InputEvent>) {
    const newInput = handledNumberInputs(e);
    if (newInput === undefined) return;
    if (Number(newInput) > 100) return;
    setInterestRate(newInput);
  }
  function handleType(e: React.SyntheticEvent<HTMLInputElement>) {
    const newType = (e.target as HTMLInputElement).value as IData['type'];
    setType(newType);
  }
  function handleSubmit() {
    setSubmitted(true);
    setSubmittedData({
      amount: amount,
      term: term,
      interestRate: interestRate,
      type: type,
    });
    scrollResultSectionToTheView();
  }

  const { amount, term, interestRate, type } = data;

  return (
    <form className="form">
      <div className="form__heading-wrapper">
        <h1 className="form__heading">
          Morgage Calculator
        </h1>
        <button onClick={clearAll} className="form__button-clear-all" type="button">
          Clear All
        </button>
      </div>
      <div className="form__amount-wrapper">
        <label htmlFor="amount" className="form__label-amount">Mortgage Amount</label>
        <div className="form__input-amount-wrapper">
          <span className="form__input-amount-unit">￡</span>
          <input id="amount" onInput={handleAmount} value={amount} name="amount" type="text" className="form__input-amount-number" placeholder='0' inputMode='decimal'/>
        </div>
        <p className={`form__input-amount-error-message ${submitted && amount==="" && "error-message-shown"}`}>This field is required</p>
      </div>
      <div className="form__term-and-interest-rate-wrapper">
        <div className="form__term-wrapper">
          <label htmlFor="term" className="form__label-term">Morgage Term</label>
          <div className="form__input-term-wrapper">
            <input id="term" onInput={handleTerm} value={term} name="term" type="text" className="form__input-term-number" placeholder='0' inputMode='decimal'/>
            <span className="form__input-term-unit">years</span>
          </div>
          <p className={`form__input-term-error-message ${submitted && term==="" && "error-message-shown"}`}>This field is required</p>
        </div>
        <div className="form__interest-rate-wrapper">
          <label htmlFor="interest-rate" className="form__label-interest-rate">Interest Rate</label>
          <div className="form__input-interest-rate-wrapper">
            <input id="interest-rate" onInput={handleInterestRate} value={interestRate} name="interest-rate" type="text" className="form__input-interest-rate-number" placeholder='0' inputMode='decimal'/>
            <span className="form__input-interest-rate-unit">%</span>
          </div>
          <p className={`form__input-interest-rate-error-message ${submitted && interestRate==="" && "error-message-shown"}`}>This field is required</p>
        </div>
      </div>
      <fieldset className="form__type">
        <legend className="form__type-heading">Morgage Type</legend>
        <label className="form__label-type-repayment"><input type="radio" onChange={handleType} className="form__input-type-repayment" name="type" value="repayment" checked={type==="repayment"}/>Repayment</label>
        <label className="form__label-type-interest-only"><input type="radio" onChange={handleType} className="form__input-type-interest-only" name="type" value="interest-only" checked={type==="interest-only"}/>Interest Only</label>
        <p className={`form__input-type-error-message ${submitted && type==="" && "error-message-shown"}`}>This field is required</p>
      </fieldset>
      <button onClick={handleSubmit} className="form__button-calculate" type="button">
        <img src={iconCalculator} alt="" className="form__button-icon" />
        <span>Calculate Repayments</span>
      </button>
    </form>
  )
}

function ResultOutputRepayment({
  submittedData,
}: {
  submittedData: IData,
}) {
  function calculateResultsUnderRepayment(data: IData) {
    const { amount, term, interestRate } = data;
    const startAmount = Number(amount);
    const totalMonths = Number(term) * 12;
    const monthlyInterest = Number(interestRate) / 100 / 12;
    const monthlyRepayment = (monthlyInterest/(1-(1+monthlyInterest)**(-totalMonths)))*startAmount;
    const totalRepayment = monthlyRepayment * totalMonths;
    return {
      monthlyRepayment: new Intl.NumberFormat(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2,}).format(monthlyRepayment), 
      totalRepayment: new Intl.NumberFormat(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2,}).format(totalRepayment),
    } ;
  }
  const { monthlyRepayment, totalRepayment } = calculateResultsUnderRepayment(submittedData);
  return (
    <div className="result__output-wrapper">
      <h3 className="result__output-repayment-heading">Your monthly repayments</h3>
      <p className="result__output-repayment">
        ￡{monthlyRepayment}
      </p>
      <hr className="result__output-hr" />
      <h3 className="result__output-total-heading">Total you'll repay over the term</h3>
      <p className="result__output-total-amount">
        ￡{totalRepayment}
      </p>
    </div>
  );
}

function ResultOutputInterestOnly({
  submittedData,
}: {
  submittedData: IData,
}) {
  function calculateResultsUnderInterestOnly(data: IData) {
    const { amount, term, interestRate } = data;
    const startAmount = Number(amount);
    const totalMonths = Number(term) * 12;
    const monthlyInterest = Number(interestRate) / 100 / 12;
    const monthlyRepaymentPrinciple = startAmount / totalMonths;
    const monthlyRepaymentInterests: {[key:number]: string} = {};

    for (let i=1; i<=totalMonths; i++) {
      const monthRepaymentInterest = (startAmount - monthlyRepaymentPrinciple*(i-1)) * monthlyInterest;
      monthlyRepaymentInterests[i] = monthRepaymentInterest.toFixed(2);
    }
    const totalRepaymentInterest = Object.values(monthlyRepaymentInterests).reduce((accumulator, item)=>accumulator+Number(item), 0);

    return {
      monthlyRepaymentPrinciple: new Intl.NumberFormat(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2,}).format(monthlyRepaymentPrinciple), 
      totalRepaymentInterest: new Intl.NumberFormat(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2,}).format(totalRepaymentInterest),
      monthlyRepaymentInterests: monthlyRepaymentInterests,
    };
  }

  const { monthlyRepaymentPrinciple, totalRepaymentInterest, monthlyRepaymentInterests } = calculateResultsUnderInterestOnly(submittedData);

  return (
    <div className="result__output-wrapper">
      <h3 className="result__output-repayment-heading">Your monthly repayment for principle</h3>
      <p className="result__output-repayment">
        ￡{monthlyRepaymentPrinciple}
      </p>
      <hr className="result__output-hr" />
      <h3 className="result__output-max-month-interest-heading">Max month interest (at first month) you'll repay</h3>
      <p className="result__output-max-month-interest-amount">
        ￡{monthlyRepaymentInterests[1]}
      </p>
      <hr className="result__output-hr" />
      <h3 className="result__output-total-interest-heading">Total interest you'll repay over the term</h3>
      <p className="result__output-total-interest-amount">
        ￡{totalRepaymentInterest}
      </p>
    </div>
  );
}

function Result({
  submittedData, resultRef
}: {
  submittedData: IData|null,
  resultRef: React.RefObject<HTMLElement|null>;
}) {
  const formCompleted = submittedData && Object.values(submittedData).every((value)=>value!=="");
  const type = submittedData ? submittedData.type : null;
  return (
    <section className={`result ${formCompleted ? 'completed' : 'not-completed'}`} ref={resultRef}>
      <div className="result__wrapper-completed">
        <h2 className="result__output-heading">Your results</h2>
        <p className="result__output-description">
          Your results are shown below based on the information you provided. 
          To adjust the results, edit the form and click “calculate repayments” again.          
        </p>
        {formCompleted && type==="repayment" && <ResultOutputRepayment submittedData={submittedData} />}
        {formCompleted && type==="interest-only" && <ResultOutputInterestOnly submittedData={submittedData} />}
      </div>
      <div className="result__wrapper-not-completed">
        <img src={illustrationEmpty} alt="" className="result__empty-icon" />
        <h2 className="result__empty-heading">Results shown here</h2>
        <p className="result__empty-description">
          Complete the form and click “calculate repayments” to see what your monthly repayments would be.
        </p>
      </div>
    </section>
  )
}

function App() {
  const [ amount, setAmount ] = useState('');
  const [ term, setTerm ] = useState('');
  const [ interestRate, setInterestRate ] = useState('');
  const [ type, setType ] = useState<IData['type']>("");
  const [ submitted, setSubmitted ] = useState<boolean>(false);
  const [ submittedData, setSubmittedData ] = useState<IData|null>(null);
  const resultRef = useRef<HTMLElement>(null);

  const data: IData = {
    amount: amount,
    term: term,
    interestRate: interestRate,
    type: type,
  };

  return (
    <main className="main">
      <Form data={data} submitted={submitted} setAmount={setAmount} setTerm={setTerm} setInterestRate={setInterestRate} setType={setType} setSubmitted={setSubmitted} setSubmittedData={setSubmittedData} resultRef={resultRef}/>
      <Result submittedData={submittedData} resultRef={resultRef}/>
    </main>
  )
}

export default App
