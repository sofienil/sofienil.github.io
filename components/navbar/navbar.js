document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector(".nav-progress");
	const links    = [...nav.querySelectorAll("a")];
	const dots  = [...nav.querySelectorAll(".nav-progress-dot")];
	const sections = links.map(a => document.querySelector(a.getAttribute("href")));

	function updateNavbar() {
		const max  = document.documentElement.scrollHeight - innerHeight;
		const tops = sections.map(s => Math.min(s.offsetTop, max));

		const i    = Math.max(0, tops.findLastIndex(t => scrollY >= t - 1));
		const next = tops[i + 1];
		const frac = next ? (scrollY - tops[i]) / (next - tops[i]) : 0;

		nav.style.setProperty("--progress-navbar-p", (i + frac) / (links.length - 1));
		links.forEach((a, n) => {
			a.classList.toggle("reached", n <= i);
			a.classList.toggle("active-nav", n === i);
		});

		dots.forEach((d, n) => {
			d.classList.toggle("dot-reached", n <= i);
			d.classList.toggle("dot-active", n === i);
		});

	}

	addEventListener("scroll", updateNavbar, { passive: true });
	addEventListener("resize", updateNavbar);
	updateNavbar();
});