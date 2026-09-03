// Initialize Lucide Icons
lucide.createIcons();

async function loadYouTubeVideos() {
  const latestContainer = document.getElementById("latest-video");
  const playlistContainer = document.getElementById("playlist-video");

  try {
    // 1. Fetch Latest Upload HD Thumbnail
    if (latestContainer) {
      const latestRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`,
      );
      const latestData = await latestRes.json();

      if (latestData.items && latestData.items.length > 0) {
        const videoId = latestData.items[0].id.videoId;
        const snippet = latestData.items[0].snippet;
        const highResThumb = snippet.thumbnails.maxres
          ? snippet.thumbnails.maxres.url
          : snippet.thumbnails.high.url;

        latestContainer.innerHTML = `
                    <div class="absolute inset-0 z-20 cursor-pointer group" onclick="playLatestVideo('${videoId}')">
                        <img src="${highResThumb}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="${snippet.title}">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="bg-red-600 text-black rounded-full p-4 transform group-hover:scale-110 transition-transform shadow-[0_0_20px_#ff0033]">
                                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                    </div>`;
      }
    }

    // 2. Fetch Playlist HD Thumbnail
    if (playlistContainer) {
      const playlistRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?key=${YOUTUBE_API_KEY}&id=${PLAYLIST_ID}&part=snippet`,
      );
      const playlistData = await playlistRes.json();

      if (playlistData.items && playlistData.items.length > 0) {
        const snippet = playlistData.items[0].snippet;
        const highResThumb = snippet.thumbnails.maxres
          ? snippet.thumbnails.maxres.url
          : snippet.thumbnails.high.url;

        playlistContainer.innerHTML = `
                    <div class="absolute inset-0 z-20 cursor-pointer group" onclick="playPlaylist('${PLAYLIST_ID}')">
                        <img src="${highResThumb}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="${snippet.title}">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="bg-red-600 text-black rounded-full p-4 transform group-hover:scale-110 transition-transform shadow-[0_0_20px_#ff0033]">
                                <svg class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                    </div>`;
      }
    }
  } catch (error) {
    console.error(
      "Transmission failed. Unable to connect to YouTube API:",
      error,
    );
  }
}

// Drops the native player in when clicked
window.playLatestVideo = function (videoId) {
  const container = document.getElementById("latest-video");
  container.innerHTML = `<iframe class="w-full h-full absolute inset-0 z-20" src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="Latest Upload" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

window.playPlaylist = function (playlistId) {
  const container = document.getElementById("playlist-video");
  container.innerHTML = `<iframe class="w-full h-full absolute inset-0 z-20" src="https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1" title="DSA Playlist" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

document.addEventListener("DOMContentLoaded", () => {
  loadYouTubeVideos();
});

// --- PROJECT DATA ---
const projectData = [
  {
    title: "HeapVortex",
    subtitle: "Java | Spring Boot | JVM | JMX | Eclipse MAT",
    description: `
                    <p>A full-stack JVM diagnostic application designed to orchestrate automated heap dump analysis and serve data for 15,000+ memory objects via RESTful APIs[cite: 2].</p>
                    <p>This system replaces manual monitoring by extracting live memory metrics and parsing multi-gigabyte binary files to accelerate memory leak detection[cite: 2].</p>
                `,
    features: [
      "Integrated secure JMX telemetry over SSL/TLS for encrypted extraction of live memory metrics[cite: 2]",
      "Engineered a headless Eclipse MAT integration to parse multi-gigabyte .hprof binary files[cite: 2]",
      "Utilized algorithmic sorting to extract the heaviest memory footprints[cite: 2]",
      "Containerized the backend infrastructure using Docker with dynamic volume mapping[cite: 2]",
      "Achieved 1-click cross-platform deployments, eliminating OS-level file pathing discrepancies[cite: 2]",
    ],
    github: "https://github.com/vhatkarsameer/heapvortex-java-fullstack",
  },
  {
    title: "E-commerce Microservices Backend",
    subtitle: "Java | Spring Boot | MySQL",
    description: `
                    <p>A full-scale E-commerce backend system built using <strong>Java, Spring Boot, MySQL, and microservices architecture</strong>.</p>
                    <p>This system was designed to simulate high-traffic online retail environments, ensuring scalability and fault tolerance.</p>
                    <p>Built with layered architecture, DTOs, REST APIs, and real-world scalable patterns.</p>
                `,
    features: [
      "Product Service (product CRUD)",
      "User Service (registration, login, JWT authentication)",
      "Order Service (order placement & workflow)",
      "Payment Service (mock payment handler)",
      "Microservices Communication",
      "MySQL Database Integration",
    ],
    github: "https://github.com/sameervhatkar/EcommerceProductService", // Main profile as fallback
  },
  {
    title: "BookMyShow Backend",
    subtitle: "Java | Spring Boot | RDBMS",
    description: `
                    <p>A backend project inspired by <strong>BookMyShow</strong>, designed to handle the complexities of a movie ticket booking system.</p>
                    <p>Developed using Java Spring Boot and advanced relational database modeling, focusing on One-to-Many and Many-to-Many relationships to handle users, theaters, and movies effectively.</p>
                `,
    features: [
      "Movie management",
      "Showtimes handling",
      "Theater layout modeling",
      "Seat selection logic",
      "Ticket booking workflow",
      "User account handling",
      "Payment simulation",
    ],
    github: "https://github.com/sameervhatkar/MovieBookingSystem",
  },
  {
    title: "Fake Store API Integration",
    subtitle: "RestTemplate | WebClient",
    description: `
                    <p>A practical integration project using the <strong>Fake Store API</strong> to fetch and handle external product data.</p>
                    <p>This project demonstrates the ability to consume third-party RESTful services within a Java application, a critical skill for modern enterprise development.</p>
                `,
    features: [
      "API consumption via RestTemplate/WebClient",
      "Data filtering & transformation",
      "Exception & error handling",
      "Clean controller-service design",
      "JSON Response Parsing",
    ],
    github: "https://github.com/sameervhatkar/fakestore",
  },
];

// --- VIEW SWITCHING LOGIC ---
function showView(viewName) {
  // Hide all views
  document
    .querySelectorAll(".page-view")
    .forEach((el) => el.classList.remove("active"));

  // Show selected view
  const selectedView = document.getElementById(`view-${viewName}`);
  if (selectedView) {
    selectedView.classList.add("active");
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Re-initialize icons
  lucide.createIcons();
}

function openProject(index) {
  const project = projectData[index];
  if (!project) return;

  // Populate details
  document.getElementById("detail-title").innerText = project.title;
  document.getElementById("detail-subtitle").innerText = project.subtitle;
  document.getElementById("detail-description").innerHTML = project.description;

  // Populate features
  const featuresList = document.getElementById("detail-features");
  featuresList.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.className = "flex items-start";
    li.innerHTML = `<span class="text-red-600 mr-2">></span> ${feature}`;
    featuresList.appendChild(li);
  });

  // Set Link
  document.getElementById("detail-github").href = project.github;

  // Show view
  showView("project-details");
}

function showContact() {
  const homeView = document.getElementById("view-home");

  // Only trigger the view switch if we are NOT already on the home page
  if (!homeView.classList.contains("active")) {
    showView("home");
    // Wait a split second for the DOM to render before scrolling
    setTimeout(() => {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    // If we are already on the home page, just scroll smoothly
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  }
}

// --- PARTICLE SYSTEM (THE UPSIDE DOWN SPORES) ---
const canvas = document.getElementById("spores");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; // Very slow horizontal drift
    this.vy = (Math.random() - 0.5) * 0.5; // Very slow vertical drift
    this.size = Math.random() * 2;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 200, 220, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    // Number of spores
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  initParticles();
});

// Contact Form Interceptor
const contactForm = document.getElementById("transmission-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the page from refreshing

    // Grab the user's input
    const name = document.getElementById("sender-name").value;
    const email = document.getElementById("sender-email").value;
    const message = document.getElementById("sender-message").value;

    // Format the email
    const targetEmail = "exploringcode@gmail.com";
    const subject = encodeURIComponent(
      `New Transmission from ${name} via AlgoXploration`,
    );
    const body = encodeURIComponent(
      `IDENTIFICATION: ${name}\nRETURN FREQUENCY: ${email}\n\nTRANSMISSION:\n${message}`,
    );

    // Trigger the user's mail application
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  });
}

resize();
initParticles();
animate();
