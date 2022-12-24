import React from "react";
import github from "../icons/github.png";
import instagram from "../icons/instagram.png";
import linkedIn from "../icons/linkedIn.png";

function Contact() {
  return (
    <div className="contact">
      <div>
        <span>
          <i className="fas fa-copyright"></i> Shadrach 2022
        </span>
      </div>

      <div className="i-social-icons">
        <a href="https://github.com/shelinz1/" target="_blank" rel="noreferrer">
          {" "}
          <img src={github} alt="github" />
        </a>
        <a
          href="https://www.instagram.com/shelinz10/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <img src={instagram} alt="linkedIn" />
        </a>
        <a
          href="https://www.linkedin.com/in/itodo-shadrach-894a7521b/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <img src={linkedIn} alt="linkedIn" />
        </a>
      </div>

      <div>
        Reach me:{" "}
        <p>
          <a href={`mailto:itodoshadrach@gmail.com`}>itodoshadrach@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Contact;
