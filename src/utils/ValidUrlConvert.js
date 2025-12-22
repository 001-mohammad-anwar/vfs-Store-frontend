export const validURLConvert = (name) => {
    if (!name) return "";
    const cleaned = name
      .toString()
      .trim()
      .replace(/[\s,&]+/g, "-")  // replaces spaces, commas, ampersands with dash
      .replace(/-+/g, "-")       // collapses multiple dashes
      .replace(/^-+|-+$/g, "");  // trims leading/trailing dashes
  
    return encodeURIComponent(cleaned); // encodes remaining unsafe characters
  };
  