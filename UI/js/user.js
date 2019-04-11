/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */

// eslint-disable-next-line no-undef
document.querySelector(".burger-list").onclick = () => {
  // eslint-disable-next-line no-undef
  document.querySelector(".sidebar-small").classList.toggle("side");
};
