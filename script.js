function downloadVideo(quality = 'HD') {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
        document.getElementById('downloadLink').innerText = 'Please enter a video URL.';
        document.getElementById('downloadLink').classList.add('show');
        setTimeout(() => document.getElementById('downloadLink').classList.remove('show'), 2000);
        return;
    }
    const isHD = quality === 'HD';
    const apiUrl = `https://delirius-apiofc.vercel.app/download/facebook?url=${encodeURIComponent(videoUrl)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.urls) {
                const hdUrl = data.urls["0"].hd;
                const sdUrl = data.urls["1"].sd;
                const downloadUrl = isHD ? hdUrl : sdUrl;

                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `FBVideo_${quality}.mp4`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                document.getElementById('downloadLink').innerText = `Downloading (${quality})...`;
                document.getElementById('downloadLink').classList.add('show');
                setTimeout(() => document.getElementById('downloadLink').classList.remove('show'), 2000);
            } else {
                document.getElementById('downloadLink').innerText = 'Failed to download video. Please try again.';
                document.getElementById('downloadLink').classList.add('show');
                setTimeout(() => document.getElementById('downloadLink').classList.remove('show'), 2000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('downloadLink').innerText = 'Failed to download video. Please try again.';
            document.getElementById('downloadLink').classList.add('show');
            setTimeout(() => document.getElementById('downloadLink').classList.remove('show'), 2000);
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('btnDownloadHD').addEventListener('click', () => downloadVideo('HD'));
    document.getElementById('btnDownloadSD').addEventListener('click', () => downloadVideo('SD'));

    const toggleBtn = document.getElementById('darkModeToggle');
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.innerHTML = document.body.classList.contains('dark-mode')
            ? '<i class="fas fa-sun"></i> Light Mode'
            : '<i class="fas fa-moon"></i> Dark Mode';
        toggleBtn.style.transition = 'transform 0.3s ease'; // Ensure smooth transition for spin
    });
});
