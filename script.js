document.getElementById('scan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-upload');
    const urlInput = document.getElementById('url-input');
    const formData = new FormData();

    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0]);
    }

    const url = urlInput.value.trim();

    if (url) {
        formData.append('url', url);
    }

    const resultBox = document.getElementById('result-box');
    const resultContent = document.getElementById('result-content');
    resultBox.style.display = 'none'; // إخفاء النتيجة القديمة قبل الفحص

    axios.post('https://your-app-name.onrender.com/scan', formData)
        .then(function(response) {
            resultContent.innerHTML = `
                <pre>${JSON.stringify(response.data, null, 2)}</pre>
            `;
            resultBox.style.display = 'block'; // إظهار النتيجة بعد الفحص
        })
        .catch(function(error) {
            resultContent.innerHTML = `حدث خطأ: ${error.message}`;
            resultBox.style.display = 'block';
        });
});
