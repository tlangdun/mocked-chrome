document.getElementById('importButton').addEventListener('click', function() {
  chrome.tab.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    if (tab.url.startsWith('https://www.linkedin.com/jobs/')) {
      chrome.tab.sendMessage(tab.id, { action: 'fetchJobData' }, function(response) {
        if (response.error) {
          document.getElementById('jobInfo').innerHTML = `<p>Error: ${response.error}</p>`;
        } else {
          document.getElementById('jobInfo').innerHTML = `
            <p>Company: ${response.companyName}</p>
            <p>Job: ${response.jobName}</p>
            <p>Description: ${response.jobDescription}</p>
          `;
        }
      });
    } else {
      alert('Please navigate to a LinkedIn job page.');
    }
  });
});
