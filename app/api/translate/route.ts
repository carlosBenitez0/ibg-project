const bookTranslations: Record<string, string> = {
  Genesis: 'Génesis',
  Exodus: 'Éxodo',
  Leviticus: 'Levítico',
  Numbers: 'Números',
  Deuteronomy: 'Deuteronomio',
  Joshua: 'Josué',
  Judges: 'Jueces',
  Ruth: 'Rut',
  'I Samuel': '1 Samuel',
  'II Samuel': '2 Samuel',
  'I Kings': '1 Reyes',
  'II Kings': '2 Reyes',
  'I Chronicles': '1 Crónicas',
  'II Chronicles': '2 Crónicas',
  Ezra: 'Esdras',
  Nehemiah: 'Nehemías',
  Esther: 'Ester',
  Job: 'Job',
  Psalms: 'Salmos',
  Proverbs: 'Proverbios',
  Ecclesiastes: 'Eclesiastés',
  'Song of Songs': 'Cantar de los Cantares',
  Isaiah: 'Isaías',
  Jeremiah: 'Jeremías',
  Lamentations: 'Lamentaciones',
  Ezekiel: 'Ezequiel',
  Daniel: 'Daniel',
  Hosea: 'Oseas',
  Joel: 'Joel',
  Amos: 'Amós',
  Obadiah: 'Abdías',
  Jonah: 'Jonás',
  Micah: 'Miqueas',
  Nahum: 'Nahúm',
  Habakkuk: 'Habacuc',
  Zephaniah: 'Sofonías',
  Haggai: 'Ageo',
  Zechariah: 'Zacarías',
  Malachi: 'Malaquías',
  Matthew: 'Mateo',
  Mark: 'Marcos',
  Luke: 'Lucas',
  John: 'Juan',
  Acts: 'Hechos',
  Romans: 'Romanos',
  Corinthians: 'Corintios',
  Galatians: 'Gálatas',
  Ephesians: 'Efesios',
  Philippians: 'Filipenses',
  Colossians: 'Colosenses',
  Thessalonians: 'Tesalonicenses',
  Timothy: 'Timoteo',
  Titus: 'Tito',
  Philemon: 'Filemón',
  Hebrews: 'Hebreos',
  James: 'Santiago',
  Peter: 'Pedro',
  'I John': '1 Juan',
  'II John': '2 Juan',
  'III John': '3 Juan',
  Jude: 'Judas',
  Revelation: 'Apocalipsis',
};

function translateReference(reference: string): string {
  for (const [english, spanish] of Object.entries(bookTranslations)) {
    if (reference.startsWith(english)) {
      return reference.replace(english, spanish);
    }
  }
  return reference;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const verse = searchParams.get('verse') || '';
  const reference = searchParams.get('reference') || '';

  try {
    const verseData = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(verse)}&langpair=en|es`
    ).then((r) => r.json());

    const translatedVerse = verseData.responseData?.translatedText || verse;
    const translatedReference = translateReference(reference);

    return Response.json({
      verse: translatedVerse.trim(),
      reference: translatedReference,
    });
  } catch {
    return Response.json({
      verse,
      reference: translateReference(reference),
    });
  }
}
