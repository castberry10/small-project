(function() {
    let floatBtn = null;
  
    // 드래그 끝나고 마우스 뗐을 때
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
  
      // 드래그가 풀리거나 공백이면 버튼 제거
      if (!selectedText) {
        removeFloatBtn();
        return;
      }
  
      try {
        // 선택 영역의 좌표를 가져오기
        const range = selection.getRangeAt(0); 
        const rect = range.getBoundingClientRect();
  
        // 스크롤된 부분을 고려한 절대 좌표
        const x = window.scrollX + rect.left;
        const y = window.scrollY + rect.top;
  
        createFloatBtn(x, y, selectedText);
      } catch (err) {
        // getRangeAt(0)이 실패할 수 있음 (ex. 내부 에러)
        console.error(err);
        removeFloatBtn();
      }
    });
  
    function createFloatBtn(x, y, selectedText) {
      removeFloatBtn(); // 버튼 중복 제거
  
      floatBtn = document.createElement('button');
      floatBtn.innerText = '저장';
      floatBtn.style.position = 'absolute';
      floatBtn.style.top = y + 'px';
      floatBtn.style.left = x + 'px';
      floatBtn.style.zIndex = 999999; 
      floatBtn.style.cursor = 'pointer';
      floatBtn.style.backgroundColor = '#FFD700';
      floatBtn.style.border = '1px solid #999';
      floatBtn.style.padding = '4px 8px';
      floatBtn.style.borderRadius = '4px';
      floatBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
  
      floatBtn.addEventListener('click', () => {
        saveSelection(selectedText);
        console.log('[Selection Saver] 저장 버튼 클릭:', selectedText);
        removeFloatBtn();
      });
  
      document.body.appendChild(floatBtn);
    }
  
    function removeFloatBtn() {
      if (floatBtn && floatBtn.parentNode) {
        floatBtn.parentNode.removeChild(floatBtn);
        floatBtn = null;
      }
    }
  
    function saveSelection(text) {
      console.log('[Selection Saver] 저장 - saveSelection시작작:', text);
      // 현재 페이지 URL
      const pageUrl = window.location.href;
      // chrome.storage.sync 사용
      chrome.storage.sync.get(['mySelections'], (result) => {
        const selections = result.mySelections || [];
        
        // 새로 선택한 텍스트와 URL 추가
        selections.push({
          text,
          url: pageUrl,
          time: Date.now()
        });
  
        // 다시 sync에 저장
        chrome.storage.sync.set({ mySelections: selections }, () => {
          console.log('[Selection Saver] 저장 완료:', text, pageUrl);
        });
      });
    }
  })();
  