document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".boago-video");

    // 1. Play or Pause when the user clicks the video
    videos.forEach(video => {
        video.addEventListener("click", () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // 2. Intersection Observer (Auto-play logic)
    // This watches the screen and tells us when a video is currently visible
    const observerOptions = {
        root: document.querySelector(".video-feed"),
        rootMargin: "0px",
        threshold: 0.8 // Trigger when 80% of the video is in the viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play video when it comes into view
                entry.target.play().catch(error => {
                    console.log("Auto-play prevented by browser. User must click first.", error);
                });
            } else {
                // Pause and reset video when you scroll away from it
                entry.target.pause();
                entry.target.currentTime = 0; 
            }
        });
    }, observerOptions);

    // Apply the observer to every video on the page
    videos.forEach(video => {
        observer.observe(video);
    });
});