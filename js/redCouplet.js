(function () {
  // IIFE BEGINS
  $(document).ready(function () {
    // DOCUMENT.READY BEGINS

    var randomNum = Math.floor(Math.random() * 10 + 1);
    var el = document.getElementById("info");
    el.innerHTML = '<p id="number" class="number">' + randomNum + "</p>";

    $("#reveal").click(function () {
      $("#number").slideDown("slow");
      $("#number").addClass("numberShow");
    });
  }); // DOCUMENT.READY ENDS
})(); //IIFE ENDS

//For couplet
const quotes = [
  {
    quote: "Hãy là chính mình, vì thế giới cần một ai đó như bạn.",
  },
  {
    quote:
      "Cuộc sống không phải là chờ đợi cơn bão qua đi mà là học cách nhảy múa dưới mưa.",
  },
  {
    quote:
      "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công.",
  },
  {
    quote:
      "Đừng so sánh bản thân với người khác. Hãy so sánh với chính mình của ngày hôm qua.",
  },
  {
    quote: "Hạnh phúc không phải là đích đến, mà là cách ta đi.",
  },
];

const quoteText = document.getElementById("quote");
const generateBtn = document.getElementById("generate");
const quoteNumber = document.getElementById("quoteNumber");
const overlay = document.getElementById("overlay");
const quotePopup = document.getElementById("quotePopup");
const closeBtn = document.getElementById("closeBtn");

generateBtn.addEventListener("click", () => {
  let number = parseInt(quoteNumber.value);
  if (number >= 1 && number <= quotes.length) {
    displayQuote(number);
    showPopup();
  } else {
    alert(`Vui lòng nhập số từ 1 đến ${quotes.length}`);
  }
});

closeBtn.addEventListener("click", hidePopup);
overlay.addEventListener("click", hidePopup);

function displayQuote(number) {
  const index = number - 1;
  if (quotes[index]) {
    quoteText.textContent = quotes[index].quote;
  }
}

function showPopup() {
  overlay.style.display = "block";
  quotePopup.style.display = "block";
}

function hidePopup() {
  overlay.style.display = "none";
  quotePopup.style.display = "none";
}
