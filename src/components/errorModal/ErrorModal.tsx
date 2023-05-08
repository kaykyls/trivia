import React from 'react'
import './errorModal.scss'

interface ErrorModalProps {
    setError: (value: boolean) => void;
}
  
const ErrorModal: React.FC<ErrorModalProps> = ({ setError }) => {
    const handleOkClick = () => {
      setError(false);
    };

    return (
        <div className='error-modal-container'>
            <div className='error-modal-wrapper'>
                <h1>There are not enough questions for your query</h1>
                <button onClick={handleOkClick} className='error-modal-btn'>Ok</button>
            </div>
        </div>
    )
}

export default ErrorModal