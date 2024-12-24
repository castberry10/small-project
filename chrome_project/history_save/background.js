// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Selection Saver 확장프로그램이 설치되었습니다.");
  });
  
  // 메시지 중계용 (필요 시)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SAVE_SELECTION') {
      // popup이나 다른 곳에서 접근할 수 있도록 chrome.storage에 저장하는 로직을 넣을 수도 있음
      // (하지만 여기서는 content script에서 직접 storage에 넣는 예시로 충분)
      // ...
      sendResponse({ status: 'ok' });
    }
  });
  