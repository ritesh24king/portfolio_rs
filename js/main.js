// Main Javascript file for Ritesh Sewratan Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollAnimations();
  initTerminalSimulator();
});

// 1. Header scroll class toggle
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 2. Mobile navbar menu toggle
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Close nav menu when clicking any link
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

// 3. Scroll-reveal fade-in animation trigger
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.fade-in-up');
  
  if (animElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animElements.forEach(el => observer.observe(el));
}

// 4. Interactive Linux Terminal Simulator (Home page)
function initTerminalSimulator() {
  const terminal = document.querySelector('.terminal-wrapper');
  if (!terminal) return;

  const terminalBody = terminal.querySelector('.terminal-body');
  const inputEl = terminal.querySelector('.terminal-hidden-input');
  const currentPathEl = terminal.querySelector('.terminal-current-input-line .terminal-input-prompt');
  const editableSpan = terminal.querySelector('.terminal-typed-text');
  
  if (!inputEl || !editableSpan) return;

  // Set focus on terminal click
  terminal.addEventListener('click', () => {
    inputEl.focus();
  });

  // Track keystrokes
  inputEl.addEventListener('input', (e) => {
    editableSpan.textContent = e.target.value;
  });

  // Handle enter key
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = inputEl.value.trim().toLowerCase();
      executeTerminalCommand(command);
      inputEl.value = '';
      editableSpan.textContent = '';
    }
  });

  // Command execution database
  const commands = {
    help: () => `
Available commands:
  <span class="cmd-term">about</span>     - Brief biography
  <span class="cmd-term">skills</span>    - Core competencies & tech stack
  <span class="cmd-term">projects</span>  - Recent migration & development projects
  <span class="cmd-term">education</span> - Degrees & professional certifications
  <span class="cmd-term">contact</span>   - How to reach me
  <span class="cmd-term">hobbies</span>   - Interests outside engineering
  <span class="cmd-term">clear</span>     - Clear terminal screen
  <span class="cmd-term">help</span>      - Display this message
    `,
    about: () => `
<span class="hl-term">Profile:</span>
Motivated Junior Linux Engineer with hands-on experience at the only commercial datacenter in Suriname.
Skilled in managing various Linux distributions (Red Hat, Debian, CentOS, Kali Linux, AlmaLinux, Rocky Linux, Ubuntu)
and cPanel environments, including server configuration, DNS management, SSL implementation, and web server setup.
I coordinate multiple projects and ensure efficient execution with a strong drive for continuous improvement.
    `,
    skills: () => `
<span class="hl-term">Core Competencies:</span>
• <span class="primary-term">OS Admin:</span> Red Hat, Debian, CentOS, Kali, AlmaLinux, Rocky Linux, Ubuntu
• <span class="primary-term">Hosting & Apps:</span> cPanel Management, Server Configuration
• <span class="primary-term">Web Servers:</span> Apache, Nginx setup and optimization
• <span class="primary-term">Networking:</span> DNS Management, SSL Implementation, Wireshark, Nmap diagnostics
• <span class="primary-term">Automation:</span> Ansible playbooks, Python scripting (basic)
• <span class="primary-term">Operations:</span> Monitoring tools, Root-cause analysis, change management
    `,
    projects: () => `
<span class="hl-term">Major Projects:</span>
1. <span class="primary-term">eGov Mail Platform Migration</span> (Government Environment)
   - Role: Project Coordinator
   - Scope: Migrated cPanel web-mail environment to custom government mail system under SSH.
2. <span class="primary-term">CSweb Application Implementation</span> (General Bureau of Statistics)
   - Role: Project Coordinator & Implementer
   - Scope: Rolled out and stabilized CSweb census/stats software.
Type <span class="cmd-term">work.html</span> in your browser or click 'Work' on the nav bar to see detailed info.
    `,
    education: () => `
<span class="hl-term">Academic & Professional Education:</span>
• <span class="primary-term">Certified Ethical Hacker (CEH)</span> - In Progress (Expected June 2026)
• <span class="primary-term">Linux Professional Institute (LPI) Certificate</span> - Obtained Jan 10, 2024
• <span class="primary-term">UNASAT</span> - Bachelor in System Network Engineering (SNE) (2025 - 2029, In Progress)
• <span class="primary-term">UNASAT</span> - Associate Degree in Cloud Networking Security (CNS) (Graduated 2025)
• <span class="primary-term">Scholen Gemeenschap Kwatta (VWO)</span> - Diploma (Graduated 2021)
• <span class="primary-term">RD Simmons School (Mulo-B)</span> - Diploma (Graduated 2018)
    `,
    contact: () => `
<span class="hl-term">Contact Information:</span>
• <span class="primary-term">Email:</span> sewratanritesh6@gmail.com
• <span class="primary-term">Phone:</span> (+597) 8805892
• <span class="primary-term">Location:</span> Paramaribo, Suriname
• <span class="primary-term">LinkedIn:</span> linkedin.com/in/ritesh-sewratan (simulated)
• <span class="primary-term">GitHub:</span> github.com/ritesh-sewratan (simulated)
    `,
    hobbies: () => `
<span class="hl-term">Hobbies & Interests:</span>
• Fitness / Strength Training
• Adventure & Exploration
• Personal Development / Technical Reading
    `,
    clear: null
  };

  function executeTerminalCommand(cmd) {
    // 1. Create a historical record line
    const historyLine = document.createElement('div');
    historyLine.className = 'terminal-line';
    historyLine.innerHTML = `<span class="terminal-input-prompt"></span><span>${escapeHtml(cmd)}</span>`;
    
    // Add history line before the active prompt line
    const activeLineContainer = terminalBody.querySelector('.terminal-current-input-line');
    terminalBody.insertBefore(historyLine, activeLineContainer);

    // 2. Process command
    if (cmd === '') {
      scrollToBottom();
      return;
    }

    if (cmd === 'clear') {
      // Remove all elements except terminal-current-input-line
      const lines = terminalBody.querySelectorAll('.terminal-line');
      lines.forEach(line => line.remove());
      scrollToBottom();
      return;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line terminal-output';
    
    if (commands.hasOwnProperty(cmd)) {
      responseLine.innerHTML = commands[cmd]();
    } else {
      responseLine.innerHTML = `sys-sh: command not found: <span class="err-term">${escapeHtml(cmd)}</span>. Type <span class="cmd-term">help</span> for assistance.`;
    }

    terminalBody.insertBefore(responseLine, activeLineContainer);
    scrollToBottom();
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }
}
