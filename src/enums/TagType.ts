export enum TagType {
    /** Coord Conjuncn. e.g: and,but,or */
    CC = 'CC',
    /** Cardinal number. e.g: one,two */
    CD = 'CD',
    /** Determiner. e.g: the,some */
    DT = 'DT',
    /** Existential there. e.g: there */
    EX = 'EX',
    /** Foreign Word. e.g: mon dieu */
    FW = 'FW',
    /** Preposition. e.g: of,in,by */
    IN = 'IN',
    /** Adjective. e.g: big */
    JJ = 'JJ',
    /** Adj., comparative. e.g: bigger */
    JJR = 'JJR',
    /** Adj., superlative. e.g: biggest */
    JJS = 'JJS',
    /** List item marker. e.g: 1,One */
    LS = 'LS',
    /** Modal. e.g: can,should */
    MD = 'MD',
    /** Noun, sing. or mass. e.g: dog */
    NN = 'NN',
    /** Proper noun, sing.. e.g: Edinburgh */
    NNP = 'NNP',
    /** Proper noun, plural. e.g: Smiths */
    NNPS = 'NNPS',
    /** Noun, plural. e.g: dogs */
    NNS = 'NNS',
    /** Possessive ending. e.g: 's */
    POS = 'POS',
    /** Predeterminer. e.g: all, both */
    PDT = 'PDT',
    /** Possessive pronoun. e.g: my,one's */
    PP$ = 'PP$',
    /** Personal pronoun. e.g: I,you,she */
    PRP = 'PRP',
    /** Adverb. e.g: quickly */
    RB = 'RB',
    /** Adverb, comparative. e.g: faster */
    RBR = 'RBR',
    /** Adverb, superlative. e.g: fastest */
    RBS = 'RBS',
    /** Particle. e.g: up,off */
    RP = 'RP',
    /** Symbol. e.g: +,%,& */
    SYM = 'SYM',
    /** to. e.g: to */
    TO = 'TO',
    /** Interjection. e.g: oh, oops */
    UH = 'UH',
    /** URL, if there are two contiguous alpha characters. */
    URL = 'URL',
    /** verb, base form. e.g: eat */
    VB = 'VB',
    /** verb, past tense. e.g: ate */
    VBD = 'VBD',
    /** verb, gerund. e.g: eating */
    VBG = 'VBG',
    /** verb, past part. e.g: eaten */
    VBN = 'VBN',
    /** Verb, present. e.g: eat */
    VBP = 'VBP',
    /** Verb, present. e.g: eats */
    VBZ = 'VBZ',
    /** Wh-determiner. e.g: which,that */
    WDT = 'WDT',
    /** Wh pronoun. e.g: who,what */
    WP = 'WP',
    /** Possessive-Wh. e.g: whose */
    WP$ = 'WP$',
    /** Wh-adverb. e.g: how,where */
    WRB = 'WRB',
    Comma = ',', // Comma. e.g: ,
    Dot = '.', // Sent-final punct. e.g: . ! ?
    Colon = ':', // Mid-sent punct.. e.g: : ;
    DollarSign = '$', // Dollar sign. e.g: $
    Hash = '#', // Pound sign. e.g: #
    DoubleQuote = '"', // quote. e.g: "
    LeftParan = '(', // Left paren. e.g: (
    RightParen = ')', // Right paren. e.g: )
}
