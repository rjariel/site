/* ══════════════════════════════════════
   RJARIEL — Main JavaScript
   ══════════════════════════════════════ */

// ─── EmailJS Init ───
emailjs.init('BS310FuWSpHQVRLG6');

// ─── Navbar scroll state ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Scroll reveal (IntersectionObserver) ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── Contact form handler (EmailJS) ───
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');

  // Loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;
  status.textContent = '';

  // Send via EmailJS
  emailjs.sendForm('service_z0666kn', 'template_d3co98j', e.target)
    .then(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = '#1a7a2e';
      status.textContent = 'Message sent successfully!';
      status.style.color = '#1a7a2e';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
        status.textContent = "I'll respond within 48 hours.";
        status.style.color = '';
      }, 4000);
    })
    .catch((err) => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      status.textContent = 'Failed to send. Please try again.';
      status.style.color = 'var(--red)';
      console.error('EmailJS error:', err);
    });
}
