const cameras = {

    indoor: [
        { id: 11, name: "Living Room", url: "https://example.com/living-room-stream.mp4" },
        { id: 12, name: "Kitchen", url: "https://example.com/kitchen-stream.mp4" },
        { id: 13, name: "Bedroom", url: "https://example.com/bedroom-stream.mp4" },
        { id: 14, name: "Hallway", url: "https://example.com/hallway-stream.mp4" },
        { id: 15, name: "Office", url: "https://example.com/office-stream.mp4" },
        { id: 16, name: "Garage Interior", url: "https://example.com/garage-interior-stream.mp4" },
        { id: 17, name: "Kids Room", url: "https://example.com/kids-room-stream.mp4" },
        { id: 18, name: "Basement", url: "https://example.com/basement-stream.mp4" }
    ],

    outdoor: [
        { id: 1, name: "Front Door", url: "https://example.com/front-door-stream.mp4" },
        { id: 2, name: "Backyard", url: "https://example.com/backyard-stream.mp4" },
        { id: 3, name: "Garage", url: "https://example.com/garage-stream.mp4" },
        { id: 4, name: "Driveway", url: "https://example.com/driveway-stream.mp4" },
        { id: 5, name: "Patio", url: "https://example.com/patio-stream.mp4" },
        { id: 6, name: "Side Yard", url: "https://example.com/side-yard-stream.mp4" },
        { id: 7, name: "Pool Area", url: "https://example.com/pool-area-stream.mp4" },
        { id: 8, name: "Garden", url: "https://example.com/garden-stream.mp4" },
        { id: 9, name: "Gate Entrance", url: "https://example.com/gate-entrance-stream.mp4" },
        { id: 10, name: "Porch", url: "https://example.com/porch-stream.mp4" }
    ]
};

function createCameraElement(camera) {
    const div = document.createElement('div');
    div.className = 'camera-item';
    div.innerHTML = `
        <div class="video-container">
            <video muted loop>
                <source src="${camera.url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="play-icon"></div>
            <div class="watermark">Mi 360 Home Security Camera 4K</div>
            <button class="open-btn">Open</button>
            <div class="camera-name">${camera.name} (ID: ${camera.id})</div>
        </div>
    `;

    const video = div.querySelector('video');
    const playIcon = div.querySelector('.play-icon');
    const openBtn = div.querySelector('.open-btn');

    playIcon.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
        } else {
            video.pause();
            playIcon.style.display = 'block';
        }
    });

    openBtn.addEventListener('click', () => openModal(camera));

    return div;
}

function populateCameras() {
    const outdoorGrid = document.querySelector('#outdoor-cameras .camera-grid');
    const indoorGrid = document.querySelector('#indoor-cameras .camera-grid');

    cameras.outdoor.forEach(camera => outdoorGrid.appendChild(createCameraElement(camera)));
    cameras.indoor.forEach(camera => indoorGrid.appendChild(createCameraElement(camera)));
}

function openModal(camera) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalVideo = document.getElementById('modal-video');

    modalTitle.textContent = `${camera.name} (ID: ${camera.id})`;
    modalVideo.src = camera.url;
    modal.style.display = 'block';
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', populateCameras);
