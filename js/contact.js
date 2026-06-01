// Contact Page Specific Javascript - Interactive Form Handler

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

// EmailJS config (zorg dat dit klopt met jouw account)
const EMAILJS_SERVICE_ID = "service_4xnwmfd";
const EMAILJS_TEMPLATE_ID = "template_4vr24ni";
const EMAILJS_PUBLIC_KEY = "zaqqKEbWq4cUiVEJ8";

function initContactForm() {
  const form = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form-container');
  const successTerminal = document.querySelector('.success-terminal');
  const terminalLinesContainer = document.querySelector('.terminal-body');

  if (!form || !formContainer || !successTerminal || !terminalLinesContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // UI switch
    formContainer.style.display = 'none';
    successTerminal.style.display = 'block';

    // Loading message (realistisch effect)
    terminalLinesContainer.innerHTML = "";
    terminalLinesContainer.innerHTML = `<div class="terminal-line">Initializing secure EmailJS relay...</div>`;

    // 🔥 REAL EMAIL SEND
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name: name,
      email: email,
      subject: subject,
      message: message
    })
    .then(() => {

      // SUCCESS terminal log
      const logSequence = [
        { text: 'Connecting to EmailJS secure relay...', delay: 400 },
        { text: 'Authenticating request...', delay: 300 },
        { text: 'TLS encryption established (HTTPS)', delay: 300 },
        { text: 'Sending payload to mail gateway...', delay: 400 },
        { text: 'Message successfully delivered to inbox', delay: 500, style: 'color: var(--accent-green); font-weight: 600;' },
        { text: '\n[SUCCESS] MESSAGE SENT SUCCESSFULLY!', delay: 600, style: 'color: var(--accent-green); font-weight: bold; font-size: 1.05rem;' },
        { text: 'Ritesh will review your message and respond shortly.', delay: 200 }
      ];

      runTerminalOutput(logSequence);
    })
    .catch((error) => {

      // ERROR terminal log (geen alert meer = cleaner UX)
      const errorSequence = [
        { text: 'Connecting to EmailJS relay...', delay: 300 },
        { text: 'Authentication failed', delay: 400, style: 'color: red;' },
        { text: `Error: ${error.text || 'Unknown error'}`, delay: 500, style: 'color: red;' },
        { text: '\n[FAILED] MESSAGE NOT DELIVERED', delay: 600, style: 'color: red; font-weight: bold;' },
        { text: 'Please try again later.', delay: 200 }
      ];

      runTerminalOutput(errorSequence);
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function runTerminalOutput(sequence) {
    let index = 0;

    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';

    function printNextLine() {
      if (index >= sequence.length) {
        terminalLinesContainer.appendChild(cursor);
        return;
      }

      const item = sequence[index];
      const line = document.createElement('div');
      line.className = 'terminal-line';

      if (item.style) {
        line.setAttribute('style', item.style);
      }

      if (
        item.text.startsWith('EHLO') ||
        item.text.startsWith('MAIL FROM') ||
        item.text.startsWith('RCPT TO') ||
        item.text.startsWith('DATA') ||
        item.text.startsWith('STARTTLS') ||
        item.text.startsWith('.') ||
        item.text.startsWith('QUIT')
      ) {
        line.innerHTML = `<span class="terminal-input-prompt"></span>${item.text}`;
      } else {
        line.innerHTML = item.text;
      }

      terminalLinesContainer.appendChild(line);
      terminalLinesContainer.scrollTop = terminalLinesContainer.scrollHeight;

      index++;
      setTimeout(printNextLine, item.delay);
    }

    printNextLine();
  }
}