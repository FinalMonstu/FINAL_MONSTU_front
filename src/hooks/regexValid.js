
//공백 문자(space, tab, newline) 포함 검증
export function hasWhitespace(text) {
    const space_regex = /\s/;
    return typeof text === 'string' && space_regex.test(text);
}