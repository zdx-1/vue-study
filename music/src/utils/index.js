export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

export function initLazyIntersectionObserver(fn) {
  const observer = new IntersectionObserver(
    entrys => entrys.forEach(entry => fn(entry)),
    {
      rootMargin: '0px',
      threshold: 0,
    }
  );
  return observer;
}

export const countFormat = count => {
  if(isNaN(count)) return '0'
  let counter = parseInt(count)
  if (counter > 100000000) {
    return (count / 100000000).toFixed(1) + "亿"
  } else if (count > 10000) {
    return (count / 10000).toFixed(1) + "万"
  } else {
    return count + ""
  }
}
