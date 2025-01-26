$(document).ready(function () {
  const quotes = [
    {
      quote: "Có tiền vào, nhưng cần kiên nhẫn.",
    },
    {
      quote: "Nên kiên trì với công việc hiện tại.",
    },
    {
      quote: "Đường công danh sáng sủa, có quý nhân phù trợ.",
    },
    {
      quote: "Công việc hiện tại không được suôn sẻ, nên thay đổi.",
    },
    {
      quote: "Sắp có thay đổi lớn trong công việc.",
    },
    {
      quote: "Tài lộc hanh thông, tiền bạc dồi dào.",
    },
    {
      quote: "Cẩn thận trong chi tiêu, tránh đầu tư mạo hiểm.",
    },
    {
      quote: "Tài lộc đến từ người quen.",
    },
    {
      quote: "Nên tích góp, không nên tiêu xài hoang phí.",
    },
    {
      quote: "Có người mang tin vui về tiền bạc đến.",
    },
    {
      quote: "Tình duyên đang trong thời kỳ nở rộ.",
    },
    {
      quote: "Người trong mộng sắp xuất hiện.",
    },
    {
      quote: "Duyên số chưa đến, cần kiên nhẫn chờ đợi.",
    },
    {
      quote: "Tình cảm có trắc trở, cần bình tĩnh xử lý.",
    },
    {
      quote: "Có người mới đến, mang lại niềm vui.",
    },
    {
      quote: "Sức khỏe ổn định, không có gì đáng ngại.",
    },
    {
      quote: "CNên chú ý nghỉ ngơi nhiều hơn.",
    },
    {
      quote: "Cần đề phòng bệnh tật từ đường tiêu hóa.",
    },
    {
      quote: "Nên tập thể dục đều đặn để tăng cường sức khỏe.",
    },
    {
      quote: "Có bệnh nhẹ, uống thuốc sẽ khỏi.",
    },
    {
      quote: "Gia đình hòa thuận, mọi việc êm đẹp.",
    },
    {
      quote: "Có tin vui từ người thân xa.",
    },
    {
      quote: "Gia đình có chuyện vui về con cái.",
    },
    {
      quote: "Cẩn thận lời ăn tiếng nói trong gia đình.",
    },
    {
      quote: "ắp có người thân đến thăm.",
    },
    {
      quote: "Học hành tiến bộ, kết quả tốt đẹp.",
    },
    {
      quote: "Cần cố gắng thêm trong việc học.",
    },
    {
      quote: "Sắp có kỳ thi quan trọng, nên chuẩn bị kỹ.",
    },
    {
      quote: "Nên tìm người giúp đỡ trong việc học.",
    },
    {
      quote: "Kết quả học tập khả quan.",
    },
    {
      quote: "Đi xa gặp nhiều may mắn.",
    },
    {
      quote: "Nên hoãn việc đi xa lại.",
    },
    {
      quote: "Đường xa có quý nhân giúp đỡ.",
    },
    {
      quote: "Đi đường cẩn thận, tránh va chạm.",
    },
    {
      quote: "Chuyến đi thuận lợi, có tin vui.",
    },
    {
      quote: "Buôn bán phát đạt, lợi nhuận cao.",
    },
    {
      quote: "Nên mở rộng quy mô kinh doanh.",
    },
    {
      quote: "Cẩn thận trong giao dịch tiền bạc.",
    },
    {
      quote: "Có đối tác mới tin cậy.",
    },
    {
      quote: "Kinh doanh thuận lợi, khách hàng đông.",
    },
  ];
  let randomIndex;
  const el = document.getElementById("info");
  const popup = document.getElementById("popup");
  const popupNumber = document.getElementById("popup-number");
  const popupQuote = document.getElementById("popup-quote");
  const closePopup = document.getElementById("close-popup");
  const pageLoadSound = document.getElementById("page-load-sound");
  const spinSound = document.getElementById("spin-sound");
  const popupSound = document.getElementById("popup-sound");
  let hasSpun = false;

  pageLoadSound.play();

  $("#reveal").click(function () {
    if (hasSpun) return;
    hasSpun = true;
    $(this).prop("disabled", true);
    el.classList.add("shake");
    spinSound.play();
    setTimeout(() => {
      el.classList.remove("shake");
      spinSound.pause();
      spinSound.currentTime = 0;
      randomIndex = Math.floor(Math.random() * quotes.length);
      const finalNumber = randomIndex + 1;
      el.innerHTML = '<p id="number" class="number">' + finalNumber + "</p>";
      popupNumber.textContent = "Số May Mắn: " + finalNumber;
      popupQuote.textContent = quotes[randomIndex].quote;
      popup.classList.remove("hidden");
      popupSound.play();
      $(this).prop("disabled", true);
    }, 5000);
  });

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
