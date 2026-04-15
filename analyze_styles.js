(async () => {
  const getStyle = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const style = window.getComputedStyle(el);
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      padding: style.padding,
      borderRadius: style.borderRadius
    };
  };

  const results = {
    header: getStyle('h2'),
    tableHeader: getStyle('th'),
    statusConverti: getStyle('.bg-purple-100, [class*="purple"]'), // Educated guess on class
    statusBrouillon: getStyle('.bg-gray-100, [class*="gray"]'),
    buttonNouveau: getStyle('button:contains("Nouveau")'), // Note: :contains isn't standard JS, will find manually
  };
  
  // Find Nouveau button
  const nouveauBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Nouveau'));
  if (nouveauBtn) {
    const s = window.getComputedStyle(nouveauBtn);
    results.buttonNouveau = {
      backgroundColor: s.backgroundColor,
      color: s.color,
      borderRadius: s.borderRadius
    };
  }

  // Find a status label - specific search
  const labels = Array.from(document.querySelectorAll('span, div')).filter(el => el.textContent.trim() === 'Converti' || el.textContent.trim() === 'Brouillon');
  results.statusLabels = labels.map(l => ({
    text: l.textContent.trim(),
    bg: window.getComputedStyle(l).backgroundColor,
    color: window.getComputedStyle(l).color
  }));

  return results;
})()