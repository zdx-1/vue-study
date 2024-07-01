
const toggleTheme = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  let isDark, transition;

  const editTheme = () => {
    const root = document.documentElement;
    isDark = root.classList.contains('dark');
    root.classList.remove(isDark ? 'dark' : 'light');
    root.classList.add(isDark ? 'light' : 'dark');
  }

  if (document.startViewTransition) {
    transition = document.startViewTransition(editTheme)
  } else {
    editTheme()
    return
  }

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    console.log('isDark=>',isDark,'clipPath=>',clipPath, [...clipPath].reverse());
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: isDark
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)',
      }
    );
  });
}


export default toggleTheme