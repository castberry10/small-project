document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('historyList');
  
    // chrome.storage.sync 에서 'mySelections' 배열을 가져와서 표시
    chrome.storage.sync.get(['mySelections'], (result) => {
      const selections = result.mySelections || [];
  
      selections.forEach((item) => {
        const li = document.createElement('li');
  
        const textSpan = document.createElement('span');
        textSpan.className = 'selection-text';
        textSpan.textContent = item.text;
  
        const urlDiv = document.createElement('div');
        urlDiv.className = 'selection-url';
        urlDiv.textContent = item.url;
  
        li.appendChild(textSpan);
        li.appendChild(document.createElement('br'));
        li.appendChild(urlDiv);
  
        historyList.appendChild(li);
      });
    });
  });
  