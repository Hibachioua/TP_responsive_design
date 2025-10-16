function slideToggle(block, open = true, ms = 250) {
  if (open) {
    block.hidden = false;
    const h = block.scrollHeight;
    block.style.height = '0px';
    block.style.transform = 'scaleY(0.3)';
    block.style.transformOrigin = 'top';
    
    setTimeout(() => {
      block.style.transition = `height ${ms}ms ease, transform ${ms}ms ease`;
      block.style.height = h + 'px';
      block.style.transform = 'scaleY(1)';
      
      setTimeout(() => {
        block.style.height = '';
        block.style.transition = '';
        block.style.transform = '';
      }, ms);
    }, 10);
  } else {
    const h = block.scrollHeight;
    block.style.height = h + 'px';
    block.style.transform = 'scaleY(1)';
    
    setTimeout(() => {
      block.style.transition = `height ${ms}ms ease, transform ${ms}ms ease`;
      block.style.height = '0px';
      block.style.transform = 'scaleY(0.3)';
      
      setTimeout(() => {
        block.hidden = true;
        block.style.height = '';
        block.style.transition = '';
        block.style.transform = '';
      }, ms);
    }, 10);
  }
}

function closeSiblings(section, exceptEl) {
  section.querySelectorAll('.details').forEach(d => {
    if (d !== exceptEl && !d.hidden) {
      const btn = section.querySelector(`.btn-details[aria-controls="${d.id}"]`);
      slideToggle(d, false);
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Détails +';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('xp');
  if (!section) return;

  section.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (!isOpen) closeSiblings(section, panel);
      slideToggle(panel, !isOpen);

      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = !isOpen ? 'Détails –' : 'Détails +';
    });
  });


    const tooltip = document.getElementById('tooltip');
  const skills = document.querySelectorAll('.skill');

  skills.forEach(function(skill) {
    
    skill.addEventListener('mouseenter', function() {
      const text = this.getAttribute('data-info');
      tooltip.textContent = text;
      tooltip.classList.add('show');
    });

    skill.addEventListener('mousemove', function(e) {
      tooltip.style.left = (e.clientX + 10) + 'px';
      tooltip.style.top = (e.clientY + 10) + 'px';
    });

    skill.addEventListener('mouseleave', function() {
      tooltip.classList.remove('show');
    });

  });

});
