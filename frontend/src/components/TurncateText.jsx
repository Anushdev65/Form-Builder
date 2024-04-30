const TruncateText = (text, maxLength) => {
  if (text) {
    const words = text.split(" ");

    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }

    return text;
  }

  return "";
};

export default TruncateText;
