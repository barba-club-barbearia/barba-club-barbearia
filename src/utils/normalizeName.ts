export function normalizeName(name: string): string | never {
  const prepositions = ["de", "da", "do", "das", "dos", "e"];

  // Divide o nome em palavras e remove espaços extras
  const words = name.trim().split(/\s+/);

  // Verifica se há pelo menos nome e sobrenome
  if (words.length < 2) {
    throw new Error("O nome deve conter pelo menos nome e sobrenome.");
  }

  // Normaliza cada palavra, ignorando preposições
  const normalizedWords = words.map((word, index) => {
    const lowerWord = word.toLowerCase();

    // Não aplica a regra de capitalização para preposições
    if (prepositions.includes(lowerWord) && index !== 0) {
      return lowerWord;
    }

    // Capitaliza a primeira letra
    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  });

  return normalizedWords.join(" ");
}
