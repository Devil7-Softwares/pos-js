/*
  Transformation rules for Brill's POS tagger
  Copyright (C) 2015 Hugo W.L. ter Doest

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { TagType } from './enums';
import { Rule, TaggedSentense } from './types';

//  rule 1: DT, {VBD | VBP} --> DT, NN
function rule1(taggedSentence: TaggedSentense, index: number) {
    if (index > 0 && taggedSentence[index - 1][1] === TagType.DT) {
        if (
            taggedSentence[index][1] === TagType.VBD ||
            taggedSentence[index][1] === TagType.VBP ||
            taggedSentence[index][1] === TagType.VB
        ) {
            taggedSentence[index][1] = TagType.NN;
        }
    }
}

// rule 2: convert a noun to a number (CD) if "." appears in the word
function rule2(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][1].startsWith('N')) {
        if (taggedSentence[index][0].indexOf('.') > -1) {
            if (/[a-zA-Z]{2}/.test(taggedSentence[index][0])) {
                taggedSentence[index][1] = TagType.URL;
            } else {
                taggedSentence[index][1] = TagType.CD;
            }
        }
        // Attempt to convert into a number
        if (!isNaN(parseFloat(taggedSentence[index][0]))) {
            taggedSentence[index][1] = TagType.CD;
        }
    }
}

// rule 3: convert a noun to a past participle if words[i] ends with "ed"
function rule3(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][1].startsWith('N') && taggedSentence[index][0].endsWith('ed')) {
        taggedSentence[index][1] = TagType.VBN;
    }
}

// rule 4: convert any type to adverb if it ends in "ly";
function rule4(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][0].endsWith('ly')) {
        taggedSentence[index][1] = TagType.RB;
    }
}

// rule 5: convert a common noun (NN or NNS) to a adjective if it ends with "al"
function rule5(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][1].startsWith('NN') && taggedSentence[index][0].endsWith('al')) {
        taggedSentence[index][1] = TagType.JJ;
    }
}

// rule 6: convert a noun to a verb if the preceding work is "would"
function rule6(taggedSentence: TaggedSentense, index: number) {
    if (
        index > 0 &&
        taggedSentence[index][1].startsWith('NN') &&
        taggedSentence[index - 1][0].toLowerCase() === 'would'
    ) {
        taggedSentence[index][1] = TagType.VB;
    }
}

// rule 7: if a word has been categorized as a common noun and it ends with "s",
//         then set its type to plural common noun (NNS)
function rule7(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][1] === TagType.NN && taggedSentence[index][0].endsWith('s')) {
        taggedSentence[index][1] = TagType.NNS;
    }
}

// rule 8: convert a common noun to a present participle verb (i.e., a gerund)
function rule8(taggedSentence: TaggedSentense, index: number) {
    if (taggedSentence[index][1].startsWith(TagType.NN) && taggedSentence[index][0].endsWith('ing')) {
        taggedSentence[index][1] = TagType.VBG;
    }
}

export default class BrillTransformationRules {
    private rules: Rule[];

    public constructor() {
        this.rules = [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8];
    }

    public getRule(index: number) {
        return this.rules[index];
    }

    public setRule(index: number, rule: Rule) {
        this.rules[index] = rule;
    }

    public appendRule(rule: Rule) {
        this.rules[this.rules.length] = rule;
    }

    public setRules(newRules: Rule[]) {
        this.rules = newRules;
    }

    public getRules() {
        return this.rules;
    }
}
