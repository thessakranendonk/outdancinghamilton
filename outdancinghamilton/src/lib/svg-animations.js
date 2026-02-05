const paths = document.querySelectorAll('.line');

paths.forEach((path, i) => {
  const length = path.getTotalLength();

  // Reset path
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.strokeDashoffset = -length; // from other end
path.style.opacity = 0;
path.style.transition = `
  stroke-dashoffset 1.8s ease-in-out,
  opacity 0.6s ease
`;
path.style.opacity = 1;

  // Trigger layout so styles apply
  path.getBoundingClientRect();

  // Animate
  path.style.transition = 'stroke-dashoffset 1.8s ease-in-out';
  path.style.transitionDelay = `${i * 0.25}s`;
  path.style.strokeDashoffset = '0';
});
