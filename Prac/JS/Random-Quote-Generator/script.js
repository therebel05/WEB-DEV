const quotes = [
  "The purpose of our lives is to be happy. – Dalai Lama",
  "Life is what happens when you're busy making other plans. – John Lennon",
  "Get busy living or get busy dying. – Stephen King",
  "You only live once, but if you do it right, once is enough. – Mae West",
  "Many of life’s failures are people who did not realize how close they were to success when they gave up. – Thomas A. Edison",
  "If you want to live a happy life, tie it to a goal, not to people or things. – Albert Einstein",
  "Never let the fear of striking out keep you from playing the game. – Babe Ruth",
  "Money and success don’t change people; they merely amplify what is already there. – Will Smith",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "Not how long, but how well you have lived is the main thing. – Seneca",
  "In the end, it’s not the years in your life that count. It’s the life in your years. – Abraham Lincoln",
  "Life is either a daring adventure or nothing at all. – Helen Keller",
  "The big lesson in life, baby, is never be scared of anyone or anything. – Frank Sinatra",
  "Life is short, and it is up to you to make it sweet. – Sarah Louise Delany",
  "Keep smiling, because life is a beautiful thing and there’s so much to smile about. – Marilyn Monroe",
  "Good friends, good books, and a sleepy conscience: this is the ideal life. – Mark Twain",
  "Life isn’t about finding yourself. It’s about creating yourself. – George Bernard Shaw",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. – Buddha",
  "Life is really simple, but we insist on making it complicated. – Confucius",
  "The biggest adventure you can take is to live the life of your dreams. – Oprah Winfrey",
];

const h1 = document.querySelector("h1");
const btn = document.querySelector("button");
let quote = null;

btn.addEventListener("click", () => {
  const idx = Math.floor(Math.random() * 20);

  if (quote) quote.remove();

  quote = document.createElement("p");
  quote.style.color = "white";
  quote.textContent = quotes[idx];
  h1.after(quote);

  console.log(btn);
});
