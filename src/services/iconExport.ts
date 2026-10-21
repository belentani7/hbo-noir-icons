/**
 * Exact SVG export of the same glyph currently rendered by RepoIcon.
 * The original 15 glyph renderers remain the source of truth; no empty stub.
 * Everything is composed with SVG DOM methods to escape names automatically.
 */
export function renderIconSvg(
  source: SVGSVGElement,
  name: string,
  accent: string,
  halo: number,
): string {
  const ns = "http://www.w3.org/2000/svg";
  const safeColor = /^#[0-9a-fA-F]{6}$/.test(accent) ? accent : "#c084fc";
  const blur = Math.max(1, Math.min(16, Number.isFinite(halo) ? halo / 14 : 5));
  const root = document.createElementNS(ns, "svg");
  root.setAttribute("xmlns", ns);
  root.setAttribute("width", "1024");
  root.setAttribute("height", "1024");
  root.setAttribute("viewBox", "0 0 1024 1024");
  root.setAttribute("role", "img");
  root.setAttribute("aria-labelledby", "glyph-title glyph-description");

  const title = document.createElementNS(ns, "title");
  title.id = "glyph-title";
  title.textContent = name.trim().slice(0, 120) || "Belentani Neural Icon";
  const desc = document.createElementNS(ns, "desc");
  desc.id = "glyph-description";
  desc.textContent = "Vector icon exported from the actual live glyph geometry in the Belentani Noir studio.";
  root.append(title, desc);

  const defs = document.createElementNS(ns, "defs");
  const filter = document.createElementNS(ns, "filter");
  filter.id = "belentani-export-halo";
  filter.setAttribute("x", "-65%");
  filter.setAttribute("y", "-65%");
  filter.setAttribute("width", "230%");
  filter.setAttribute("height", "230%");
  const gaussian = document.createElementNS(ns, "feGaussianBlur");
  gaussian.setAttribute("stdDeviation", blur.toFixed(1));
  filter.append(gaussian);
  defs.append(filter);
  root.append(defs);

  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("x", "0");
  rect.setAttribute("y", "0");
  rect.setAttribute("width", "1024");
  rect.setAttribute("height", "1024");
  rect.setAttribute("rx", "220");
  rect.setAttribute("fill", "#050109");
  root.append(rect);

  const haloShape = document.createElementNS(ns, "rect");
  haloShape.setAttribute("x", "25");
  haloShape.setAttribute("y", "25");
  haloShape.setAttribute("width", "974");
  haloShape.setAttribute("height", "974");
  haloShape.setAttribute("rx", "195");
  haloShape.setAttribute("fill", "none");
  haloShape.setAttribute("stroke", safeColor);
  haloShape.setAttribute("stroke-width", "20");
  haloShape.setAttribute("opacity", ".48");
  haloShape.setAttribute("filter", "url(#belentani-export-halo)");
  root.append(haloShape);

  const frame = document.createElementNS(ns, "rect");
  frame.setAttribute("x", "26");
  frame.setAttribute("y", "26");
  frame.setAttribute("width", "972");
  frame.setAttribute("height", "972");
  frame.setAttribute("rx", "195");
  frame.setAttribute("fill", "none");
  frame.setAttribute("stroke", safeColor);
  frame.setAttribute("stroke-opacity", ".65");
  frame.setAttribute("stroke-width", "3");
  root.append(frame);

  const clone = source.cloneNode(true) as SVGSVGElement;
  // Source icons have their own defs, paths, polygons and filters.
  // Move that exact vector geometry, never a placeholder comment.
  clone.removeAttribute("class");
  clone.removeAttribute("style");
  clone.setAttribute("x", "125");
  clone.setAttribute("y", "125");
  clone.setAttribute("width", "774");
  clone.setAttribute("height", "774");
  if (!clone.getAttribute("viewBox")) clone.setAttribute("viewBox", "0 0 100 100");
  root.append(clone);

  return new XMLSerializer().serializeToString(root);
}

export function downloadIconSvg(svg: string, name: string): void {
  const fileName = (name || "belentani-icon")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "belentani-icon";
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName + ".svg";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
