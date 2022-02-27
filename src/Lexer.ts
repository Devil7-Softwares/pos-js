/*!
 * jsPOS
 *
 * Copyright 2010, Percy Wegmann
 * Licensed under the GNU LGPLv3 license
 * http://www.opensource.org/licenses/lgpl-3.0.html
 */

const re = {
    ids: /(?:^|\s)[a-z0-9-]{8,45}(?:$|\s)/gi, // ID, CRC, UUID's
    number: /[0-9]*\.[0-9]+|[0-9]+/gi,
    space: /\s+/gi,
    unblank: /\S/,
    email: /[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](?:\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](?:-?\.?[a-zA-Z0-9])*(?:\.[a-zA-Z](?:-?[a-zA-Z0-9])*)+/gi,
    urls: /(?:https?:\/\/)(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:[\/\w\.\-\?#=]*)*\/?/gi,
    punctuation: /[\/\.\,\?\!\"\'\:\;\$\(\)\#\’\`]/gi,
    time: /(?:[0-9]|0[0-9]|1[0-9]|2[0-3]):(?:[0-5][0-9])\s?(?:[aApP][mM])/gi,
};

class LexerNode {
    private children: (LexerNode | string)[];
    private matches: RegExpMatchArray | null;

    public constructor(string: string, regex: RegExp, regexs: RegExp[]) {
        string = string.trim();
        this.children = [];
        this.matches = null;

        let childElements: string[] = [];

        if (string) {
            this.matches = string.match(regex);
            childElements = string.split(regex);
        }

        if (!this.matches) {
            this.matches = [];
            childElements = [string];
        }

        if (!regexs.length) {
            // no more regular expressions, we're done
            this.children = childElements;
        } else {
            // descend recursively
            var nextRegex = regexs[0],
                nextRegexes = regexs.slice(1);

            for (var i in childElements) {
                if (childElements.hasOwnProperty(i)) {
                    this.children.push(new LexerNode(childElements[i], nextRegex, nextRegexes));
                }
            }
        }
    }

    private fillArray(array: (LexerNode | string)[]): (LexerNode | string)[] {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children.hasOwnProperty(i)) {
                var child = this.children[i];

                if (typeof child !== 'string' && typeof child.fillArray === 'function') {
                    child.fillArray(array);
                } else if (re.unblank.test(child.toString())) {
                    array.push(child.toString().trim());
                }

                if (this.matches) {
                    if (i < this.matches.length) {
                        var match = this.matches[i];
                        if (re.unblank.test(match)) {
                            array.push(match.trim());
                        }
                    }
                }
            }
        }

        return array;
    }

    public toArray(): (LexerNode | string)[] {
        return this.fillArray([]);
    }

    public toString() {
        return this.toArray().toString();
    }
}

export class Lexer {
    // URLS can contain IDS, so first urls, then ids
    // then split by then numbers, then whitespace, then email and finally punctuation
    // this.regexs = [re.urls, re.ids, re.number, re.space, re.email, re.punctuation];
    private regexs = [re.urls, re.ids, re.time, re.number, re.space, re.email, re.punctuation];

    public lex(string: string): string[] {
        return new LexerNode(string, this.regexs[0], this.regexs.slice(1)).toArray() as string[];
    }
}

//var lexer = new Lexer();
//print(lexer.lex("I made $5.60 today in 1 hour of work.  The E.M.T.'s were on time, but only barely.").toString());
