import { TaggedSentence } from './TaggedSentence';

export type Rule = (taggedSentence: TaggedSentence, index: number) => void;
