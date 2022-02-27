import { Lexer, Tagger } from '@devil7softwares/pos';

const lexer = new Lexer();
const tagger = new Tagger();

const words = lexer.lex('This is some sample text. This text can contain multiple sentences.');
const taggedWords = tagger.tag(words);

console.table(taggedWords);
