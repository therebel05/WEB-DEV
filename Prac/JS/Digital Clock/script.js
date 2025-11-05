const timeElement = document.querySelector("h2");

setInterval(() => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  timeElement.textContent = `Time: ${time}`;
}, 1000);
