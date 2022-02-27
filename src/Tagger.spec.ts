import 'should';

import { TagType } from './enums';
import { Tagger } from './Tagger';

const tagger = new Tagger();

describe('Tagger#tag', function () {
    it('should allow the lexicon to be extended', function () {
        tagger.extendLexicon({ Obama: [TagType.NNP] });
        tagger.tag(['Mr', 'Obama']).should.eql([
            ['Mr', 'NNP'],
            ['Obama', 'NNP'],
        ]);
    });
});
