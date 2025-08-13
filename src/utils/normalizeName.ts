export function normalizeName(name: string): string | never {
  const prepositions = ["de", "da", "do", "das", "dos", "e"];

  const umbandaEntities = [
    // Entidades e linhas
    "exu",
    "pombagira",
    "pomba gira",
    "caboclo",
    "preto velho",
    "preta velha",
    "erê",
    "ere",
    "boiadeiro",
    "marinheiro",
    "cigano",
    "baiano",
    "malandro",
    "tranca rua",
    "tranca-rua",
    "sete encruzilhadas",
    // Orixás frequentemente usados como "entidade" em nomes não pessoais
    "ogum",
    "oxóssi",
    "oxossi",
    "iansã",
    "iemonja",
    "iemanjá",
    "iemanja",
    "xangô",
    "xango",
    "oxum",
    "nanã",
    "nana",
    "obaluaê",
    "obaluae",
    "omulu",
  ];

  const pejorativeTerms = [
    "merda",
    "bosta",
    "porra",
    "puta",
    "puto",
    "viado",
    "veado",
    "corno",
    "otario",
    "otário",
    "idiota",
    "imbecil",
    "bobo",
    "burro",
    "vagabundo",
    "vagabunda",
    "lixo",
    "escroto",
  ];

  const nonPersonKeywords = [
    // termos empresariais e institucionais
    "ltda",
    "s.a.",
    "s/a",
    "me",
    "eireli",
    "holding",
    "empresa",
    "comércio",
    "comercio",
    "loja",
    "igreja",
    "associação",
    "associacao",
    "clube",
    "sociedade",
    "ong",
    "os",
    "fundação",
    "fundacao",
    "cooperativa",
    "cnpj",
    "cpf",
    "prefeitura",
    "câmara",
    "camara",
    "secretaria",
    "universidade",
    "escola",
  ];

  const trimmed = name.trim();
  if (trimmed.length === 0) {
    throw new Error("Informe um nome válido.");
  }

  // Normalização leve para validações (minúsculas + sem acentos)
  const toAscii = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalizedForCheck = toAscii(trimmed);

  // Regras de invalidação
  if (/\d/.test(normalizedForCheck)) {
    throw new Error("O nome não deve conter números.");
  }

  if (/[^a-z\s\-']/i.test(normalizedForCheck)) {
    throw new Error("O nome contém caracteres inválidos.");
  }

  // Verifica termos proibidos (umbanda, pejorativos e não pessoa física)
  const containsAny = (terms: string[]) =>
    terms.some((term) => normalizedForCheck.includes(toAscii(term)));

  if (containsAny(umbandaEntities)) {
    throw new Error(
      "Por favor, informe um nome de pessoa física (evite nomes de entidades religiosas)."
    );
  }

  if (containsAny(pejorativeTerms)) {
    throw new Error("O nome informado contém termos ofensivos.");
  }

  if (containsAny(nonPersonKeywords)) {
    throw new Error(
      "Parece ser um nome institucional/empresarial. Informe um nome de pessoa física."
    );
  }

  // Divide o nome em palavras e remove espaços extras
  const words = trimmed.split(/\s+/);

  // Verifica se há pelo menos nome e sobrenome
  if (words.length < 2) {
    throw new Error("O nome deve conter pelo menos nome e sobrenome.");
  }

  // Evita palavras de 1 letra (exceções: preposições específicas ou iniciais com ponto, que não suportamos aqui)
  const hasSuspiciousShortWord = words.some(
    (w) => toAscii(w).length === 1 && !prepositions.includes(toAscii(w))
  );
  if (hasSuspiciousShortWord) {
    throw new Error(
      "Detectamos iniciais isoladas. Informe o nome e sobrenome completos."
    );
  }

  // Normaliza cada palavra, ignorando preposições
  const normalizedWords = words.map((word, index) => {
    const lowerWord = word.toLowerCase();

    // Não aplica a regra de capitalização para preposições
    if (prepositions.includes(toAscii(lowerWord)) && index !== 0) {
      return lowerWord;
    }

    // Capitaliza a primeira letra
    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  });

  return normalizedWords.join(" ");
}
