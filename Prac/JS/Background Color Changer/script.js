const parent = document.querySelector("#parent");
const body = document.querySelector("body");

parent.addEventListener("click", (e) => {
  console.log(e.target);
  body.style.backgroundColor = e.target.id;
});
