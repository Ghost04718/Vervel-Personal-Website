// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });

  // Initialize homepage specific features
  if (document.getElementById('particles-js')) {
    initHomepage();
  }

  // Initialize about page specific features
  if (document.querySelector('.timeline')) {
    initAboutPage();
  }

  // Initialize mobile navigation
  initMobileNavigation();

  // Initialize touch interactions for mobile
});

// Mobile navigation functionality
function initMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Create hamburger menu if it doesn't exist
  if (!navToggle) {
    const navContent = document.querySelector('.nav-content');
    const hamburger = document.createElement('div');
    hamburger.className = 'nav-toggle';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navContent.appendChild(hamburger);
    
    // Add event listener to new hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
  } else {
    navToggle.addEventListener('click', toggleMobileMenu);
  }
  
  function toggleMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }
  
  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const toggle = document.querySelector('.nav-toggle');
      const menu = document.querySelector('.nav-menu');
      
      if (menu.classList.contains('active')) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.nav');
    
    if (menu.classList.contains('active') && !nav.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
}

// Touch interactions for mobile devices
function initTouchInteractions() {
  // Check if device supports touch
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    // Handle media items touch flip
    const mediaItems = document.querySelectorAll('.media-item');
    mediaItems.forEach(item => {
      let touchStartTime = 0;
      
      item.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
      });
      
      item.addEventListener('touchend', (e) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Only flip if it's a quick tap (not a scroll)
        if (touchDuration < 300) {
          e.preventDefault();
          item.classList.toggle('touch-flip');
          
          // Remove flip class after 3 seconds for better UX
          setTimeout(() => {
            item.classList.remove('touch-flip');
          }, 3000);
        }
      });
    });
    
    // Handle project items touch flip
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      let touchStartTime = 0;
      
      item.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
      });
      
      item.addEventListener('touchend', (e) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        if (touchDuration < 300) {
          e.preventDefault();
          item.classList.toggle('touch-flip');
          
          setTimeout(() => {
            item.classList.remove('touch-flip');
          }, 3000);
        }
      });
    });
  }
  
  // Enhanced touch scrolling for pagination
  const paginationContainers = document.querySelectorAll('.pagination');
  paginationContainers.forEach(container => {
    let isScrolling = false;
    
    container.addEventListener('touchstart', () => {
      isScrolling = false;
    });
    
    container.addEventListener('touchmove', () => {
      isScrolling = true;
    });
    
    container.addEventListener('touchend', (e) => {
      if (isScrolling) {
        e.preventDefault();
      }
    });
  });
}

// Enhanced viewport detection for mobile optimizations
function isMobileDevice() {
  return window.innerWidth <= 768 || 
         ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0);
}

// Optimize particles for mobile
function initHomepage() {
  // Media tabs functionality
  const mediaTabs = document.querySelectorAll('.media-tab');
  const mediaPanels = document.querySelectorAll('.media-panel');
  
  mediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      mediaTabs.forEach(t => t.classList.remove('active'));
      mediaPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to current tab
      tab.classList.add('active');
      
      // Show corresponding panel
      const targetPanel = document.getElementById(tab.dataset.target);
      targetPanel.classList.add('active');
    });
  });
  
  // Typewriter Effect
  const nameElement = document.getElementById('name');
  if (nameElement) {
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    
    function typeWriter(text, element, i = 0) {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(function() {
          typeWriter(text, element, i + 1);
        }, 100);
      } else {
        setTimeout(function() {
          element.classList.add('typewriter-done');
        }, 500);
      }
    }
    
    setTimeout(function() {
      typeWriter(nameText, nameElement);
    }, 1000);
  }
  
  // Particles.js Configuration
  const particlesScript = document.createElement('script');
  particlesScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
  document.body.appendChild(particlesScript);
  
  // Reduce particle count on mobile for better performance
  const particleCount = isMobileDevice() ? 40 : 80;
  
  particlesScript.onload = function() {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": particleCount,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#52adc8"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#52adc8",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  };
  
  // World Map
  initWorldMap();
  
  // Initialize pagination
  initPagination();
}

function initWorldMap() {
  const mapContainer = document.getElementById('world-map');
  if (!mapContainer) return;
  
  const width = mapContainer.clientWidth;
  const height = isMobileDevice() ? 350 : 500;
  
  const svg = d3.select('#world-map')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const projection = d3.geoNaturalEarth1()
    .scale(isMobileDevice() ? width / 6 : width / 5)
    .translate([width / 2, height / 2]);
  
  const path = d3.geoPath()
    .projection(projection);
  
  // Sample visited locations (longitude, latitude)
  const visitedPlaces = [
    { name: "Tokyo", coords: [139.7, 35.7], size: isMobileDevice() ? 4 : 6 },
    { name: "Sapporo", coords: [141.3, 43.1], size: isMobileDevice() ? 3 : 4 },
    { name: "Kushiro", coords: [144.2, 42.6], size: 2 },
    { name: "Kyoto", coords: [135.7, 35.0], size: 4 },
    { name: "Osaka", coords: [135.5, 34.7], size: 4 },
    { name: "Hong Kong", coords: [114.2, 22.3], size: 4},
    { name: "Suzhou", coords: [120.6, 31.2], size: 2},
    { name: "Shenzhen", coords: [114.1, 22.5], size: 4},
    { name: "Changsha", coords: [112.9, 28.2], size: 4},
    { name: "Guangzhou", coords: [113.1, 23.0], size: 4},
    { name: "Shanghai", coords: [121.3, 31.1], size: 4},
    { name: "Singapore", coords: [103.8, 1.3], size: 6},
    { name: "Kuala Lumpur", coords: [101.7, 3.1], size: 4},
    { name: "Bali", coords: [115.2, -8.4], size: 2},
    { name: "Surabaya", coords: [112.7, -7.3], size: 2},
  ];
  
  // Load world map data
  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(function(data) {
      // Draw countries
      const countries = topojson.feature(data, data.objects.countries);
      
      svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#e8e8e8')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5);
      
      // Add visited places
      svg.selectAll('circle')
        .data(visitedPlaces)
        .enter()
        .append('circle')
        .attr('cx', d => projection(d.coords)[0])
        .attr('cy', d => projection(d.coords)[1])
        .attr('r', 0)
        .attr('fill', '#52adc8')
        .attr('opacity', 0.8)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .transition()
        .delay((d, i) => i * 200)
        .duration(1000)
        .attr('r', d => d.size);
      
      // Add pulse animation to places
      svg.selectAll('circle')
        .each(function(d) {
          const circle = d3.select(this);
          
          function pulse() {
            circle.transition()
              .duration(1500)
              .attr('r', d.size + 4)
              .attr('opacity', 0.2)
              .transition()
              .duration(1500)
              .attr('r', d.size)
              .attr('opacity', 0.8)
              .on('end', pulse);
          }
          
          pulse();
        });
      
      // Add tooltips
      svg.selectAll('circle')
        .append('title')
        .text(d => d.name);
    })
    .catch(error => {
      console.log(error);
      // Fallback if map data can't be loaded
      document.getElementById('world-map').innerHTML = `
        <div style="display: flex; height: 100%; align-items: center; justify-content: center; flex-direction: column;">
          <h3 style="margin-bottom: 1rem;">Places I've Visited</h3>
          <ul style="list-style: none; text-align: center;">
            <li>Tokyo, Japan</li>
            <li>Singapore</li>
            <li>Hong Kong</li>
            <li>And many more...</li>
          </ul>
        </div>
      `;
    });
}

// About page specific features
function initAboutPage() {
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.getAttribute('data-width');
        setTimeout(() => {
          skillBar.style.width = width;
        }, 200);
        skillObserver.unobserve(skillBar);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // Add hover effects to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    if (!isMobileDevice()) {
      // Desktop hover effects
      item.addEventListener('mouseenter', function() {
        this.querySelector('.timeline-content').style.transform = 'scale(1.02)';
        this.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1.1)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.querySelector('.timeline-content').style.transform = 'scale(1)';
        this.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1)';
      });
    } else {
      // Mobile tap effects
      item.addEventListener('touchstart', function() {
        this.querySelector('.timeline-content').style.transform = 'scale(1.02)';
        this.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1.1)';
      });
      
      item.addEventListener('touchend', function() {
        setTimeout(() => {
          this.querySelector('.timeline-content').style.transform = 'scale(1)';
          this.querySelector('.timeline-marker').style.transform = 'translateX(-50%) scale(1)';
        }, 150);
      });
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Initialize projects pagination
  initProjectsPagination();
}

// Projects pagination functionality
function initProjectsPagination() {
  const projectsSection = document.querySelector('.projects-section');
  if (!projectsSection) return;

  const projectItems = projectsSection.querySelectorAll('.project-item');
  const itemsPerPage = 3; // Display 3 projects per page
  const totalPages = Math.ceil(projectItems.length / itemsPerPage);
  let currentPage = 1;

  // Update total pages display
  const totalPagesElement = projectsSection.querySelector('.total-pages');
  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  // Hide pagination controls if only one page
  const pagination = projectsSection.querySelector('.projects-pagination');
  if (totalPages <= 1 && pagination) {
    pagination.style.display = 'none';
  }

  function updateProjectsPage(page) {
    currentPage = page;
    
    // Update current page display
    const currentPageElement = projectsSection.querySelector('.current-page');
    if (currentPageElement) {
      currentPageElement.textContent = page;
    }

    // Hide all projects
    projectItems.forEach(item => {
      item.classList.remove('visible');
    });

    // Show projects for current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < projectItems.length; i++) {
      setTimeout(() => {
        projectItems[i].classList.add('visible');
      }, (i - startIndex) * 100); // Staggered animation
    }

    // Update button states
    const prevButton = projectsSection.querySelector('.prev-page');
    const nextButton = projectsSection.querySelector('.next-page');

    if (prevButton) {
      prevButton.classList.toggle('disabled', page === 1);
    }
    if (nextButton) {
      nextButton.classList.toggle('disabled', page === totalPages);
    }
  }

  // Add pagination button event listeners
  const prevButton = projectsSection.querySelector('.prev-page');
  const nextButton = projectsSection.querySelector('.next-page');

  if (prevButton) {
    prevButton.addEventListener('click', function() {
      if (currentPage > 1 && !this.classList.contains('disabled')) {
        updateProjectsPage(currentPage - 1);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      if (currentPage < totalPages && !this.classList.contains('disabled')) {
        updateProjectsPage(currentPage + 1);
      }
    });
  }

  // Initialize first page
  updateProjectsPage(1);

  // Add debug info (optional, can be removed)
  console.log(`Projects: ${projectItems.length} items, ${totalPages} pages, ${itemsPerPage} items per page`);
}

// Pagination functionality for media panels
const itemsPerPage = 4;
const currentPages = {
  books: 1,
  music: 1,
  digitals: 1
};

function initPagination() {
  const panels = ['books', 'music', 'digitals'];
  
  panels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    const items = panel.querySelectorAll('.media-item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    const totalPagesElement = panel.querySelector('.total-pages');
    if (totalPagesElement) {
      totalPagesElement.textContent = totalPages;
    }
    
    updatePage(panelId, 1);
    
    const prevButton = panel.querySelector('.prev-page');
    if (prevButton) {
      prevButton.classList.add('disabled');
    }
    
    if (totalPages <= 1) {
      const nextButton = panel.querySelector('.next-page');
      if (nextButton) {
        nextButton.classList.add('disabled');
      }
    }
  });
  
  // Event listeners for prev/next buttons
  document.querySelectorAll('.prev-page').forEach(button => {
    button.addEventListener('click', function() {
      const panelId = this.dataset.panel;
      const currentPage = currentPages[panelId];
      
      if (currentPage > 1) {
        updatePage(panelId, currentPage - 1);
      }
    });
  });
  
  document.querySelectorAll('.next-page').forEach(button => {
    button.addEventListener('click', function() {
      const panelId = this.dataset.panel;
      const currentPage = currentPages[panelId];
      const panel = document.getElementById(panelId);
      const items = panel.querySelectorAll('.media-item');
      const totalPages = Math.ceil(items.length / itemsPerPage);
      
      if (currentPage < totalPages) {
        updatePage(panelId, currentPage + 1);
      }
    });
  });
  
  // Update pagination when switching tabs
  document.querySelectorAll('.media-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const panelId = this.dataset.target;
      updatePage(panelId, currentPages[panelId]);
    });
  });
}

function updatePage(panelId, page) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  
  const items = panel.querySelectorAll('.media-item');
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  currentPages[panelId] = page;
  
  const currentPageElement = panel.querySelector('.current-page');
  if (currentPageElement) {
    currentPageElement.textContent = page;
  }
  
  items.forEach(item => {
    item.classList.remove('visible');
  });
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  for (let i = startIndex; i < endIndex && i < items.length; i++) {
    setTimeout(() => {
      items[i].classList.add('visible');
    }, 0);
  }
  
  const prevButton = panel.querySelector('.prev-page');
  const nextButton = panel.querySelector('.next-page');
  
  if (prevButton) {
    prevButton.classList.toggle('disabled', page === 1);
  }
  if (nextButton) {
    nextButton.classList.toggle('disabled', page === totalPages);
  }
}

// Enhanced window resize handler
window.addEventListener('resize', function() {
  // Reinitialize mobile features if viewport changes
  if (window.innerWidth <= 768) {
    // Ensure mobile navigation is properly initialized
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    }
  }
});
