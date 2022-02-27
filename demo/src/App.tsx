import './App.scss';
import './Theme.scss';

import { Lexer, TaggedSentence, Tagger, TagNameMap } from '@devil7softwares/pos';
import React, { ReactNode, useEffect, useState } from 'react';

import { Github, NPM, ThemeSwitch } from './components';

const lexer = new Lexer();
const tagger = new Tagger();

export const App: React.FC = () => {
    const [input, setInput] = useState(
        `In corpus linguistics, part-of-speech tagging (POS tagging or PoS tagging or POST), also called grammatical tagging is the process of marking up a word in a text (corpus) as corresponding to a particular part of speech,[1] based on both its definition and its context. A simplified form of this is commonly taught to school-age children, in the identification of words as nouns, verbs, adjectives, adverbs, etc.\n\nOnce performed by hand, POS tagging is now done in the context of computational linguistics, using algorithms that associate discrete terms, as well as hidden parts of speech, by a set of descriptive tags. POS-tagging algorithms fall into two distinctive groups: rule-based and stochastic. E. Brill's tagger, one of the first and most widely used English POS-taggers, employs rule-based algorithms.`
    );

    const [taggedSentence, setTagSentence] = useState<TaggedSentence>([]);

    useEffect(() => {
        const words = lexer.lex(input);
        const taggedSentence = tagger.tag(words);

        setTagSentence(taggedSentence);
    }, [input]);

    return (
        <>
            <div className='header'>
                <div>
                    <div>
                        <span className='title'>POS-JS</span>
                        <button
                            onClick={() => window.open('https://www.npmjs.com/package/@devil7softwares/pos', '_blank')}
                        >
                            <NPM />
                        </button>
                        <button onClick={() => window.open('https://github.com/Devil7-Softwares/pos-js', '_blank')}>
                            <Github />
                        </button>
                    </div>
                    <div>
                        <ThemeSwitch />
                    </div>
                </div>
                <p>
                    POS-JS is a Javascript port of Mark Watson&apos;s FastTag Part of Speech Tagger which was itself
                    based on Eric Brill&apos;s trained rule set and English lexicon. It also includes a basic lexer that
                    can be used to extract words and other tokens from text strings. Originally this was written by{' '}
                    <a href='http://www.percywegmann.com/' target='_blank' rel='noreferrer'>
                        Percy Wegmann
                    </a>{' '}
                    and is{' '}
                    <a href='https://code.google.com/p/jspos/' target='_blank' rel='noreferrer'>
                        available on Google code
                    </a>
                    .
                </p>
            </div>
            <div className='input'>
                <div className='title'>Type Input Here</div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className='word'>Word</th>
                        <th className='tag'>Tag</th>
                        <th className='description'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {taggedSentence.map<ReactNode>(([word, tag], index) => (
                        <tr key={index}>
                            <td className='word'>{word}</td>
                            <td className='tag'>{tag}</td>
                            <td className='description'>{TagNameMap[tag]?.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
