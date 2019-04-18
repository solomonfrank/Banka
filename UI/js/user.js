



document.querySelector('.burger-list').onclick = () => {

  document.querySelector('.sidebar-small').classList.toggle('side');
};


const modal = document.querySelector('#myModal');
const btn = document.querySelector('#btn') || document.querySelector('.add-role') || document.querySelector('#add-btn') || document.querySelector('.credit');

const span = document.querySelector('.close');
btn.onclick = () => {
  modal.style.display = 'block';
};
span.onclick = () => {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};



document.querySelector('.dropdown-btn').onclick = () => {


  document.querySelector('.dropdown').classList.toggle('drop');
};
//debit 


const modalDebit = document.querySelector('.modal-debit');
const btnDebit = document.querySelector('.debit');

const spanx = document.querySelector('#close-debit');
btnDebit.onclick = () => {

  modalDebit.style.display = 'block';
};
spanx.onclick = () => {
  modalDebit.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it

window.onclick = (event) => {
  if (event.target === modalDebit) {
    modalDebit.style.display = 'none';
  }
};

