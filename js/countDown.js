document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadCountdownTimer, 5000); 
});

function loadCountdownTimer() {
    const countdownHTML = `
        <div class="countdown-container">
            <span id="closeBtn" class="close-btn">&times;</span>
            <h2>Special Offer Ends In:</h2>
            <div id="countdown">
                <div class="time-box">
                    <span id="days">00</span>
                    <p>Days</p>
                </div>
                <div class="time-box">
                    <span id="hours">00</span>
                    <p>Hours</p>
                </div>
                <div class="time-box">
                    <span id="minutes">00</span>
                    <p>Minutes</p>
                </div>
                <div class="time-box">
                    <span id="seconds">00</span>
                    <p>Seconds</p>
                </div>
            </div>
            <button id="buyNowBtn" onclick="window.location.href='shop.html'">Buy Now</button>
        </div>
    `;

    const overlay = document.getElementById('countdownOverlay');
    overlay.innerHTML = countdownHTML;


    setTimeout(function() {
        overlay.style.display = 'flex'; 
        startCountdown(); 
    }, 0); 


    document.getElementById('closeBtn').addEventListener('click', function() {
        overlay.style.display = 'none'; 
    });
}

function startCountdown() {
    const countdownDate = new Date("Nov 30, 2024 23:59:59").getTime();

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}
