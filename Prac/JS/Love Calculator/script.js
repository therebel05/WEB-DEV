const btn = document.querySelector("button");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const boy = document.querySelector("#boy");
  const girl = document.querySelector("#girl");

  const val1 = boy.value.length;
  const val2 = girl.value.length;

  const result = (val1 + val2) * 5;

  const resultElement = document.createElement("h3");
  resultElement.textContent = `Result: ${result}%`;
  btn.after(resultElement);
});
