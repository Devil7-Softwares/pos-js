import { Tagger, TagType } from '@devil7softwares/pos';

const tagger = new Tagger();

tagger.extendLexicon({ Obama: [TagType.NNP] });

const taggedWords = tagger.tag(['Mr', 'Obama']); // --> [[ 'Mr', 'NNP' ], [ 'Obama', 'NNP' ]]

console.table(taggedWords);
