import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function Modal(props) {
  function cancelHandler() {
    props.onCancel()
  }

  function confirmHandler() {
    props.onConfirm()
  }

  return (
    <div className="modal">
      <div className="modal-header text-center fs-16">{props.title}</div>
      <p className="px-3 py-1 mt-0">{props.name}</p>

      <div className="" onClick={cancelHandler}>
        <button
          className=" btn--alt close p-4 text-dark"
          onClick={cancelHandler}
        >
          <svg
            className="text-dark"
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>

      {/*   <button className='btn' onClick={confirmHandler}>
          Confirm
        </button> */}
    </div>
  )
}

export default Modal
