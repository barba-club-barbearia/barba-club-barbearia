export function normalizeName(name: string): string | never {
  const prepositions = ["de", "da", "do", "das", "dos", "e"];

  const umbandaEntities = [
    "exu",
    "pombagira",
    "pomba gira",
    "caboclo",
    "preto velho",
    "preta velha",
    "ere",
    "erê",
    "boiadeiro",
    "marinheiro",
    "cigano",
    "baiano",
    "malandro",
    "tranca rua",
    "tranca-rua",
    "sete encruzilhadas",
    "ogum",
    "oxossi",
    "oxóssi",
    "iansa",
    "iansã",
    "iemonja",
    "iemanja",
    "iemanjá",
    "xango",
    "xangô",
    "oxum",
    "nana",
    "nanã",
    "obaluae",
    "obaluaê",
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
    "caralho",
    "fudeu",
    "cu",
    "bunda",
    "bundao",
    "cuzao",
    "babaca",
    "mongoloide",
    "gordo",
    "mendigo",
    "homessexual",
    "gay",
    "baitola",
    "sexual",
    "sexo",
    "transante",
    "transar",
    "transudo",
  ];

  const nonPersonKeywords = [
    "ltda",
    "s.a",
    "s/a",
    "me",
    "eireli",
    "holding",
    "empresa",
    "comercio",
    "comércio",
    "loja",
    "igreja",
    "associacao",
    "associação",
    "clube",
    "sociedade",
    "ong",
    "fundacao",
    "fundação",
    "prefeitura",
    "camara",
    "câmara",
    "secretaria",
    "escola",
    "universidade",
  ];

  const trimmed = name.trim();

  if (!trimmed) {
    throw new Error("Informe um nome válido.");
  }

  // Remover acentos + minúsculas
  const normalize = (v: string) =>
    v
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalized = normalize(trimmed);

  // Nome não pode conter números
  if (/\d/.test(normalized)) {
    throw new Error("O nome não deve conter números.");
  }

  // Somente letras, espaços, hífen e apóstrofo
  if (/[^a-z\s\-']/i.test(normalized)) {
    throw new Error("O nome contém caracteres inválidos.");
  }

  // Dividir nome em palavras reais
  const words = normalized.split(/\s+/);

  // Função segura: verifica somente palavras inteiras sem falso positivo
  const containsProhibitedWord = (list: string[]) => {
    return list.some((term) => {
      const t = normalize(term);
      const pattern = new RegExp(`\\b${t}\\b`, "i");
      return pattern.test(normalized);
    });
  };

  if (containsProhibitedWord(umbandaEntities)) {
    throw new Error(
      "Por favor, informe um nome de pessoa física (evite nomes de entidades religiosas)."
    );
  }

  if (containsProhibitedWord(pejorativeTerms)) {
    throw new Error("O nome informado contém termos ofensivos.");
  }

  if (containsProhibitedWord(nonPersonKeywords)) {
    throw new Error(
      "Parece ser um nome institucional/empresarial. Informe um nome de pessoa física."
    );
  }

  // Deve ter nome e sobrenome
  if (words.length < 2) {
    throw new Error("O nome deve conter pelo menos nome e sobrenome.");
  }

  // Evita iniciais soltas (ex.: "A B Silva")
  for (const w of words) {
    if (normalize(w).length === 1 && !prepositions.includes(normalize(w))) {
      throw new Error(
        "Detectamos iniciais isoladas. Informe o nome e sobrenome completos."
      );
    }
  }

  // Capitalizar corretamente
  const finalWords = trimmed.split(/\s+/).map((word, index) => {
    const lower = word.toLowerCase();
    const ascii = normalize(lower);

    if (prepositions.includes(ascii) && index !== 0) {
      return lower; // preposição fica minúscula
    }

    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  return finalWords.join(" ");
}
