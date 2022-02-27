import { TaggedSentense } from './TaggedSentence';

export type Rule = (taggedSentence: TaggedSentense, index: number) => void;
