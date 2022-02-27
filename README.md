# POS ![build & test](https://github.com/Devil7-Softwares/pos-js/workflows/Build%20and%20Test/badge.svg) ![npm](https://img.shields.io/npm/v/@devil7softwares/pos) ![license](https://img.shields.io/npm/l/@devil7softwares/pos) ![min](https://img.shields.io/bundlephobia/min/@devil7softwares/pos) ![minzip](https://img.shields.io/bundlephobia/minzip/@devil7softwares/pos)

pos-js is a Javascript port of Mark Watson's FastTag Part of Speech Tagger which was itself based on Eric Brill's trained rule set and English lexicon. It also includes a basic lexer that can be used to extract words and other tokens from text strings. Originally this was written by [Percy Wegmann](http://www.percywegmann.com/) and is [available on Google code](https://code.google.com/p/jspos/).

This fork adds TypeScript support to a fork made by [Darius Kazemi](https://github.com/dariusk) which added Node.JS and npm support.

## Demo
[Click here](https://devil7-softwares.github.io/pos-js/) to check demo or checkout [samples](./samples) and [demo source](./demo).

## Installation
```sh
npm install @devil7softwares/pos
```
(or)
```sh
yarn add @devil7softwares/pos
```

## Usage
```typescript
import { Lexer, Tagger, TagType } from '@devil7softwares/pos';

const lexer = new Lexer();
const tagger = new Tagger();

const words = lexer.lex('This is some sample text. This text can contain multiple sentences.');
const taggedWords = tagger.tag(words);

for (const [word, tag] of taggedWords) {
    console.log(word + ' /' + tag);
}
```

## License
jspos is licensed under the GNU LGPLv3

## Acknowledgements
Thanks to Mark Watson for writing FastTag, which served as the basis for jspos.

## Tags
| Tag  | Description         | Example    |
| ---- | ------------------- | ---------- |
| CC   | Coord Conjuncn      | and,but,or |
| CD   | Cardinal number     | one,two    |
| DT   | Determiner          | the,some   |
| EX   | Existential there   | there      |
| FW   | Foreign Word        | mon dieu   |
| IN   | Preposition         | of,in,by   |
| JJ   | Adjective           | big        |
| JJR  | Adj., comparative   | bigger     |
| JJS  | Adj., superlative   | biggest    |
| LS   | List item marker    | 1,One      |
| MD   | Modal               | can,should |
| NN   | Noun, sing. or mass | dog        |
| NNP  | Proper noun, sing.  | Edinburgh  |
| NNPS | Proper noun, plural | Smiths     |
| NNS  | Noun, plural        | dogs       |
| POS  | Possessive ending   | 's         |
| PDT  | Predeterminer       | all, both  |
| PRP$ | Possessive pronoun  | my,one's   |
| PRP  | Personal pronoun    | I,you,she  |
| RB   | Adverb              | quickly    |
| RBR  | Adverb, comparative | faster     |
| RBS  | Adverb, superlative | fastest    |
| RP   | Particle            | up,off     |
| SYM  | Symbol              | +,%,&      |
| TO   | 'to'                | to         |
| UH   | Interjection        | oh, oops   |
| VB   | verb, base form     | eat        |
| VBD  | verb, past tense    | ate        |
| VBG  | verb, gerund        | eating     |
| VBN  | verb, past part     | eaten      |
| VBP  | Verb, present       | eat        |
| VBZ  | Verb, present       | eats       |
| WDT  | Wh-determiner       | which,that |
| WP   | Wh pronoun          | who,what   |
| WP$  | Possessive-Wh       | whose      |
| WRB  | Wh-adverb           | how,where  |
| ,    | Comma               | ,          |
| .    | Sent-final punct    | . ! ?      |
| :    | Mid-sent punct.     | : ; Ñ      |
| $    | Dollar sign         | $          |
| #    | Pound sign          | #          |
| "    | quote               | "          |
| (    | Left paren          | (          |
| )    | Right paren         | )          |

See [TagTypes.ts](./src/enums/TagType.ts)
