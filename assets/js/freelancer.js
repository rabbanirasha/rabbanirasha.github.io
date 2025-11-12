(function() {
  "use strict"; // Start of use strict

  var y = new Date().getFullYear();
  var el = document.getElementById('footer-year');
  if(el) el.textContent = y;

  var scrollToTop = document.querySelector('.scroll-to-top');
  
  if (scrollToTop) {
    
    // Scroll to top button appear
    window.addEventListener('scroll', function() {
      var scrollDistance = window.pageYOffset;

      if (scrollDistance > 100) {
        scrollToTop.style.display = 'block';
      } else {
        scrollToTop.style.display = 'none';
      }
    });
  }

  var mainNav = document.querySelector('#mainNav');

  if (mainNav) {

    var navbarCollapse = mainNav.querySelector('.navbar-collapse');
    
    if (navbarCollapse) {
      
      var collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      
      var navbarItems = navbarCollapse.querySelectorAll('a');
      
      // Closes responsive menu when a scroll trigger link is clicked
      for (var item of navbarItems) {
        item.addEventListener('click', function (event) {
          collapse.hide();
        });
      }
    }

    // Collapse Navbar
    var collapseNavbar = function() {

      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);
  }

})(); // End of use strict

document.addEventListener('DOMContentLoaded', function() {
    
  // Load skills from JSON
  fetch('assets/data/skills.json')
    .then(response => response.json())
    .then(skills => {
        const container = document.getElementById('skillContainer');
        if (container) {
            skills.forEach(skill => {
                const col = document.createElement('div');
                col.className = 'col-6 col-lg-3 text-center p-2';
                col.innerHTML = `
                    <div class="skill-card nameplate h-100 p-3">
                        <i class="${skill.icon} fa-fw fa-3x mb-3" style="color:#18bc9c"></i>
                        <h4><strong>${skill.title}</strong></h4>
                        <p class="mb-0 text-faded">${skill.preference}</p>
                    </div>
                `;
                container.appendChild(col);
            });
        }
    })
    .catch(error => console.error('Error loading skills:', error));

  // Load projects from JSON
  fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const container = document.getElementById('portfolioContainer');
        if (container) {
            projects.forEach(project => {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4';
                col.innerHTML = `
                    <a class="d-block mx-auto portfolio-item" href="#projectModal" data-bs-toggle="modal" data-project-id="${project.id}">
                        <div class="d-flex portfolio-item-caption position-absolute h-100 w-100">
                            <div class="text-center text-white my-auto portfolio-item-caption-content w-100 px-2">
                                <h4 class="folio-card-title">${project.heading}</h4>
                                <p class="mb-0 folio-card-body fs-6">${project.subtitle}</p>
                            </div>
                        </div>
                        <img class="img-fluid shadow-sm" src="assets/img/portfolio/port${project.id}.jpg" alt="${project.heading}">
                    </a>
                `;
                container.appendChild(col);
            });
        }

        // Handle portfolio modal population on click
        if (container) {
            container.addEventListener('click', function(e) {
                if (e.target.closest('.portfolio-item')) {
                    const projectId = e.target.closest('.portfolio-item').dataset.projectId;
                    const project = projects.find(p => p.id === projectId);
                    
                    if (project) {
                        document.getElementById('modalTitle').textContent = project.title;
                        document.getElementById('modalBody').innerHTML = `
                            <p style="margin-bottom: 0px;margin-top: 16px;font-size: 20px;"><strong>${project.heading}</strong></p>
                            <hr style="width: 100%;margin-top: 0px;">
                            ${project.content}
                            <p style="margin-bottom: 0px;margin-top: 16px;font-size: 20px;"><strong>Technology</strong></p>
                            <hr style="width: 100%;margin-top: 0px;">
                            <p align="justify">${project.technology}</p>
                            <p style="margin-bottom: 0px;margin-top: 16px;font-size: 20px;"><strong>My Role</strong></p>
                            <hr style="width: 100%;margin-top: 0px;">
                            ${project.role}
                            <p style="margin-bottom: 0px;margin-top: 16px;font-size: 20px;"><strong>Duration</strong></p>
                            <hr style="width: 100%;margin-top: 0px;">
                            <p>${project.duration}</p>
                        `;
                        document.getElementById('modalButton').className = `btn ${project.buttonClass}`;
                    }
                }
            });
        }
    })
    .catch(error => console.error('Error loading projects:', error));

  // Load subjects from JSON
  fetch('assets/data/subjects.json')
    .then(response => response.json())
    .then(subjects => {
        // Handle subject button clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('.btn-subject')) {
                const subjectId = e.target.closest('.btn-subject').dataset.subjectId;
                const subject = subjects.find(s => s.id === subjectId);
                
                if (subject) {
                    document.getElementById('modalTitle').textContent = subject.title;
                    
                    // Build modal body based on subject type
                    let bodyContent = '';
                    
                    if (subject.type === 'simple') {
                        // Simple list of items
                        bodyContent = `
                            <ul class="list-group list-group-flush">
                                ${subject.items.map(item => `<li class="list-group-item">${item}</li>`).join('')}
                            </ul>
                        `;
                    } else if (subject.type === 'grouped') {
                        // Grouped courses by category
                        bodyContent = `
                            ${subject.groups.map(group => `
                                <div class="mb-4">
                                    <h6 class="fw-bold text-dark mb-2">${group.name}</h6>
                                    <ul class="list-group list-group-flush">
                                        ${group.items.map(item => `<li class="list-group-item small">${item}</li>`).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                        `;
                    }
                    
                    document.getElementById('modalBody').innerHTML = bodyContent;
                    document.getElementById('modalButton').className = 'btn btn-primary';
                }
            }
        });
    })
    .catch(error => console.error('Error loading subjects:', error));
});
