/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */


document.addEventListener('DOMContentLoaded', () => {
  window.onscroll = () => {
    const nav_value = document.querySelector('.top-nav-wrapper').offsetHeight;
    const second_nav = document.querySelector('.second-nav');

    const list_burger = document.querySelector('.icon > li');

    if (window.scrollY >= nav_value) {
      second_nav.classList.add('open');

      list_burger.classList.add('open');
      // second_nav.style.backgroundColor= "red";
    } else {
      second_nav.classList.remove('open');
      list_burger.classList.remove('open');
      // document.querySelector('.icon').remove('open');
    }
  };
});


document.querySelector('.burger-list').onclick = () => {
  document.querySelector('.sidebar').classList.toggle('side');
};
