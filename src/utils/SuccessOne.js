import Swal from 'sweetalert2';

/**
 * Displays a SweetAlert2 success message
 * @param {string} title - The main title of the alert
 * @param {string} [text] - Optional additional message
 * @param {number} [timer=2000] - Auto close timer in ms
 */
const SuccessOne = (title, text = '', timer = 2000) => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer,
    showConfirmButton: false,
    timerProgressBar: true,
    toast: false,
    position: 'center',
  });
};

export default SuccessOne;
