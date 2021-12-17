import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

const modalRootRef = document.querySelector("#modal-root");

const Modal = ({ toggleModal, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener("keydown", onEscPress);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener("keydown", onEscPress);
    };
  }, []);

  const onEscPress = (event) => {
    if (event.code === "Escape") {
      toggleModal();
    }
  };

  const onBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  return createPortal(
    <>
      {
        <div onClick={onBackdropClick} className={style.Overlay}>
          <div className={style.Modal}>
            <img src={largeImageURL} alt="" />
          </div>
        </div>
      }
    </>,
    modalRootRef
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;

// example;

//Class
// componentDidMount() {
//   window.addEventListener('mousemove', () => {})
// }

// componentWillUnmount() {
//   window.removeEventListener('mousemove', () => {})
// }

//Hoooks
// useEffect(() => {
//   window.addEventListener("mousemove", () => {});

//   // returned function will be called on component unmount
//   return () => {
//     window.removeEventListener("mousemove", () => {});
//   };
// }, []);
