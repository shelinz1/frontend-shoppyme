import "./Steps.css";

function Steps({ step1, step2, step3, step4 }) {
  return (
    <div className="steps">
      <div className={step1 ? "active" : ""}>Log-In</div>
      <div className={step2 ? "active" : ""}>Shipping</div>
      <div className={step3 ? "active" : ""}>Payment</div>
      <div className={step4 ? "active" : ""}>Place order</div>
    </div>
  );
}

export default Steps;
