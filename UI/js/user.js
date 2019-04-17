/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
document.querySelector('.burger-list').onclick = () => {
  // eslint-disable-next-line no-undef
  document.querySelector('.sidebar-small').classList.toggle('side');
};


const modal = document.querySelector('#myModal');
const btn = document.querySelector('#btn') || document.querySelector('.add-role') || document.querySelector('#add-btn');

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
