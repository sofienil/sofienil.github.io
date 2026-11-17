export function pop_up_animation() {
	const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target); // animate only once
		}
	});
	}, {
	threshold: 0.01 // trigger when 1% of the element is visible
	});

	document.querySelectorAll('.pop-up-group').forEach((group) => {
		// assign a delay to each animated child, in order
		group.querySelectorAll('.pop-up-anim').forEach((child, i) => {
			child.style.transitionDelay = `${i * 0.1}s`;
		});
		observer.observe(group);
  });
}