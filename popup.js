document.addEventListener("DOMContentLoaded", function () {
  const statusMessage = document.getElementById("status-message");
  const rssUrl = "https://status.openai.com/history.rss";

  // 오늘 날짜를 가져옵니다.
  const today = new Date();
  const todayString = today.toDateString();

  fetch(rssUrl)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      // 최상단의 첫 번째 <item> 요소를 가져옵니다.
      const firstItem = data.querySelector("item");
      const pubDate = new Date(firstItem.querySelector("pubDate").textContent);
      const title = firstItem.querySelector("title").textContent;
      const description = firstItem.querySelector("description").textContent;

      // pubDate와 오늘 날짜 비교
      if (pubDate.toDateString() !== todayString) {
        // 오늘 날짜가 아니면 "All Systems Operational" 표시
        statusMessage.textContent = "🟢 All Systems Operational";
        statusMessage.style.color = "green";
      } else {
        // 오늘 날짜인 경우 Resolved 여부 확인
        if (description.includes("Resolved")) {
          statusMessage.textContent = "🟢 All Systems Operational";
          statusMessage.style.color = "green";
        } else {
          // Resolved가 없으면 오류 정보를 표시
          statusMessage.textContent = `🔴 ${title}\n${description}`;
          statusMessage.style.color = "red";
        }
      }
    })
    .catch((error) => {
      statusMessage.textContent = "Failed to check status.";
      statusMessage.style.color = "red";
      console.error("Error fetching RSS feed:", error);
    });
});

// Monitoring 일 경우 노란글씨로 점검 중
// 추가하기
