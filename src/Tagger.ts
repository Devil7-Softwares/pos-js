/*!
 * jsPOS
 *
 * Copyright 2010, Percy Wegmann
 * Licensed under the LGPLv3 license
 * http://www.opensource.org/licenses/lgpl-3.0.html
 */

import BrillTransformationRules from './BrillTransformationRules';
import { TagType } from './enums';
import LexiconJson from './Lexicon.json';
import { TaggedWord, TaggedSentense } from './types';

const Lexicon = LexiconJson as Record<string, TagType[]>;
const transformationRules = new BrillTransformationRules();

export class Tagger {
    public constructor() {}

    public wordInLexicon(word: string) {
        return Boolean(
            Lexicon[word] ||
                /* 1/22/2002 mod (from Lisp code): if not in hash, try lower case */
                Lexicon[word.toLowerCase()]
        );
    }

    public tag(words: string[]) {
        const taggedSentence: TaggedSentense = new Array(words.length);

        // Initialise taggedSentence with words and initial categories
        for (var i = 0, size = words.length; i < size; i++) {
            taggedSentence[i] = new Array(2) as TaggedWord;
            taggedSentence[i][0] = words[i];

            // lexicon maps a word to an array of possible categories
            const ss = Lexicon[words[i]] || Lexicon[words[i].toLowerCase()];

            if (!ss && words[i].length === 1) {
                taggedSentence[i][1] = `${words[i]}^` as unknown as TagType;
            }

            if (!ss || !Array.isArray(ss)) {
                taggedSentence[i][1] = TagType.NN;
            } else {
                taggedSentence[i][1] = ss[0];
            }
        }

        for (let i = 0; i < taggedSentence.length; i++) {
            transformationRules.getRules().forEach(function (rule) {
                rule(taggedSentence, i);
            });
        }

        return taggedSentence;
    }

    public prettyPrint(taggedWords: TaggedWord[]) {
        for (const i in taggedWords) {
            console.log(taggedWords[i][0] + '(' + taggedWords[i][1] + ')');
        }
    }

    public extendLexicon(lexicon: Record<string, TagType[]>) {
        for (var word in lexicon) {
            if (!Lexicon.hasOwnProperty(word)) {
                Lexicon[word] = lexicon[word];
            }
        }
    }
}

// console.log(new POSTagger().tag(["i", "went", "to", "the", "store", "to", "buy", "5.2", "gallons", "of", "milk"]));
