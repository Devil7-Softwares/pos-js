import { TagType } from './enums';

declare module '*.json' {
    const value: Record<string, TagType[]>;
    export default value;
}
